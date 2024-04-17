const Product = require('./product')
module.exports = ( sequelize, Sequelize ) => {
        const CartProduct = sequelize.define('CartProduct', {
            CartId : Sequelize.DataTypes.INTEGER,
            quanity : Sequelize.DataTypes.INTEGER,
            unitPrice : Sequelize.DataTypes.DOUBLE(10,2),
        }, 
        { 
        hooks : {
            //Check that users request quantity is not over quantity available.
            beforeValidate : () => {   
                if(this.CartProduct.quantity > Product.quantity){
                    return Promise.reject(new Error("Order request over quantity available."))
                }
            },
            //if user set quantity of item to 0, remove item from cart.
            afterValidate : () => {
                if(CartProduct.quantity == 0){
                    CartProduct.destroy({where : { quantity : 0 }});
                }
            }
        }},{ timestamps : true }, 
    );
    return CartProduct 
} 


