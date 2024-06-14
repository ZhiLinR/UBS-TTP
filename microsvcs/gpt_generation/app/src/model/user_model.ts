import { Thread } from 'openai/resources/beta/index.mjs';
import { usersModel } from './UserSchema.js';

/**
 * This function stores the scenario and option that the user selected during its gameplay for post processing of personality data.
 * @param uid user's id, currently email
 * @param scenario the scenario that the user interacted with
 * @param option the option that the user selected
 * @returns 
 */
export async function createEntry(uid: string, thread_info: Thread) {
  try {
    const result = await usersModel.create({
      uid: uid,
      thread_info: JSON.parse(JSON.stringify(thread_info)),
    });
    return result.thread_info;
  } catch (error) {
    console.log(error);
    throw new Error("Schema Creation Failed")
  }
}

/**
 * 
 * @param uid user's id
 * @returns 
 */
export async function getUserThread(uid: string) {
  let result = await usersModel.findOne({ uid: uid },).select('thread_info').exec();
  return result?.thread_info
}

