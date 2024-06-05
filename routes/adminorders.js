var express = require('express');
var router = express.Router();
const axios = require('axios');
const { cookieCheck } = require('../services/middleware');


router.get('/', cookieCheck, async function (req, res, next){
    // #swagger.tags = ['Admin Order']
    // #swagger.description = 'Gets list of all orders'
    // #swagger.produces = ['json']

    getorders = await axios({
        method : 'get',
        url : 'http://localhost:3000/orders'
    }).catch(err => console.log(err.status));

    getStatuses = await axios({
        method : 'get',
        url : 'http://localhost:3000/orders/statuses'
    }).catch(err => console.log(err.status));

    products = getorders?.data?.data?.result
    statuses = getStatuses?.data?.data?.result
    let orders = [...new Map(products.map(x => [x.orderId, x])).values()]
    
        res.render('orders', { products : products, statuses : statuses, orders : orders})
});


router.post('/', async function(req, res, next){
    // #swagger.tags = ['Admin Order']
    // #swagger.description = 'Alters order of provided ids status'
    // #swagger.produces = ['json']
        /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/alterorder' }
    }*/
    changeOrder = await axios({
        method : 'put',
        url : 'http://localhost:3000/orders',
        data : req.body

    }).catch(err => console.log(err));

    res.redirect('/admin/orders')
});

//req.body = orderid
router.delete('/', async function(req, res, next){
    // #swagger.tags = ['Admin Order']
    // #swagger.description = 'Deletes order of provided id'
    // #swagger.produces = ['json']
        /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/deleteorder' }
    }*/
    deleteOrder = await axios({
        method : 'delete',
        url : 'http://localhost:3000/orders',
        data : {
            orderid : req.body.orderid
        },
    }).catch(err => console.log(err));  
    res.end() 
}) 

module.exports = router;  