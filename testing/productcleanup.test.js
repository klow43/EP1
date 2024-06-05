const request = require('supertest');
const app = require('../app');
const db = require('../models')
const ProductService = require('../services/ProductServices');
const productservice = new ProductService(db)

const { describe } = require('node:test');

//POST login, get token for DELETE
//DELETE product where name = 'TEST_PRODUCT'
//GET id of 'TEST_CATEGORY'
//DELETE category where category = 'TEST_CATEGORY'

describe('Destroy-TEST_PRODUCT-TEST_CATEGORY', () => {
    let categoryid,token;

    test('get token for crud operations', async () => {
        let user = { name : "Admin", password : process.env.ADMIN_USER_PASSWORD  };

        const { body }  = await request(app).post('/auth/login').send(user)

        expect(body.data).toHaveProperty('token')
        token = body.data.token;
    })

    test('Destroy TEST_PRODUCT', async () => {
        let product = { name : 'TEST_PRODUCT'}
        let result = await productservice.destroyProduct(product)
        
        expect(result).toEqual(1)
    })

    test('GET TEST_CATEGORYs id', async () => {
        const { body } = await request(app).get('/categories')

        expect(body.statusCode).toEqual(200)
        body.data.categories.forEach(category =>{ if(category.category == 'TEST_CATEGORY'){ categoryid = category.id } })    
    })

    test('Delete TEST_CATEGORY for TEST_PRODUCT', async () => {
        let success = { status : "success", statusCode : 200, data : { result : "Category deleted."}}
        const { body } = await request(app)
        .delete('/categories')
        .send({id : categoryid})
        .set('Authorization', `Bearer ${token}`)

        expect(body).toEqual(success)  
    })
})