# Quick Fomplo Platform Documentation
Fomplo is one of my first projects i started since april 2021, it has been my great way of learning a lot about blockchain technology and Signum. I feel proud to share this with the Signum community.

### Fomplo Website is powered by
- Next.JS
- SignumJS (SDK for interacting with Signum Blockahin)
- MUI (UI Framework)
- Upstash (Rate Limiting)
- DynamoDB (Database)

### API Endpoints Available for the public
There are API Endpoints i made available for the public interested on Signum. please do not `abuse/exploit` it 🙏🏻

- `/api/edge/converter` Get rates from multiple crypto/fiat
- `/api/edge/mining` Get the latest mining stats from Signum chain
- `/api/edge/network` Get the latest status from Signum chain

### Services
The fomplo website consists of multiple centralized services in order to provide the best experience for the user. We will classify which centralized tools we use.

**Centralized Tools**
- DynamoDB (AWS Database)
- Upstash (Rate Limiting)

**Decentralized Tools**
- SignumJS (Signum `Javascript/Typescript` SDK)
- Remaining packages on `package.json`

# Advanced

## Running Fomplo
In order to build your own fomplo app, you need to have setup these centralized services and have the proper schema on the dynamoDB database.

On the folder `/schemas` you'll find a backup of a DynamoDB table i made for running the platform. You may find a way of importing that `csv` file in order to have the same schema.


<!-- TODO: Fill this section -->
## Updating Signum Blockchain Stats


## Updating FIAT/Crypto Rates
I won't share my strategy for updating the FIAT/Crypto rates because i'm getting the data from other centralized services. You already have the template of the DB table there, is up to you to determine how to update those rates.