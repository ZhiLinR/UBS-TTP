
//Default MongoDB Initialisation Code
const { MongoClient, ServerApiVersion } = require('mongodb');

const credentials = process.env.MONGO_CERT_PATH

const client = new MongoClient(process.env.MONGO_CLIENT, {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1
});

async function run() {
    try {
        await client.connect();
        const database = client.db(process.env.MONGO_DB);
        const collection = database.collection(process.env.MONGO_COLLECTION);
        const docCount = await collection.countDocuments({});
        console.log(`Connection Established - Document Count: ${docCount}`);
        // perform actions using client
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
