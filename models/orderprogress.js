module.exports = ( sequelize, Sequelize ) => {
    const OrderProgress = sequelize.define('OrderProgress', {
        OrderId : Sequelize.DataTypes.INTEGER,
        OrderStatusId :  { 
            type : Sequelize.DataTypes.INTEGER,
            defaultValue : 1,
            }
        }, { timestamps : false }, 
    );
    return OrderProgress 
} 

//default value : 1 (In progress) 