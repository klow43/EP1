var express = require('express');
var router = express.Router();
const db = require('../models');
const OrderServices = require('../services/OrderServices');
const orderServices = new OrderServices(db);
const jwt = require('jsonwebtoken');
const { isAdmin, isUser, UserId} = require('../services/middleware');


router.get('/', isUser, async function(req, res, next) {
    const user = UserId(req)
    let orders;
    if( user == 1) {
        try{
            orders = await orderServices.getAllOrders();
        }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve users orders"}})}
    }
    else { 
        try{
            orders = await orderServices.getOrders(user);
        }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve orders"}})}
    }
    res.status(200).json({ status : "success", statusCode : 200, data : { result : orders } });
})

router.put('/', isAdmin, async function(req, res, next){
    let order = req.body;
    let result;
    try{
        result = await orderServices.alterOrder(order) 
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update orderstatus"}})}
    result[0] = 0 ?
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "No order of provided id." }}) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Oderstatus updated." }})
})


module.exports = router;