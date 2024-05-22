import mongoose from "mongoose";

import { MONGO_CREDENTIALS, MONGO_URL } from '../var/variables';

await mongoose.connect(MONGO_URL, {
  tls: true,
  // location of a local .pem file that contains both the client's certificate and key
  tlsCertificateKeyFile: MONGO_CREDENTIALS,
  authMechanism: 'MONGODB-X509',
  authSource: '$external',
});