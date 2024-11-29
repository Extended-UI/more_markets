import mysql from "mysql2/promise";
import { NextResponse, NextRequest } from "next/server";
import { IMarketUserRow } from "@/types";

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

  const marketid = req.nextUrl.searchParams.get("marketid");
  const query = `SELECT user_address, collateral_amount, borrow_amount FROM market_users WHERE market_id = '${marketid}'`;
  const [rows] = await connection.query(query);

  const [sumRows] = await connection.query(
    `SELECT SUM(collateral_amount) as collateral_amount  from market_users WHERE market_id = '${marketid}'`
  );

  return NextResponse.json({
    users: rows as IMarketUserRow[],
    collateral: (sumRows as any[])[0].collateral_amount as string,
  });
}
