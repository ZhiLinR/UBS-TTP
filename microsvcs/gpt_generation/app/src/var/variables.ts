// Directory Absolute Path
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import environment variable file
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' })

// Specified Environment Variables or Service Defaults
//Express
export const API_PATH: string = process.env.API_PATH || "8000".concat(process.env.ROUTE || '/dev');

//MongoDB
export const MONGO_URL: string = process.env.MONGO_CLIENT || "127.0.0.1:27017";
export const MONGO_CREDENTIALS: string = __dirname.concat("/",process.env.MONGO_CERT_PATH || "rootCA.pem");

//OpenAI API
export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY || 'No API Key'

//Other Microservice URLS
export const PROFILE_API_URL: string = process.env.PROFILE_API_URL || 'localhost'




