
require('dotenv').config({
    path: ['.env.local', '.env']
})

const express = require('express');
const path = require('path');
const application = require("./app_use/application");
const config = require("./config");
const cors = require('cors')


const cookieParser = require('cookie-parser');
const logger = require('morgan');



const app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



application(app)



app.set("api_secret_key", config.api_secret_key);


module.exports = app;
