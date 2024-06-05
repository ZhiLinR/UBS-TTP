import mongoose from "mongoose";
const { Schema, model, connect } = mongoose;
import { MONGO_CREDENTIALS, MONGO_URL } from '../var/variables.js';

mongoose.connect(MONGO_URL, {
  tls: true,
  tlsCertificateKeyFile: MONGO_CREDENTIALS,
  authMechanism: 'MONGODB-X509',
  authSource: '$external',
});

interface IUserScenario {
  uid: string;
  scenario: string;
  option: string;
}

const userSchema = new Schema<IUserScenario>({
  uid: { type: String, required: true },
  scenario: { type: String, required: true },
  option: { type: String, required: true }
}, { timestamps: true });

export const usersModel = mongoose.model<IUserScenario>('User.Scenario', userSchema);