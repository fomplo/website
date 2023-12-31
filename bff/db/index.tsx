import { DynamoDB } from "@aws-sdk/client-dynamodb";

const db = new DynamoDB({
  credentials: {
    accessKeyId: process.env.NEXT_PLATFORM_DB_ACCESS_KEY || "",
    secretAccessKey: process.env.NEXT_PLATFORM_DB_SECRET_KEY || "",
  },
  region: "us-east-1",
});

const TableName = "fomplo-services";

export { db, TableName };
