var express = require('express');
var router = express.Router();
const axios = require('axios')
const { cookieCheck } = require('../services/middleware');

let categories;
let brands;

router.get('/', cookieCheck, async function(req, res,next){

    getproducts = await axios({
        method : 'get',
        url : 'http://localhost:3000/products'
    }).catch(err => console.log(err.status));

    getbrands = await axios({
        method : 'get',
        url : 'http://localhost:3000/brands'
    }).catch(err => console.log(err.status));

    getcategories = await axios({
        method : 'get',
        url : 'http://localhost:3000/categories'
    }).catch(err => console.log(err.status));

    categories = getcategories?.data?.data?.categories;
    brands = getbrands?.data?.data?.brands;
    products = getproducts?.data?.data?.products
    res.render('products', { products : products, categories : categories, brands : brands })
})

router.post('/', async function(req,res,next){
    let search = req.body; 
    item = search.item;
    type = search.type;
    if(search.item == null || search.item == 0 ){ res.render('products', { products : [], categories : categories, brands : brands }); return;}
    products = await axios({
        method : 'post',
        url : 'http://localhost:3000/search',
        data : {
            search : item,
            type : type
        }
    }).catch(err => console.log(err.status));
    res.render('products', { products : products?.data?.data?.products, categories : categories, brands : brands })
})

//if !id - POST else put
router.post('/new', async function(req,res,next){
    let product = req.body;

    if(!req.body.id){
        create = await axios({
            method : 'post',
            url : 'http://localhost:3000/products',
            data : product 
        }).catch(err => console.log(err.status));
    }

    else{
        alter = await axios({
            method : 'put',
            url : 'http://localhost:3000/products',
            data : product
        }).catch(err => console.log(err.status));     
    }

    res.redirect('/admin/products');
})


router.delete('/', async function(req,res,next){
    let id = req.body.id;
    console.log(id)
    product = await axios({
        method : 'delete',
        url : 'http://localhost:3000/products',
        data : {
            id : id
        }
    }).catch(err => console.log(err?.response?.data));
    res.end()
})

//change products
module.exports = router;