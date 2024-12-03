import _ from "lodash";
import { NextResponse, NextRequest } from "next/server";
import { CHAINALYSIS_KEY } from "@/utils/const";

export async function GET(req: NextRequest, res: NextResponse) {
  const account = req.nextUrl.searchParams.get("account") || "";

  let unsafe = false;
  if (!_.isEmpty(account)) {
    const chainanalysisRes = await fetch(
      "https://public.chainalysis.com/api/v1/address/" + account,
      {
        headers: {
          Accept: "application/json",
          "X-API-Key": CHAINALYSIS_KEY,
        },
      }
    );
    const chainanalysisInfo = await chainanalysisRes.json();
    unsafe = _.isEmpty(chainanalysisInfo.identifications) ? false : true;
  }

  return NextResponse.json({ unsafe });
}
