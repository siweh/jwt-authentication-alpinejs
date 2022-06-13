const supertest = require('supertest');
const PgPromise = require("pg-promise")
const express = require('express');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config()

const API = require('../api');
const { default: axios } = require('axios');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const config = {
	connectionString: process.env.DATABASE_URL || 'postgres://siwe:siwe123@localhost:5432/hearts_app',
	max: 30,
	// ssl: { rejectUnauthorized : false}
};

const pgp = PgPromise({});
const db = pgp(config);

API(app, db);

describe('Hearts app', function(){
    before(async function () {
		this.timeout(5000);
		await db.none(`delete from love_user`);
		const commandText = fs.readFileSync('./sql/data.sql', 'utf-8');
		await db.none(commandText)
	});

    it('should have a test method', async () => {

		const response = await supertest(app)
			.get('/api/test')
			.expect(200);

		assert.deepStrictEqual({ name: 'Siweh' }, response.body);

	});

    it('should be able to find all users', async () => {
		const response = await supertest(app)
			.get('/api/users')
			.expect(200);

		const users = response.body.data;
		assert.equal(5, users);

	});

	it('should be able to find loggedin user by username and password', async () => {
		// change the code statement below

		const response = await supertest(app)
			.get('/api/login?username={$username}&hash_password={$hash_password}')
			.expect(200);

		const user = response.body.data;
		assert.equal(1, user);

	});

    // it('you should be able to add 2 Male & 3 Female garments', async () => {


	// 	// write your code above this line

	// 	// const gender_count_sql = 'select count(*) from garment where gender = $1'
	// 	// const maleCount = await db.one(gender_count_sql, ['Male'], r => r.count);
	// 	// const femaleCount = await db.one(gender_count_sql, ['Female'], r => r.count);

	// 	const maleResult = await supertest(app).get(`/api/garments?gender=Male`);
	// 	// console.log(maleResult.body.data);

	// 	assert.equal(13, maleResult.body.data.length)

	// 	const usersResults = await supertest(app).get(`/api/`registration`);
	// 	assert.equal(2, usersResults.body.data.length)

	// 	await supertest(app)
	// 		.post('/api/registration')
	// 		.send({
	// 			username: 'Simmy',
	// 			password: '123456',
	// 			love_user: 2,
	// 			email: 'simmy@gmail.com'
	// 		});

	// 	await supertest(app)
	// 		.post('/api/garment')
	// 		.send({
	// 			username: 'Mihle',
	// 			password: '123',
	// 			love_user: 8,
	// 			email: 'mihle@gmail.com'
	// 		});

	// 	// went down 1 as the previous test is changing a male garment to a female one
	// 	const updatedMaleResult = await supertest(app).get(`/api/garments?gender=Male`);
	// 	assert.equal(15, updatedMaleResult.body.data.length);

	// 	const updatedFemaleResult = await supertest(app).get(`/api/garments?gender=Female`);
	// 	assert.equal(16, updatedFemaleResult.body.data.length);

	// });
    after(() => {
		db.$pool.end();
	});
});