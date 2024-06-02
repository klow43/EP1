var express = require('express');
var router = express.Router();
const db = require('../models');
const OrderServices = require('../services/OrderServices');
const orderServices = new OrderServices(db);
const { isAdmin, isUser, UserId } = require('../services/middleware');


//if Admin, get all orders, user gets own orders.
router.get('/', isUser, async function(req, res, next) {
    // #swagger.tags = ['Orders']
    // #swagger.description = 'If admin, a list of all orders will be provided, if user, users own orders will be provided'
    // #swagger.produces = ['json']
    const user = UserId(req)
    let orders;
    if( user == 1) {
        try{
            orders = await orderServices.getAllOrders();
        }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve users orders"}}); return;}
    }
    else { 
        try{
            orders = await orderServices.getOrders(user);
        }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve orders"}}); return;}
    }
    res.status(200).json({ status : "success", statusCode : 200, data : { result : orders } });
})

router.get('/statuses', isAdmin, async function (req, res, next){
    // #swagger.tags = ['Orders']
    // #swagger.description = 'list of all order status'
    // #swagger.produces = ['json']
    let result;
    try{
        result = await orderServices.getOrderStatuses();
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve statuses"}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : result } }); 
})

//req.body = orderid, statusid
router.put('/', isAdmin, async function(req, res, next){
    // #swagger.tags = ['Orders']
    // #swagger.description = 'Change status of provided order'
    // #swagger.produces = ['json']
        /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/alterorder' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header", "schema" : { $ref : "#/security/Admin"}}
    let order = req.body;
    if(!req.body.orderid || !req.body.statusid && typeof(req.body.statusid != 'number'))
        {res.status(400).json({ status : "error", statusCode : 400, data : { result : "orderid and statusid must be provided and statusid must consist of numbers."}}); return;}
    try{
        //get all records associated to orderid(string)
        let orderproducts = await orderServices.getOrder(order.orderid)
        //create array of keys associated to OrderId
        let orderids = orderproducts.map(x => { return x.Id })
        //update all records associated to OrderId(string)
        await orderServices.alterOrder( orderids, req.body.statusid )
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update orderstatus"}}); return;}
res.status(200).json({ status : "success", statusCode : 200, data : { result : "Orderstatus updated." }})
})

//req.body = orderid
router.delete('/', isAdmin, async function( req, res, next ) {
    // #swagger.tags = ['Orders']
    // #swagger.description = 'Deletes'
    // #swagger.produces = ['json']
        /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/deleteorder' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header", "schema" : { $ref : "#/security/Admin"}}
    let orderid = req.body.orderid;
    if(!req.body.orderid){res.status(400).json({ status : "error", statusCode : 400, data : { result : "orderid must be provided."}}); return;}
    try{
        await orderServices.deleteOrder(orderid)
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update orderstatus"}}); return;}
    res.status(200).json({ status : 'success', statusCode : 200, data : { result : "Order deleted."}})
})

module.exports = router;