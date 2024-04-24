var express = require('express');
var router = express.Router();
const db = require('../models');
const ProductServices = require('../services/ProductServices');
const productServices = new ProductServices(db);
const ProductRelationServices = require('../services/ProductRelationServices');
const productRelationServices = new ProductRelationServices(db);
const { isAdmin } = require('../services/middleware');

router.get('/',async function(req, res, next) {
    let products;
    try{
        products = await productServices.getProducts();
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieved products."}})}
    products[0] == null ? 
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "No products found.", products : products } }) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "products found.", products : products }})  
})

router.get('/:productid', async function(req, res, next) {
let id = req.params.productid;
try{
    product = await productServices.getProduct(id);
}catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieved product."}})}
product[0] == null ? 
    res.status(400).json({ status : "error", statusCode : 400, data : { result : "No product found.", products : products } }) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "product found.", products : products }}) 
})

 //product includes brandid and categoryid from frontend
router.post('/', isAdmin, async function(req, res, next) {
    let product = req.body;
    try {
        result = await productServices.createProduct(product);  
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot post product."}})}
    if(result?.name == 'SequelizeValidationError') 
      {  res.status(400).json({ status : "error", statusCode : 400, data : { result : result?.message } }) }
    else{
        try{
            await productRelationServices.createProductBrand({productid : result.id, brandid : product.brandid})
            await productRelationServices.createProductCategory({productid : result.id, categoryid : product.categoryid})           
        }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot post product."}})}
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "product created." }}) 
    }
})

// product includes brandid and categoryid from frontend
router.put('/', isAdmin, async function(req, res, next) {
        let product = req.body;
    try{
        await productServices.alterProduct(product)
        await productRelationServices.alterProductBrand(product);
        await productRelationServices.alterProductCategory(product);
    }catch( err )  { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update product." }})}
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "product altered." }}) 
})

router.delete('/', isAdmin, async function(req, res, next) {
    let id = req.body.id;
    try{
        await productServices.deleteProduct(id)
    }catch( err )  { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update product." }})}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : "product deleted." }})
})

module.exports = router; 