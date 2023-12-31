### Table Name
fomplo-services

## DynamoDB Schema Table
- Partition Key: service (String)
- Sort Key: main (String)

### Reading the data

### Define Global Variables
```typescript
import { DynamoDB } from "@aws-sdk/client-dynamodb";

const db = new DynamoDB({
  credentials: {
    accessKeyId: process.env.NEXT_PLATFORM_DB_ACCESS_KEY || "",
    secretAccessKey: process.env.NEXT_PLATFORM_DB_SECRET_KEY || "",
  },
  region: "us-east-1",
});

const TableName = "fomplo-services";
```

#### Reading Currency Rates
```typescript
  try {
    const data = await db.query({
      TableName,
      KeyConditionExpression: "service = :serviceKey",
      ExpressionAttributeValues: {
        ":serviceKey": { S: "currency" },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
```

#### Reading Node Info
```typescript
  try {
    const data = await db.getItem({
      TableName,
      Key: {
        service: { S: "signum" },
        main: { S: "mining" },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
```

#### Reading Mining Info
```typescript
  try {
    const data = await db.getItem({
      TableName,
      Key: {
        service: { S: "signum" },
        main: { S: "mining" },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
```