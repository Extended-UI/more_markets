import _ from "lodash";
import mysql from "mysql2/promise";
import { NextResponse, NextRequest } from "next/server";
import { IRewardClaim } from "@/types";
import { getClaimedAmount } from "@/utils/contract";

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

  const account = req.nextUrl.searchParams.get("account") || "";

  const [vaultRewards] = await connection.query(
    `SELECT * FROM vault_user_reward WHERE user_address = '${account}'`
  );

  let claimList: IRewardClaim[] = [];
  for (const vaultReward of vaultRewards as any[]) {
    const urdAddress = vaultReward.urd_address;
    const rewardToken = vaultReward.reward_token;
    const [vaultMerkles] = await connection.query(
      `SELECT * FROM vault_merkle WHERE set_rooted = '1' AND urd_address = '${urdAddress}' ORDER BY merkle_time DESC LIMIT 1`
    );

    const vaultMerkleArr = vaultMerkles as any[];
    if (vaultMerkleArr.length == 1) {
      const merkleTime = vaultMerkleArr[0].merkle_time;
      const [userMerkles] = await connection.query(
        `SELECT * FROM vault_user_merkle WHERE user_address = '${account}' AND urd_address = '${urdAddress}' AND reward_token = '${rewardToken}' AND merkle_time <= '${merkleTime}' ORDER BY merkle_time DESC LIMIT 1`
      );

      const userMerkleArr = userMerkles as any[];
      if (userMerkleArr.length == 1) {
        claimList.push({
          urdAddress,
          rewardToken,
          user: account,
          amount: userMerkleArr[0].reward_amount,
          proof:
            userMerkleArr[0].merkle_proof.length == 0
              ? []
              : userMerkleArr[0].merkle_proof.split(","),
        } as IRewardClaim);
      }
    }
  }

  const claimedList = await getClaimedAmount(claimList);

  return NextResponse.json({ claimList, claimedList });
}
