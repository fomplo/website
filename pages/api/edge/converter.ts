import { NextRequest, NextResponse } from "next/server";
import { db, TableName } from "@/bff/db";
import { mapConverterResponse } from "@/bff/mapper/mapConverterResponse";

export const config = {
  runtime: "edge",
  regions: ["iad1"], // only execute this function on iad1 (us-east-1)
};

export default async function handler(req: NextRequest) {
  try {
    const data = await db.query({
      TableName,
      KeyConditionExpression: "service = :serviceKey",
      ExpressionAttributeValues: {
        ":serviceKey": { S: "currency" },
      },
    });

    const mappedResponse = mapConverterResponse(data);

    return NextResponse.json(mappedResponse);
  } catch (error) {
    return NextResponse.json(error);
  }
}
