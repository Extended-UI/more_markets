import mysql from "mysql";
import { NextResponse, NextRequest } from "next/server";
import { IMarketApr } from "@/types";

interface IMarketAprItem extends IMarketApr {
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
  const marketid = req.nextUrl.searchParams.get("marketid");
  const targetDate = req.nextUrl.searchParams.get("targetDate");
  const targetTime =
    Math.floor(Date.now() / 1000) - DayInSec * Number(targetDate);

  let query = `SELECT marketid, supply_apr_usual, supply_apr_premium, borrow_apr, apr_time FROM market_aprs WHERE apr_time >= '${targetTime}'`;
  if (marketid && marketid.length > 0) {
    query += ` AND marketid = '${marketid}'`;
  }

  const data = await new Promise((resolve, reject) => {
    connection.query(query, function (err, result) {
      if (err) {
        console.log("market apr query ->" + err);
        reject(err);
      }

      let marketAprInfos: IMarketAprItem[] = [];
      for (let resultItem of result) {
        const itemInd = marketAprInfos.findIndex(
          (item) =>
            item.marketid.toLowerCase() == resultItem.marketid.toLowerCase()
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

      resolve(marketAprInfos);
    });
  });

  const resultList: IMarketApr[] = (data as IMarketAprItem[]).map(
    (dataItem) => {
      return {
        marketid: dataItem.marketid,
        borrow_apr: dataItem.borrow_apr / dataItem.count,
        supply_usual_apr: dataItem.supply_usual_apr / dataItem.count,
        supply_prem_apr: dataItem.supply_prem_apr / dataItem.count,
      };
    }
  );

  return NextResponse.json({ marketaprs: resultList });
}
