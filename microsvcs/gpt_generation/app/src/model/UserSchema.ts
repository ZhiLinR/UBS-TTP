import { usersModel } from './mongo_conn.js';

run().catch(err => console.log(err));

async function run() {
  const user = await usersModel.create({
    uid: 'Bill',
    scenario: 'bill@initech.com',
  });
  console.log(user); // 'bill@initech.com'
}