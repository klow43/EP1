module.exports = ( sequelize, Sequelize ) => {
    const Order = sequelize.define('Order', {
        orderNumber : Sequelize.DataTypes.TEXT,
        membershiptatus : Sequelize.DataTypes.TEXT,

    }, { timestamps : true }, 
);
    Order.associate = function(models) {
        Order.belongsToMany( models.User, { through : models.UserOrder, foreignKey : 'OrderId' })
    };
    return Order
} 

//how to add purchase to table? add wares with quantity in independent row, connected with orderNumber
//create view to get all product by orderNumber, add total? 