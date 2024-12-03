import { isEmpty } from "lodash";
import mysql from "mysql2/promise";
import { NextResponse, NextRequest } from "next/server";
import { DayInSec } from "@/utils/const";
import { getTimestamp } from "@/utils/utils";

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
  const currentTime = getTimestamp();

  let withdrawAmount = "0";
  if (!isEmpty(vaultid)) {
    const [rows] = await connection.query(
      `SELECT * FROM vault_withdraw WHERE vault_address = '${vaultid}'`
    );
    const rowsInfo = rows as any[];
    if (rowsInfo.length > 0) {
      const rowTime = BigInt(rowsInfo[0].day_time);
      // if 1 day not passed
      if (currentTime <= rowTime + BigInt(DayInSec)) {
        withdrawAmount = rowsInfo[0].withdraw_amount;
      }
    }
  }

  return NextResponse.json({ withdrawAmount });
}
