const request = require('supertest');
const app = require('../app');
require('dotenv').config;

const { describe } = require('node:test');

//POST /auth/login - success
//POST /auth/login - fail

describe('test-/login', () => {
    test('POST /auth/login - success', async () => {
        let user = { name : "Admin", password : process.env.ADMIN_USER_PASSWORD };

        const { body }  = await request(app).post('/auth/login').send(user);

        expect(body.data).toHaveProperty('token')
    })
    
    test('POST /auth/login - fail', async () => {
        let user = { name : 'Shoresy', password : 'waffles' };
        let invalidLogin = { status : "error", statusCode : 400, data : { result : "Invalid input."} }

        const { body } = await request(app).post('/auth/login').send(user);

        expect(body).toEqual(invalidLogin)
    })
})