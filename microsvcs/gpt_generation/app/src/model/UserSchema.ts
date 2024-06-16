import mongoose from "mongoose";
const { Schema, model, connect } = mongoose;
import { Thread } from 'openai/resources/beta/index.mjs';
import { MONGO_CREDENTIALS, MONGO_URL } from '../var/variables.js';

mongoose.connect(MONGO_URL, {
  tls: true,
  tlsCertificateKeyFile: MONGO_CREDENTIALS,
  authMechanism: 'MONGODB-X509',
  authSource: '$external',
});

interface IUserScenario {
  uid: string;
  thread_info: Thread;
}

const userSchema = new Schema<IUserScenario>({
  uid: { type: String, required: true },
  thread_info: { type: Object, required: true },
}, { timestamps: true });

userSchema.set('toJSON', { virtuals: true });

export const usersModel = mongoose.model<IUserScenario>('user.gpt.records', userSchema);