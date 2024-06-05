const request = require('supertest');
const app = require('../app');

const { describe } = require('node:test');

//POST to auth/login to get token(RUD auth)
//POST new category TEST_CATEGORY
//GET brandid to set to new product(required for raw sql to get product/products)
//GET all categories to find id of TEST_CATEGORY
//POST new product TEST_PRODUCT with id of TEST_CATEGORY and first found brandid
//GET all products - get id of new product
//GET product of (newly created) id in path
//PUT new product(price) = 1000
//DELETE new product - Processed = 1(soft delete)

describe('test-/products-CRUD', () => {
    let token;
    let newCategory = { category : "TEST_CATEGORY" }
    let newProduct = { id : 0, name : 'TEST_PRODUCT', description : 'test', price : 499, quantity : 1, imgurl : "https://i0.wp.com/puckjunk.com/wp-content/uploads/2024/05/Shoresy-Poster.jpg?ssl=1" }

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
        body.data.categories.forEach( category => { if(category.category == newCategory.category){ newProduct.categoryid = category.id } })
    })

    test('GET /brands - success', async () => {
        const { body } = await request(app).get('/brands')

        expect(body.statusCode).toEqual(200)
        newProduct.brandid = body.data.brands[0].id
    })

    test('POST /products - success', async () => {
        let success = { status : "success", statusCode : 200, data : { result : "product created."}}

        const { body } = await request(app)
        .post('/products')
        .send(newProduct)
        .set('Authorization', `Bearer ${token}`)

        expect(body).toEqual(success)
    })

    test('GET /products - success', async () => {
        const { body } = await request(app).get('/products')
        
        expect(body.statusCode).toEqual(200)
        expect(body.data).toHaveProperty('products')
        body.data.products.forEach( product => { if( product.name == newProduct.name) { newProduct.id = product.id }})
    })

    test('GET /products/{productid} - success', async () => {
        const { body } = await request(app).get(`/products/${newProduct.id}`)
        
        expect(body.statusCode).toEqual(200)
        expect(body.data.products[0].name).toEqual(newProduct.name)
    })

    test('PUT /products - success', async () => {
        let success = { status : "success", statusCode : 200, data : { result : "product altered."  } }
        newProduct.price = 1000
        const { body } = await request(app)
        .put('/products')
        .send(newProduct)
        .set('Authorization', `Bearer ${token}`)
     
        expect(body).toEqual(success)
    })

    test('DELETE /products - success', async () => {
        let success = { status : "success", statusCode : 200, data : { result : "product deleted." }}
        const { body } = await request(app)
        .delete('/products')
        .send({ id : newProduct.id })
        .set('Authorization', `Bearer ${token}`)

        expect(body).toEqual(success)
    })

})