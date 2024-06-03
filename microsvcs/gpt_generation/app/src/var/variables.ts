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
export const MONGO_CREDENTIALS: string = process.env.MONGO_CERT_PATH || "rootCA.pem";

const _MONGO_CLIENT: string = process.env.MONGO_CLIENT || "127.0.0.1:27017";
const _MONGO_DB: string = process.env.MONGO_DB || "/test";

export const MONGO_URL: string = _MONGO_CLIENT.concat(_MONGO_DB);

//OpenAI API
export const OPENAI_API_KEY: string = process.env.OPENAI_API_KEY || 'No API Key'




