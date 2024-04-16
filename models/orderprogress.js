module.exports = ( sequelize, Sequelize ) => {
    const OrderProgress = sequelize.define('OrderProgress', {
        OrderId : Sequelize.DataTypes.INTEGER,
        OrderStatusId :  Sequelize.DataTypes.INTEGER,
    }, { timestamps : false }, 
);
    return OrderProgress 
} 