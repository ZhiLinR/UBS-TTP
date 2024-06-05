import { usersModel } from './UserSchema.js';

/**
 * This function stores the scenario and option that the user selected during its gameplay for post processing of personality data.
 * @param uid user's id, currently email
 * @param scenario the scenario that the user interacted with
 * @param option the option that the user selected
 * @returns 
 */
export async function createEntry(uid: string, scenario: string, option: string) {
  try {
    const result = await usersModel.create({
      uid: uid,
      scenario: scenario,
      option: option
    });
    return result;
  } catch (error) {
    console.log(error)
    throw new Error("Schema Creation Failed")
  }
}

/**
 * This function retrieves all known records of the user's scenarios experiences and their choices.
 * @param uid user's id, currently email.
 * @returns a compilation of the scenario's and options the user has selected.
 */
export async function getSummarised(uid: string){
  let result = await usersModel.find({ uid: uid }).exec();
  return result
}