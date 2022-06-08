const express = require('express');
const supertest = require('supertest');
const PgPromise = require("pg-promise");
const bcrypt = require ('bcrypt');
require('dotenv').config();
const API = require('./api');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const config = {
	connectionString: process.env.DATABASE_URL || 'postgres://@localhost:5432/hearts_app',
	max: 30,
	// ssl: { rejectUnauthorized : false}
};

const pgp = PgPromise({});
const db = pgp(config);

API(app, db);

let port = process.env.port || 3000;

app.listen(port, function(){
    console.log('App started on port: ', port);
})