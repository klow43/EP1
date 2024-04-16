module.exports = ( sequelize, Sequelize ) => {
    const OrderStatus = sequelize.define('OrderStatus', { 
        Status : Sequelize.DataTypes.TEXT,
    }, { timestamps : false },
    )
    OrderStatus.associate = function(models) {
        OrderStatus.belongsToMany( models.Order, { through : 'OrderProgress', defaultValue : 1 })
    };
    return OrderStatus  
};

//default value : 1 (In progress) 