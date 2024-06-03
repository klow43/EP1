var express = require('express');
var router = express.Router();
const axios = require('axios');
const { cookieCheck } = require('../services/middleware');

let brands;

router.get('/', cookieCheck, async function (req, res, next){
    // #swagger.tags = ['Admin Brands']
    // #swagger.description = 'Gets list of all brands'
    // #swagger.produces = ['json']
    getbrands = await axios({
        method : 'get',
        url : 'http://localhost:3000/brands'
    }).catch(err => console.log(err.status));

    brands = getbrands?.data?.data?.brands;
        res.render('brands', { brands : brands })
});

//if !id - POST, else PUT
router.post('/', async function(req,res,next){
    // #swagger.tags = ['Admin Brands']
    // #swagger.description = 'Creates new brand or alters existing brand, if id - put request, !id - post''
    // #swagger.produces = ['json']
        /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/alterbrand' }
    }*/
    let brand = req.body.brands;
    if(!req.body.id){
        create = await axios({
            method : 'post',
            url : 'http://localhost:3000/brands',
            data : {
                brand : brand
            }
        }).catch(err => console.log(err));
    }
    else{
        alter = await axios({
            method : 'put',
            url : 'http://localhost:3000/brands',
            data : {
                id : req.body.id,
                brand : brand
            }
        }).catch(err => console.log(err));
    }

    res.redirect('/admin/brands');
})

router.delete('/', async function(req,res,next){
    // #swagger.tags = ['Admin Brands']
    // #swagger.description = 'Deletes brand of provided id, ondelete - restrict.'
    // #swagger.produces = ['json']
        /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/delete' }
    }*/
    let id = req.body.id;
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