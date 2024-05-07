module.exports = ( sequelize, Sequelize ) => {
        const CartProduct = sequelize.define('CartProduct', {
        quantity : Sequelize.DataTypes.INTEGER,
        unitPrice : Sequelize.DataTypes.DOUBLE(10,2),
        ProductId : {
                type : Sequelize.DataTypes.INTEGER,
                unique : false,
        },
        Processed : { 
            type : Sequelize.DataTypes.INTEGER, 
            default : 0  
        },
        discountUnitPrice : Sequelize.DataTypes.DOUBLE(10,2),
        discount : Sequelize.DataTypes.INTEGER,
    },{ timestamps : true,       
        hooks : {
            //if user set quantity of item to 0, remove item from cart.
            afterUpdate : () => {
                if(product.quantity == 0){ 
                    Product.destroy({where : {quantity : 0}})
                }
            },  
            beforeCreate : ( product, cb ) => { 
                product.discountUnitPrice = 
                product.discount == 0 ? 
                    product.unitPrice : ( product.unitPrice - (product.unitPrice / 100 * product.discount) )
            },
            beforeCreate : async ( product, cb ) => {
                value = await sequelize.models.Product.findOne({ where : { id : product.ProductId }})
                if( value.deletedAt == 1 ) { throw new Error('Cannot add sold out items to cart.')}
            }
        } 
    })
 return CartProduct       
}


 