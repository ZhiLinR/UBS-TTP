import mongoose from 'mongoose';
const { Schema, model } = mongoose;

import { connectDB } from './mongo_conn.js'

interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

/* const userSchema = new Schema({
  uid: String, // String is shorthand for {type: String}
  gender: String,
  organisation_type: String,
  position: String,
  traits: {
    personality: [String],
  }
}); */
// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

run().catch(err => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  connectDB();

  
  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  await user.save();

  console.log(user.email); // 'bill@initech.com'
}