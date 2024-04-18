module.exports = ( sequelize, Sequelize ) => {
    const Order = sequelize.define('Order', {
        id : {
            type : Sequelize.DataTypes.STRING,
            primaryKey : true,
        },
        membershiptatus : Sequelize.DataTypes.STRING(100),
        product : Sequelize.DataTypes.STRING(100),
        quantity : Sequelize.DataTypes.INTEGER
        }, { timestamps : true,
        hooks : async (order, cb) => {
                await sequelize.models.orderprogress.create({OrderId : order.id});
                await sequelize.models.userorders.create({UserId : order.userId, OrderId : id})
            }
        }, 
    );
    return Order 
}  