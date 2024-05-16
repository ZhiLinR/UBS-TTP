
//retrieve environment variables
require('dotenv').config({ path: ['.env.local', '.env'] });

//Express Server
const express = require('express');
const app = express();
const PORT = process.env.PORT;

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

require('./routes.js')(app);

app.listen(PORT, () => {
    console.log("TTP User/ScenarioGen NodeJS-Express-MongoDB Microservice Started");
})