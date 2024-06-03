module.exports = ( sequelize, Sequelize ) => {
    const Order = sequelize.define('Order', {
        id : {
            type : Sequelize.DataTypes.INTEGER,
            primaryKey : true,
            unique : true,
            autoIncrement : true,
        },
        orderId : Sequelize.DataTypes.STRING(100),
        membershipstatus : Sequelize.DataTypes.STRING(100),
        product : Sequelize.DataTypes.STRING(100),
        quantity : Sequelize.DataTypes.INTEGER,
        discountUnitPrice : Sequelize.DataTypes.DOUBLE(10,2)
        }, { timestamps : true,
        hooks : {
            //check quantity of stock
            beforeCreate : async (Order, err) => {
                    value = await sequelize.models.Product.findOne({ where : { name : Order.product } })
                    if ( value.quantity < Order.quantity ) { throw new Error('Quantity over stock.') }
                    await sequelize.models.Product.decrement({ quantity : Order.quantity },{ where : { name : Order.product} }) 
                    await sequelize.models.Product.update({ deletedAt : 1 },{ where : { quantity : 0 } })    
                },
            }
        }, 
    ); 
    Order.associate = function(models) {
        Order.hasOne( models.OrderProgress )
        Order.hasMany( models.UserOrders )
    }
    return Order 
}   