import { PROFILE_API_URL } from '../../var/variables.js';
import { setHeaders } from '../helpers/headers.js';

/**
 * This function communicates with the user microservice to get the requested profiling information.
 * 
 * @param uid - user id, currently email
 * @returns an async function which calls the Profile Microservice and returns a JSON body.
 */
export async function _initialiseProfile(uid: string) {
  const headers: Headers = setHeaders();

  const request: RequestInfo = new Request(PROFILE_API_URL.concat('/api/profile/', uid), {
    method: 'GET',
    headers: headers
  })

  let result = await fetch(request);
  let return_result = await result.json()
  return return_result
}