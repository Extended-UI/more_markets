import _ from "lodash";
import mysql from "mysql2/promise";
import { parseEther } from "ethers";
import { NextResponse, NextRequest } from "next/server";
import { DayInSec, zeroBigInt } from "@/utils/const";
import { IVaultApr, IVaultProgram } from "@/types";

interface IVaultAprItem extends IVaultApr {
  count: number;
}

interface IVaultAprRow {
  supply_apr: string;
  vaultid: string;
  apr_time: string;
}

let connection: mysql.Connection | null;
const initConnection = async (): Promise<mysql.Connection> => {
  if (connection == null) {
    connection = await mysql.createConnection({
      host: process.env.db_host,
      port: process.env.db_port ? Number(process.env.db_port) : undefined,
      user: process.env.db_user,
      password: process.env.db_pawd,
      database: process.env.db_name,
    });
  }

  return connection;
};

export async function GET(req: NextRequest, res: NextResponse) {
  const connection = await initConnection();

  const vaultid = req.nextUrl.searchParams.get("vaultid") || "";
  const targetDate = req.nextUrl.searchParams.get("targetDate");
  const currentTime = Math.floor(Date.now() / 1000);
  const targetTime = currentTime - DayInSec * Number(targetDate);

  let query = `SELECT supply_apr, vaultid, apr_time FROM vault_aprs WHERE apr_time >= '${targetTime}'`;
  if (vaultid.length > 0) {
    query += ` AND vaultid = '${vaultid}'`;
  }
  const [[rows], [vaultPrograms], [vaultShares], [boxPrograms]] =
    await Promise.all([
      connection.query(query),
      connection.query(
        `SELECT * FROM vault_programs WHERE program_ended = '0'`
      ),
      connection.query(`SELECT * FROM vault_valid_shares`),
      connection.query(
        `SELECT * FROM vault_box_programs WHERE program_ended = '0'`
      ),
    ]);

  let vaultAprInfos: IVaultAprItem[] = [];
  for (let resultItem of rows as IVaultAprRow[]) {
    const vaultId = resultItem.vaultid.toLowerCase();
    const itemInd = vaultAprInfos.findIndex((item) => item.vaultid == vaultId);

    if (itemInd >= 0) {
      vaultAprInfos[itemInd].count++;
      vaultAprInfos[itemInd].apr += Number(resultItem.supply_apr);
    } else {
      const shareItem = (vaultShares as any[]).find(
        (vaultShare) => vaultShare.vault_address == vaultId
      );

      vaultAprInfos.push({
        vaultid: vaultId,
        count: 1,
        apr: Number(resultItem.supply_apr),
        programs: _.compact(
          (vaultPrograms as any[]).map((vaultProgram) => {
            return vaultProgram.vault_address == vaultId &&
              currentTime >= Number(vaultProgram.start_time)
              ? ({
                  total_reward: vaultProgram.total_reward,
                  reward_decimals: vaultProgram.reward_decimals,
                  price_info: vaultProgram.price_info || "",
                } as unknown as IVaultProgram)
              : null;
          })
        ),
        boxes: _.compact(
          (boxPrograms as any[]).map((boxProgram) => {
            return boxProgram.vault_address == vaultId &&
              currentTime >= Number(boxProgram.start_time)
              ? parseEther(boxProgram.batch_mint_amount)
              : null;
          })
        )
          .reduce((memo, boxAmount) => (memo += boxAmount), zeroBigInt)
          .toString(),
        total_shares: shareItem
          ? BigInt(shareItem.total_amount).toString()
          : "0",
      });
    }
  }

  const resultList: IVaultApr[] = vaultAprInfos.map((vaultAprInfo) => {
    return {
      vaultid: vaultAprInfo.vaultid,
      apr: vaultAprInfo.apr / vaultAprInfo.count,
      programs: vaultAprInfo.programs,
      total_shares: vaultAprInfo.total_shares,
      boxes: vaultAprInfo.boxes,
    };
  });

  return NextResponse.json({ vaultaprs: resultList });
}
