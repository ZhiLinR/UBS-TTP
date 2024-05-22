
// Import environment variable file
import dotenv from 'dotenv';
dotenv.config({ path: ['.env.local', '.env'] })

export const MONGO_CREDENTIALS = process.env.MONGO_CERT_PATH || "rootCA.pem";
export const MONGO_URL = process.env.MONGO_CLIENT || "127.0.0.1:27017";
export const API_PATH = process.env.API_PATH || "8000".concat(process.env.ROUTE || '/dev');

// Directory Absolute Path
import { fileURLToPath } from 'url';
import { dirname } from 'path';
