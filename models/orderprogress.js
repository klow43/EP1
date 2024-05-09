module.exports = ( sequelize, Sequelize ) => {
    const OrderProgress = sequelize.define('OrderProgress', {
        OrderStatusId :  { 
            type : Sequelize.DataTypes.INTEGER,
            defaultValue : 1,
            }
        }, { timestamps : false }, 
    );
    OrderProgress.associate = function(models) {
        OrderProgress.belongsTo( models.OrderStatus )
        OrderProgress.belongsTo( models.Order )
    }
    return OrderProgress 
} 
 
//default value : 1 (In progress) 