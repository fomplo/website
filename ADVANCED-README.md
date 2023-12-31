
# Advanced For Devs 🤓

## Requirements

- Signum Blockchain development knowledge
- Javascript/Typescript knowledge
- SignumJS knowledge
- Patience, patience and patience

## Running Fomplo
In order to build your own fomplo app, you need to have setup these centralized services and have the proper schema on the dynamoDB database. Also to update the table data periodically.

On the folder `/schemas` you'll find a backup of a DynamoDB table i made for running the platform. You may find a way of importing that `csv` file in order to have the same schema.


## Updating FIAT/Crypto Rates
I won't share my strategy for updating the FIAT/Crypto rates because i'm getting the data from other centralized services. You already have the template of the DB table there, is up to you to determine how to update those rates.


## Updating Signum Blockchain Stats

- **Getting on-chain data (Blockchain Status)**

You can make a request to a Signum Node Api on the following URL:

`your-node.com/api?requestType=getState`

```typescript
    const { Amount } = require("@signumjs/util");

    // You can use fetch() if you want, axios is not mandatory
    const nodeStateResponse = await axios
      .get("your-node.com/api?requestType=getState")
      .then((response) => response.data);

    const blockHeight = nodeStateResponse.numberOfBlocks;
    const version = nodeStateResponse.version;
    const totalTransactions = nodeStateResponse.numberOfTransactions;
    const smartContractsCreated = nodeStateResponse.numberOfATs;
    const aliasesCreated = nodeStateResponse.numberOfAliases;
    const tokensCreated = nodeStateResponse.numberOfAssets;
    const subscriptionsCreated = nodeStateResponse.numberOfSubscriptions;
    const subscriptionPaymentsCount =
      nodeStateResponse.numberOfSubscriptionPayments;

    const burnedFunds = Amount.fromPlanck(
      nodeStateResponse.totalBurntNQT
    ).getSigna();

    const circulatingFunds = Amount.fromPlanck(
      nodeStateResponse.circulatingSupplyNQT
    ).getSigna();

    const nodeFeeSuggestionResponse = await axios
      .get(nodeHost + "/api?requestType=suggestFee")
      .then((response) => response.data);

    const minimal = nodeFeeSuggestionResponse.cheap;
    const standard = nodeFeeSuggestionResponse.standard;
    const priority = nodeFeeSuggestionResponse.priority;

    // Use a Third party in order to fetch the price of Signum in USD
    const signumPriceUsd= 0000000;

    const testNetBlockHeight = await axios
      .get("https://your-testnet-node.com/api?requestType=getBlockchainStatus")
      .then((response) => response.data.numberOfBlocks);

    // DynamoDB Update command
    const params = {
      TableName,
      Key: {
        service: { S: "signum" },
        main: { S: "node" },
      },
      UpdateExpression: `SET blockHeight=:blockHeight, testnetBlockHeight=:testnetBlockHeight, price=:price, version=:version, aliasesCreated=:aliasesCreated, smartContractsCreated=:smartContractsCreated, tokensCreated=:tokensCreated, totalTransactions=:totalTransactions, subscriptionsCreated=:subscriptionsCreated, subscriptionPaymentsCount=:subscriptionPaymentsCount, burnedFunds=:burnedFunds,circulatingFunds=:circulatingFunds,fees=:fees`,
      ExpressionAttributeValues: {
        ":blockHeight": { S: blockHeight.toString() },
        ":testnetBlockHeight": { S: testNetBlockHeight.toString() },
        ":price": { S: signumPriceUsd.toString() },
        ":version": { S: version.toString() },
        ":aliasesCreated": { S: aliasesCreated.toString() },
        ":smartContractsCreated": { S: smartContractsCreated.toString() },
        ":tokensCreated": { S: tokensCreated.toString() },
        ":totalTransactions": { S: totalTransactions.toString() },
        ":subscriptionsCreated": { S: subscriptionsCreated.toString() },
        ":subscriptionPaymentsCount": {
          S: subscriptionPaymentsCount.toString(),
        },
        ":burnedFunds": { S: burnedFunds.toString() },
        ":circulatingFunds": { S: circulatingFunds.toString() },
        ":fees": {
          M: {
            minimal: { S: minimal.toString() },
            standard: { S: standard.toString() },
            priority: { S: priority.toString() },
          },
        },
      },
    };

    await db.updateItem(params);
```

- **Getting on-chain data (Mining Status)**

You can make a request to a Signum Node Api on the following URL:

`your-node.com/api?requestType=getMiningInfo`

```typescript
    // You can use fetch() if you want, axios is not mandatory
    const miningData = await axios
      .get("your-node.com/api?requestType=getMiningInfo")
      .then((response) => response.data);

    const averageCommitment = miningData.averageCommitmentNQT;

    const baseTarget = miningData.baseTarget;

    const blockReward = miningData.lastBlockReward;

    // Use a Third party in order to fetch the price of Signum in USD
    const signumPriceUsd= 0000000;

    // DynamoDB Update command
     const params = {
      TableName,
      Key: {
        service: { S: "signum" },
        main: { S: "mining" },
      },
      UpdateExpression:
        "SET averageCommitment=:averageCommitment, baseTarget=:baseTarget, blockReward=:blockReward, price=:price",
      ExpressionAttributeValues: {
        ":averageCommitment": { S: averageCommitment },
        ":baseTarget": { S: baseTarget },
        ":blockReward": { S: blockReward },
        ":price": { S: signumPriceUsd.toString() },
      },
    };

    await db.updateItem(params);
```

- **Getting token pricing (Token Price from Orderbook)**

You can make a request to a Signum Node Api on the following URL:

`your-node.com/api?requestType=getTrades&lastIndex=0&asset=`**TOKENID**


```typescript
    // You can use fetch() if you want, axios is not mandatory
        const tokenPriceNQT = await axios
          .get(`your-node.com/api?requestType=getTrades&lastIndex=0&asset=${TOKENID}`)
          .then((response) => response.data.trades[0].priceNQT);

    // You need to obtain the token decimals of the token 
        const tokenDecimals= 0000000;

    // Convert the price of the token to Signa readable number 
        const tokenPriceNqtToSigna = parseFloat(tokenPriceNQT) / tokenDecimals;

    // Use a Third party in order to fetch the price of Signum in USD
        const signumPriceUsd= 0000000;

    // Convert price from Signa to USD
        const tokenPriceSignaToUsd = tokenPriceNqtToSigna * signumPriceUsd;

    // DynamoDB Update command
        const params = {
          TableName,
          Key: {
            service: { S: "currency" },
            main: { S: token.ticker },
          },
          UpdateExpression: "SET price=:price",
          ExpressionAttributeValues: {
            ":price": { S: tokenPriceSignaToUsd.toString() },
          },
        };

        await db.updateItem(params);
```