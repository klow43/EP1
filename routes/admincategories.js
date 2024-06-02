var express = require('express');
var router = express.Router();
const axios = require('axios');
const { cookieCheck } = require('../services/middleware');

router.get('/', cookieCheck, async function(req, res,next){
    // #swagger.ignore = true
    getcategories = await axios({
        method : 'get',
        url : 'http://localhost:3000/categories'
    }).catch(err => console.log(err.status));

    categories = getcategories?.data?.data?.categories;
    res.render('categories', { categories : categories })
})

//if !id - post, else put
router.post('/', async function(req,res,next){
    // #swagger.ignore = true
    let category = req.body.categories;
    if(!req.body.id){
        create = await axios({
            method : 'post',
            url : 'http://localhost:3000/categories',
            data : {
                category : category
            }
        }).catch(err => console.log(err));
    }
    else{
        alter = await axios({
            method : 'put',
            url : 'http://localhost:3000/categories',
            data : {
                id : req.body.id,
                category : category
            }
        }).catch(err => console.log(err));
    }
    res.redirect('/admin/categories');
})

router.delete('/', async function(req,res,next){
    // #swagger.ignore = true
    let id = req.body.id;
    console.log(id)
    product = await axios({
        method : 'delete',
        url : 'http://localhost:3000/categories',
        data : {
            id : id
        }
    }).catch(err => console.log(err?.response?.data));
    res.redirect('/admin/categories')
})


module.exports = router;