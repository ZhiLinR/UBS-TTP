import express, { Express, Request, Response } from "express";

//retrieve environment variables
require('dotenv').config({ path: ['.env.local', '.env'] });

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

require('./routes.ts')(app);

app.listen(PORT, () => {
    console.log("TTP GPT Generation Microservice Started");
})