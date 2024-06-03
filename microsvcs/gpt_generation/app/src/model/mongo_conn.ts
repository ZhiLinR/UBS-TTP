import mongoose from "mongoose";
const { model, connect } = mongoose;
import { MONGO_CREDENTIALS, MONGO_URL } from '../var/variables.js';

export async function connectDB() {
  await connect(MONGO_URL, {
    tls: true,
    // location of a local .pem file that contains both the client's certificate and key
    tlsCertificateKeyFile: MONGO_CREDENTIALS,
    authMechanism: 'MONGODB-X509',
    authSource: '$external',
  });
}