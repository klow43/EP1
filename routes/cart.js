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
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Gets cart of user'
    // #swagger.produces = ['json'] 
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
    let userid = UserId(req)
    let cart;
    try{
        cart = await cartServices.getCart(userid) 
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieve cart"}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : "Products found", Products : cart[0]?.Products }});
});

//req body = productid, quantity, unitPrice
router.post('/', isUser, async function (req,res, next){ 
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Adds product to users shopping cart'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/addtocart' },
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
    let data, cartid, membership;
    let userid = UserId(req)
    let product = req.body; 
    try{ 
        //get membership of userid(discount for order)
        membership = await membershipServices.getUserMembership(userid);
        //set products discount from users memebership
        product.discount = membership.Membership.discount;
        //calculate users discounted price
        product.discountUnitPrice = product.discount == 0 ? product.unitPrice : ( product.unitPrice - (product.unitPrice / 100 * product.discount) );
        //create or increment cart.
        cartid = await cartServices.getCartId(userid) 
            let [ result, created ] =  await cartServices.postCart(cartid,product) 
           if( created == false ) { data = await cartServices.incrementCart(product,cartid) }
           if( created == true || data[0][1]){ res.status(200).json({ status : "success", statusCode : 200, data : { result : "Product added to cart."}}); return; }
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot add to cart, please check availability on product."}}); return;}
});

router.post('/checkout/now', isUser, async function (req, res, next){
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Checks out users cart and creates order.'
    // #swagger.produces = ['json']
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
    let orderid = randomstring.generate({ length : 8 })
    let userid = UserId(req)
    let cart, membership,order, cartupdate; 
    let quantity = 0; 
    try{
    //get cart of user, Products, discount,cartid, membership
        cart = await cartServices.getCart( userid );
        membership = await membershipServices.getUserMembership( userid );
        quantity = membership.quantity

    //create array for bulkCreate order.
        cartupdate = cart[0].Products.map(product => { 
            let obj = {};
            obj.quantity = product.CartProduct.quantity
            obj.membershipstatus = membership.Membership.Membership
            obj.product = product.name
            obj.orderId = orderid,
            obj.discountUnitPrice = product.CartProduct.discountUnitPrice,
            quantity += obj.quantity
            return obj;
        })

    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot check out cart. Please check quantity of products."}}); return; }     
    //create transaciton for all steps creating an order/update membership/"remove" items from cart
    const t = await db.sequelize.transaction();
    try{
    
    //create order
    order = await orderServices.createOrder( cartupdate, t )
   
    //remove cartitems from cart(softdelete, Processed = 1)
    await cartServices.checkoutCart( cart[0].id, t )
  
    //update membership quantity(hook to change membership)
    await membershipServices.updateUserQuantity( quantity, userid, t )

    //create array for bulkCreate userorder
    let userorder = order.map(orders => {
        let newValue = {}
        newValue.UserId = userid
        newValue.OrderId = orders.id
        return newValue;
    });
    //create userorder
    await orderServices.createUserOrder( userorder, { transaction : t } )
    await orderServices.createUserProgress( userorder, t )

    t.commit()
   }catch(err){ t.rollback(); console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot check out cart. Please check quantity of products."}}); return; }     
    res.status(200).json({ status : "success", statusCode : 200, data : { result : `Order has been created!`} })
});
  
//req body = productid,quantity
router.put('/', isUser,  async function (req,res, next){ 
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Alters a product in cart/decrement'
    // #swagger.produces = ['json'] 
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/altercart' },
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
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
    // #swagger.tags = ['Cart']
    // #swagger.description = 'Deletes item from cart'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/deletecart' },
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
    let userid = UserId(req)
    let productid = req.body?.productid;
    if(!req.body.productid){ res.status(400).json({ status : "error", statusCode : 400, data : { result : "productid must be provided."} }); return;}
    try{
        cartid = await cartServices.getCartId(userid)
        result = await cartServices.deleteFromCart(productid,cartid.id)
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot delete from cart"}}); return;}
    result == 0 ? 
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "No product of id in cart."}}) : 
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Product removed from cart."}})
});
  
module.exports = router;  