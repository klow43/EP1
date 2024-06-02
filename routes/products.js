var express = require('express');
var router = express.Router();
const db = require('../models');
const ProductServices = require('../services/ProductServices');
const productServices = new ProductServices(db);
const ProductRelationServices = require('../services/ProductRelationServices');
const productRelationServices = new ProductRelationServices(db);
const { isAdmin } = require('../services/middleware');

router.get('/',async function(req, res, next) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Gets list of all products'
    // #swagger.produces = ['json']
    let products;
    try{
        products = await productServices.getAllProducts();
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieved products."}}); return;}
    products[0] == null ? 
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "No products found.", products : products } }) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "products found.", products : products }})  
})

router.get('/:productid', async function(req, res, next) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Gets product of provided id'
    // #swagger.produces = ['json']
    /* #swagger.parameters['productid'] = {
		"name" : "productid",
		"required" : true,
		"in" : "path",
		"type" : "integer"
	} */	
let id = req.params.productid;
try{
    product = await productServices.getProduct(id);
}catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieved product."}}); return;}
product[0] == null ? 
    res.status(400).json({ status : "error", statusCode : 400, data : { result : "No product found.", products : product } }) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "product found.", products : product }}) 
})

 //product includes brandid and categoryid from frontend(dropdown)
router.post('/', isAdmin, async function(req, res, next) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Creates new product'
    // #swagger.produces = ['json']
       /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/postproduct' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header", "schema" : { $ref : "#/security/Admin"}}
    let product = req.body;
    try {
        result = await productServices.createProduct(product);  
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot post product, name already in use."}}); return;}
    if(result?.name == 'SequelizeValidationError') 
      {  res.status(400).json({ status : "error", statusCode : 400, data : { result : result?.message } }); return; }
    else{
        try{
            await productRelationServices.createProductBrand({productid : result.id, brandid : product.brandid})
            await productRelationServices.createProductCategory({productid : result.id, categoryid : product.categoryid})           
        }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot post product."}}); return;}
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "product created." }}) 
    }
})

// product includes brandid and categoryid from frontend
router.put('/', isAdmin, async function(req, res, next) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Alters existing product'
    // #swagger.produces = ['json']
       /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/alterproduct' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header", "schema" : { $ref : "#/security/Admin"}}
        let product = req.body;
        if(!req.body.id){ res.status(400).json({ status : "error", statusCode : 400, data : { result : "id of product must be provided"}}); return;}
        let result;
    try{
        result = await productServices.alterProduct(product)
        if(product.brandid != ''){ await productRelationServices.alterProductBrand(product) };
        if(product.categoryid != ''){ await productRelationServices.alterProductCategory(product) };
    }catch( err )  { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update product." }}); return;}
    result == 0 ? res.status(400).json({ status : "success", statusCode : 400, data : { result : "No product of id." }}) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "product altered." }}) 
})

router.delete('/', isAdmin, async function(req, res, next) {
    // #swagger.tags = ['Products']
    // #swagger.description = 'Soft deletes product of provided id(sets Processed : 1)'
    // #swagger.produces = ['json']
       /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/delete' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header", "schema" : { $ref : "#/security/Admin"}}
    if(!req.body.id){ res.status(400).json({ status : "error", statusCode : 400, data : { result : "id of product must be provided"}}); return;}
    let id = req.body.id;
    let result;
    try{
        result = await productServices.deleteProduct(id)
    }catch( err )  { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update product." }}); return;}
    result[0] == 0 ? res.status(400).json({ status : "success", statusCode : 400, data : { result : "No product of id." }}) :
     res.status(200).json({ status : "success", statusCode : 200, data : { result : "product deleted." }})
})

module.exports = router; 