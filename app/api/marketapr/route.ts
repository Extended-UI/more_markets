import mysql from "mysql2/promise";
import { NextResponse, NextRequest } from "next/server";
import { IMarketApr } from "@/types";

interface IMarketAprItem extends IMarketApr {
  count: number;
}

interface IMarketAprRow {
  borrow_apr: string;
  supply_apr_usual: string;
  supply_apr_premium: string;
  apr_time: string;
  marketid: string;
}

const DayInSec = 86400;

export async function GET(req: NextRequest, res: NextResponse) {
  const connection = await mysql.createConnection({
    host: process.env.db_host,
    port: process.env.db_port ? Number(process.env.db_port) : undefined,
    user: process.env.db_user,
    password: process.env.db_pawd,
    database: process.env.db_name,
  });

  const marketid = req.nextUrl.searchParams.get("marketid");
  const targetDate = req.nextUrl.searchParams.get("targetDate");
  const targetTime =
    Math.floor(Date.now() / 1000) - DayInSec * Number(targetDate);

  let query = `SELECT marketid, supply_apr_usual, supply_apr_premium, borrow_apr, apr_time FROM market_aprs WHERE apr_time >= '${targetTime}'`;
  if (marketid && marketid.length > 0) {
    query += ` AND marketid = '${marketid}'`;
  }
  const [rows] = await connection.query(query);

  let marketAprInfos: IMarketAprItem[] = [];
  for (let resultItem of rows as IMarketAprRow[]) {
    const itemInd = marketAprInfos.findIndex(
      (item) => item.marketid.toLowerCase() == resultItem.marketid.toLowerCase()
    );

    if (itemInd >= 0) {
      marketAprInfos[itemInd].count++;
      marketAprInfos[itemInd].supply_usual_apr += Number(
        resultItem.supply_apr_usual
      );
      marketAprInfos[itemInd].supply_prem_apr += Number(
        resultItem.supply_apr_premium
      );
      marketAprInfos[itemInd].borrow_apr += Number(resultItem.borrow_apr);
    } else {
      marketAprInfos.push({
        marketid: resultItem.marketid,
        count: 1,
        borrow_apr: Number(resultItem.borrow_apr),
        supply_usual_apr: Number(resultItem.supply_apr_usual),
        supply_prem_apr: Number(resultItem.supply_apr_premium),
      });
    }
  }

  const resultList: IMarketApr[] = marketAprInfos.map((marketAprInfo) => {
    return {
      marketid: marketAprInfo.marketid,
      borrow_apr: marketAprInfo.borrow_apr / marketAprInfo.count,
      supply_usual_apr: marketAprInfo.supply_usual_apr / marketAprInfo.count,
      supply_prem_apr: marketAprInfo.supply_prem_apr / marketAprInfo.count,
    };
  });

  return NextResponse.json({ marketaprs: resultList });
}
