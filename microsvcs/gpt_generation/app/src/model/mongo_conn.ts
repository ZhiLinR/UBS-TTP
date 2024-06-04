import mongoose from "mongoose";
const { Schema, model, connect } = mongoose;
import { MONGO_CREDENTIALS, MONGO_URL } from '../var/variables.js';

mongoose.connect(MONGO_URL, {
  tls: true,
  // location of a local .pem file that contains both the client's certificate and key
  tlsCertificateKeyFile: MONGO_CREDENTIALS,
  authMechanism: 'MONGODB-X509',
  authSource: '$external',
});

interface IUserScenario {
  uid: string;
  scenario: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUserScenario>({
  uid: { type: String, required: true },
  scenario: { type: String, required: true },
});

// 3. Create a Model.
export const usersModel = mongoose.model<IUserScenario>('UserScenario', userSchema);