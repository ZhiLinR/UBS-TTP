import mongoose from "mongoose";

const credentials = process.env.MONGO_CERT_PATH || "rootCA.pem";
const url = process.env.MONGO_CLIENT || "127.0.0.1:27017";

await mongoose.connect(url, {
  tls: true,
  // location of a local .pem file that contains both the client's certificate and key
  tlsCertificateKeyFile: credentials,
  authMechanism: 'MONGODB-X509',
  authSource: '$external',
});