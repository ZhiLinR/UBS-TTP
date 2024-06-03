import { createRequire } from "module";
const require = createRequire(import.meta.url);

//retrieve environment variables
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import environment variable file
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '.env' })

import express, { Express, Request, Response } from "express";

//Express Server
const app: Express = express();
const PORT = process.env.PORT || 8200;

//Dependencies for Data Processing

var cors = require('cors')
var bodyParser = require('body-parser');
var multer = require('multer');
var forms = multer();

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

export type app = Express;

require('./routes.js')(app);

app.listen(PORT, () => {
    console.log("TTP GPT Generation Microservice Started");
})