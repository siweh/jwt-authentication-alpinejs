const express = require('express');
const PgPromise = require("pg-promise");
// const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const API = require('./api');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(bodyParser.json()) // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true }))

const config = {
	connectionString: process.env.DATABASE_URL || 'postgres://siwe:siwe123@localhost:5432/hearts_app',
	max: 30,
	// ssl: { rejectUnauthorized : false}
};

const pgp = PgPromise({});
const db = pgp(config);

API(app, db);

let port = process.env.port || 3001;

app.listen(port, function(){
    console.log('Running for my life on: ', port);
})