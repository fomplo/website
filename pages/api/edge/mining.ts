import { NextRequest, NextResponse } from "next/server";
import { db, TableName } from "@/bff/db";
import { mapMiningResponse } from "@/bff/mapper/mapMiningResponse";

export const config = {
  runtime: "edge",
  regions: ["iad1"], // only execute this function on iad1 (us-east-1)
};

export default async function handler(req: NextRequest) {
  try {
    const data = await db.getItem({
      TableName,
      Key: {
        service: { S: "signum" },
        main: { S: "mining" },
      },
    });

    const mappedResponse = mapMiningResponse(data);

    return NextResponse.json(mappedResponse);
  } catch (error) {
    return NextResponse.json(error);
  }
}
