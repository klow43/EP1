const request = require('supertest');
const app = require('../app');
require('dotenv').config;

const { describe } = require('node:test');

//POST to auth/login to get token(RUD auth)
//POST new category TEST_CATEGORY
//GET all categories, get id of newly created category, get id of first category to test restrict
//GET category of (newly created) id in path
//PUT new category = TEST
//DELETE - success- new (TEST)
//DELETE - fail - restricted category

describe('test-/categories-CRUD', () => {
    let token, categoryid, anycategoryid
    let newCategory = { category : "TEST_CATEGORY" }

    test('get token for crud operations', async () => {
        let user = { name : "Admin", password : process.env.ADMIN_USER_PASSWORD  };

        const { body }  = await request(app).post('/auth/login').send(user);

        expect(body.data).toHaveProperty('token')
        token = body.data.token;
    })

    test('POST /categories - success', async () => {
        let success = { status : "success", statusCode : 200, data : { "result" : "Category created."}}

        const { body } = await request(app)
        .post('/categories')
        .send(newCategory)
        .set('Authorization', `Bearer ${token}`)

        expect(body).toEqual(success)
    })

    test('GET /categories - success', async () => {
        const { body } = await request(app).get('/categories')

        expect(body.statusCode).toEqual(200)
        expect(body.data).toHaveProperty('categories')
        body.data.categories.forEach(category =>{ if(category.category == newCategory.category){ categoryid = category.id } })
        anycategoryid = body.data.categories[0].id
    })

    test('GET /categories/{categoryid} - success', async () => {
        const { body } = await request(app).get(`/categories/${categoryid}`)
        let success = { status : "success", statusCode : 200, data : { result : "Category found.", category : { id : categoryid, category : newCategory.category}}}

        expect(body).toEqual(success)
    })

    test('PUT /categories - success', async () => {
        let putCategory = { id : categoryid, category : 'TEST'}
        let success = { status : "success", statusCode : 200, data : { result : "Category altered."}}

        const { body } = await request(app)
        .put('/categories')
        .send(putCategory)
        .set('Authorization', `Bearer ${token}`)

        expect(body).toEqual(success)
    })

    test('DELETE /categories - success', async () => {
        let success = { status : "success", statusCode : 200, data : { result : "Category deleted."}}
        const { body } = await request(app)
        .delete('/categories')
        .send({id : categoryid})
        .set('Authorization', `Bearer ${token}`)

        expect(body).toEqual(success)
    })

    test('DELETE /categories - fail - restrict', async () => {
        let fail = { status : "error", statusCode : 400, data : { result : "Category belongs to a product and cannot be deleted."}}
        const { body } = await request(app)
        .delete('/categories')
        .send({id : anycategoryid})
        .set('Authorization', `Bearer ${token}`)

        expect(body).toEqual(fail)
    })
})