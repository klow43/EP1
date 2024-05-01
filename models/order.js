module.exports = ( sequelize, Sequelize ) => {
    const Order = sequelize.define('Order', {
        id : {
            type : Sequelize.DataTypes.STRING,
            primaryKey : true,
        },
        membershipstatus : Sequelize.DataTypes.STRING(100),
        product : Sequelize.DataTypes.STRING(100),
        quantity : Sequelize.DataTypes.INTEGER
        }, { timestamps : true,
        hooks : async (order, cb) => {
                await sequelize.models.orderprogress.create({OrderId : Order.id});
                await sequelize.models.userorders.create({UserId : Order.userId, OrderId : id})
            }
        }, 
    );
    Order.associate = function(models) {
        Order.belongsToMany( models.User, { through : models.UserOrder })
    }
    return Order 
}  