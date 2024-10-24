import mysql from "mysql2/promise";
import { NextResponse, NextRequest } from "next/server";
import { IVaultApr } from "@/types";

interface IVaultAprItem extends IVaultApr {
  count: number;
}

interface IVaultAprRow {
  supply_apr: string;
  vaultid: string;
  apr_time: string;
}

const DayInSec = 86400;

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

  const vaultid = req.nextUrl.searchParams.get("vaultid");
  const targetDate = req.nextUrl.searchParams.get("targetDate");
  const targetTime =
    Math.floor(Date.now() / 1000) - DayInSec * Number(targetDate);

  let query = `SELECT supply_apr, vaultid, apr_time FROM vault_aprs WHERE apr_time >= '${targetTime}'`;
  if (vaultid && vaultid.length > 0) {
    query += ` AND vaultid = '${vaultid}'`;
  }
  const [rows] = await connection.query(query);

  let vaultAprInfos: IVaultAprItem[] = [];
  for (let resultItem of rows as IVaultAprRow[]) {
    const vaultId = resultItem.vaultid.toLowerCase();
    const itemInd = vaultAprInfos.findIndex((item) => item.vaultid == vaultId);

    if (itemInd >= 0) {
      vaultAprInfos[itemInd].count++;
      vaultAprInfos[itemInd].apr += Number(resultItem.supply_apr);
    } else {
      vaultAprInfos.push({
        vaultid: vaultId,
        count: 1,
        apr: Number(resultItem.supply_apr),
      });
    }
  }

  const resultList: IVaultApr[] = vaultAprInfos.map((vaultAprInfo) => {
    return {
      vaultid: vaultAprInfo.vaultid,
      apr: vaultAprInfo.apr / vaultAprInfo.count,
    };
  });

  return NextResponse.json({ vaultaprs: resultList });
}
