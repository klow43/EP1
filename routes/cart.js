var express = require('express');
var router = express.Router();
const db = require('../models');
const CartServices = require('../services/CartServices');
const cartServices = new CartServices(db);
const OrderServices = require('../services/OrderServices');
const orderServices = new OrderServices(db);
const MembershipServices = require('../services/MembershipServices');
const membershipServices = new MembershipServices(db);
const { isUser, UserId } = require('../services/middleware');
const randomstring = require('randomstring');

//only users all endpoints.
router.get('/', isUser, async function (req, res, next){
    let userid = UserId(req)
    let cart;
    try{
        cart = await cartServices.getCart(userid) 
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve cart"}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : "Products found", Products : cart[0]?.Products }});
});

//req body = productid, quantity, unit price, discount
router.post('/', isUser, async function (req,res, next){ 
    let data, cartid;
    let userid = UserId(req)
    let product = req.body;
    try{ 
        cartid = await cartServices.getCartId(userid) 
            let [ result, created ] =  await cartServices.postCart(cartid,product) 
           created == false ? data = await cartServices.incrementCart(product,cartid) : next()
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot add to cart, please check availability on product."}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : "Product added to cart."}})
});

router.post('/checkout/now', isUser, async function (req, res, next){
    let orderid = randomstring.generate({ length : 8 })
    let userid = UserId(req)
    let cart, membership,order,finish;
    let quantity = 0; 
    try{
    //get cart of user, Products, discount,cartid, membership
        cart = await cartServices.getCart( userid);
        membership = await membershipServices.getUserMembership( userid);
        quantity = membership.quantity

    //create array with Products,update for bulkCreate order.
        let cartupdate = cart[0].Products.map(product => { 
            product.Quantity = product.CartProduct.quantity
            product.membershipstatus = membership.Membership.Membership
            product.product = product.name
            product.OrderId = orderid,
            product.discountUnitPrice = product.CartProduct.discountUnitPrice,
            quantity += product.Quantity
            return product;
        })

    //create order
        order = await orderServices.createOrder( cartupdate )
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot check out cart. Please check quantity of products."}}); return; }     
    try{
    //remove cartitems from cart(softdelete, Processed = 1)
    await cartServices.checkoutCart( cart[0].id )

    //update membership quantity(hook to change membership)
    await membershipServices.updateUserQuantity( quantity, userid )

    //create array for bulkCreate userorder
    let userorder = order.map(orders => {
        let newValue = {}
        newValue.UserId = userid
        newValue.OrderId = orders.Id
        return newValue;
    });

    //create userorder
    finish = await orderServices.createUserOrder( userorder )
   }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot check out cart. Please check quantity of products."}}); return; }     
    res.status(200).json({ status : "success", statusCode : 200, data : { result : `Order has been created!`} })
});
 
//req body = productid,quantity
router.put('/', isUser,  async function (req,res, next){
    let userid = UserId(req)
    let product = req.body
    try{
        cartid = await cartServices.getCartId(userid)
        await cartServices.updateCart(product,cartid.id)
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot update cart"}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : "product upated."}})
});

//req.body = productid
router.delete('/', isUser, async function (req, res, next){
    let userid = UserId(req)
    let productid = req.body?.productid;
    try{
        cartid = await cartServices.getCartId(userid)
        result = await cartServices.deleteFromCart(productid,cartid.id)
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot delete from cart"}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : "Product removed from cart."}})
});

module.exports = router; 