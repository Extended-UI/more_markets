import mysql from "mysql2/promise";
import { NextResponse, NextRequest } from "next/server";

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

  const [[boxUsers], [vaultRewards]] = await Promise.all([
    connection.query(
      `SELECT user_address as user, distribute_amount as amount FROM vault_box_users`
    ),
    connection.query(
      `SELECT user_address as user, reward_amount as amount, reward_token as token FROM vault_user_reward`
    ),
  ]);

  return NextResponse.json({ boxUsers, vaultRewards });
}
