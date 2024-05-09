module.exports = ( sequelize, Sequelize ) => {
    const OrderStatus = sequelize.define('OrderStatus', { 
        Status : Sequelize.DataTypes.STRING(150),
    }, { timestamps : false },
    )
    OrderStatus.associate = function(models) {
        OrderStatus.hasMany( models.OrderProgress, { onDelete : 'RESTRICT'} )
    }
    return OrderStatus  
}; 