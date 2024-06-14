const { MongoClient, ServerApiVersion } = require('mongodb');

const credentials = process.env.MONGO_CERT_PATH

const client = new MongoClient(process.env.MONGO_CLIENT, {
    tlsCertificateKeyFile: credentials,
    serverApi: ServerApiVersion.v1
});

client.connect();
const database = client.db(process.env.MONGO_DB);

module.exports = database
