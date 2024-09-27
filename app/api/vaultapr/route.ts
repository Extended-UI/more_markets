import mysql from "mysql";
import { NextResponse, NextRequest } from "next/server";
import { IVaultApr } from "@/types";

interface IVaultAprItem extends IVaultApr {
  count: number;
}

const DayInSec = 86400;
const connection = mysql.createConnection({
  host: process.env.db_host,
  port: process.env.db_port ? Number(process.env.db_port) : undefined,
  user: process.env.db_user,
  password: process.env.db_pawd,
  database: process.env.db_name,
});

export async function GET(req: NextRequest, res: NextResponse) {
  const vaultid = req.nextUrl.searchParams.get("vaultid");
  const targetDate = req.nextUrl.searchParams.get("targetDate");
  const targetTime =
    Math.floor(Date.now() / 1000) - DayInSec * Number(targetDate);

  let query = `SELECT supply_apr, vaultid, apr_time FROM vault_aprs WHERE apr_time >= '${targetTime}'`;
  if (vaultid && vaultid.length > 0) {
    query += ` AND vaultid = '${vaultid}'`;
  }

  const data = await new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      if (err) {
        console.log("vault apr query ->" + err);
        reject(err);
      }

      let vaultAprInfos: IVaultAprItem[] = [];
      for (let resultItem of result) {
        const itemInd = vaultAprInfos.findIndex(
          (item) =>
            item.vaultid.toLowerCase() == resultItem.vaultid.toLowerCase()
        );

        if (itemInd >= 0) {
          vaultAprInfos[itemInd].count++;
          vaultAprInfos[itemInd].apr += Number(resultItem.supply_apr);
        } else {
          vaultAprInfos.push({
            vaultid: resultItem.vaultid,
            count: 1,
            apr: Number(resultItem.supply_apr),
          });
        }
      }

      resolve(vaultAprInfos);
    });
  });

  const resultList: IVaultApr[] = (data as IVaultAprItem[]).map((dataItem) => {
    return {
      vaultid: dataItem.vaultid,
      apr: dataItem.apr / dataItem.count,
    };
  });

  return NextResponse.json({ vaultaprs: resultList });
}
