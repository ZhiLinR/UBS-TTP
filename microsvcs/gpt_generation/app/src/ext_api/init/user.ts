import { PROFILE_API_URL } from '../../var/variables.js';

/**
 * This function communicates with the user microservice to get the requested profiling information.
 * 
 * @param uid - user id, currently email
 * @returns an async function which calls the Profile Microservice and returns a JSON body.
 */
export async function _initialiseProfile(uid: string) {
  const headers: Headers = new Headers()

  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')

  const request: RequestInfo = new Request(PROFILE_API_URL.concat('/api/profile/', uid), {
    method: 'GET',
    headers: headers
  })

  let result = await fetch(request)
    .then(res => res.json())
    .then(res => {
      return res
    })
  return result
}