var express = require('express');
var router = express.Router();
const db = require('../models');
const SearchServices = require('../services/SearchServices');
const searchServices = new SearchServices(db);


router.post('/', async function (req, res, next){
     // #swagger.tags = ['Search']
    // #swagger.description = 'Searches products by partial product name/brand or category(partial name only product)'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/search' }
    }*/   
    let search = req.body;
    let data;
    try{
        if( search.type == 'category' ){ data = await searchServices.searchCategory(search.search); }
        if( search.type == 'brand' ) { data = await searchServices.searchBrand(search.search); }
        if( search.type =='product' ) { data = await searchServices.searchProduct(search.search); }  
    }catch( err ) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve search" }}); return; }
    data?.[0] == 0 ?
        res.status(500).json({ status : "error", statusCode : 500, data : { result : "No products found", products : data }}) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : `Products found : ${data?.length}`, products : data }})
})

module.exports = router;

