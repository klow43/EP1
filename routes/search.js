var express = require('express');
var router = express.Router();
const db = require('../models');
const SearchServices = require('../services/SearchServices');
const searchServices = new SearchServices(db);


router.post('/', async function (req, res, next){
    let search = req.body;
    let data;
    try{
        if( search?.categories ){ data = await searchServices.searchCategory(search.categories); }
        if( search?.brand ) { data = await searchServices.searchBrand(search.brand); }
        if( search?.product ) { data = await searchServices.searchProduct(search.product); }  
    }catch( err ) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve search" }}); return; }
    data?.[0] == 0 ?
        res.status(500).json({ status : "error", statusCode : 500, data : { result : "No products found", products : data }}) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : `Products found : ${data?.length}`, products : data }})
})

module.exports = router;

