var express = require('express');
var router = express.Router();
const db = require('../models');
const BrandService = require('../services/BrandServices');
const brandService = new BrandService(db);
const { isAdmin } = require('../services/middleware');

router.get('/', async function(req, res, next) {
    // #swagger.tags = ['Brands']
    // #swagger.description = 'Gets list of all brands'
    // #swagger.produces = ['json']
    let brands; 
    try{
        brands = await brandService.getBrands();
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve brands."}}); return;}
    brands[0] == null ? 
    res.status(400).json({ status : "error", statusCode : 400, data : { result : "No brands found.", brands : brands } }) :
      res.status(200).json({ status : "success", statusCode : 200, data : { result : "brands found.", brands : brands }})
})

router.get('/:brandid', async function(req, res, next){
    // #swagger.tags = ['Brands']
    // #swagger.description = 'Gets brand of specified id'
    // #swagger.produces = ['json']
    	/* #swagger.parameters['brandid'] = {
		"name" : "brandid",
		"required" : true,
		"in" : "path",
		"type" : "integer"
	} */	
    let brandid = req.params.brandid;
    let brand;
    try{
        brand = await brandService.getBrand(brandid);
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve brand."}}); return;};

    brand == null ?
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "No brand found.", brand: brand } }) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "brand found.", brand : brand }})
});

//req.body = brand
router.post('/', isAdmin, async function(req, res, next) {
    // #swagger.tags = ['Brands']
    // #swagger.description = 'Creates new brand'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/postbrand' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
    let result;
    if(!req.body?.brand || req.body?.brand == "" || req.body?.brand == null)
        {res.status(400).json({ status : "error", statusCode : 400, data : { result : "brand must be provided." }}); return;}
    try{
       result = await brandService.createBrand(req.body.brand); 
    }catch(err){console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Unable to create brand."}}); return;}
    result.name == 'SequelizeUniqueConstraintError' ?
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "brand already exists."}}) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "brand created."}})       
});

router.put('/', isAdmin, async function(req, res, next) {
    // #swagger.tags = ['Brands']
    // #swagger.description = 'Alters brand of specififed id'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/alterbrand' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
    let result;
    if(!req.body?.id || req.body?.id == null || req.body?.id == "" || !req.body?.brand){ res.status(400).json({ status : "error", statusCode : 400, data : { result : "id and brand must be provided." }}); return; }     
    try{
        result = await brandService.alterBrand(req.body);
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot alter brand."}}); return;}
    result == 0 ? res.status(400).json({ status : "error", statusCode : 400, data : { result : "No brand of provided id."}}) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "brand altered."}})
});

//table has restrict, cannot delete if related to a product.
router.delete('/', isAdmin, async function(req, res, next) {
    // #swagger.tags = ['Brands']
    // #swagger.description = 'Deletes brand of specfied id, ondelete - restrict.'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/delete' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
    let result;
    if( !req.body.id && typeof(req.body.id) != 'number'){ res.status(400).json({ status : "error", statusCode : 400, data : { result : "id must be provided." }}); return;}
    try{
        result = await brandService.deleteBrand(req.body.id);       
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Unable to delete brand" }}); return;}
    result.name == 'SequelizeForeignKeyConstraintError' ?
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "brand belongs to a product and cannot be deleted."}}) :
            result == 0 ? res.status(400).json({ status : "error", statusCode : 400, data : { result : "No brand of provided id."}}) :
                res.status(200).json({ status : "success", statusCode : 200, data : { result : "brand deleted."}})
});  
  
module.exports = router;  