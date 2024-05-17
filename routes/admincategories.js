var express = require('express');
var router = express.Router();
const axios = require('axios')

router.get('/', async function(req, res,next){

    getcategories = await axios({
        method : 'get',
        url : 'http://localhost:3000/categories'
    }).catch(err => console.log(err.status));

    categories = getcategories?.data?.data?.categories;
    res.render('categories', { categories : categories })
})

router.post('/', async function(req,res,next){
    let category = req.body.categories;
    create = await axios({
        method : 'post',
        url : 'http://localhost:3000/categories',
        data : {
            category : category
        }
    }).catch(err => console.log(err));
    res.redirect('/admin/categories');
})

router.delete('/', async function(req,res,next){
    let id = req.body.id;
    console.log(id)
    product = await axios({
        method : 'delete',
        url : 'http://localhost:3000/brands',
        data : {
            id : id
        }
    }).catch(err => console.log(err?.response?.data));
    res.end()
})


module.exports = router;