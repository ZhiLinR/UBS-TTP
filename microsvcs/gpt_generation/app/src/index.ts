//Environment Variable Setup
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '.env' })

//Express Server
import express, { Express, Request, Response } from "express";

const app: Express = express();
const PORT = 8200;

//Routes
import { routes } from './routes.js'

//Dependencies for Data Processing
import cors from 'cors';
import bodyParser from 'body-parser';
//import multer from 'multer';
//var forms = multer();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
//app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

export type app = Express;

app.use('/api', routes);

app.listen(PORT, () => {
  console.log("TTP GPT Generation Microservice Started");
})