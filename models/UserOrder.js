module.exports = ( sequelize, Sequelize ) => {
    const UserOrders = sequelize.define('UserOrders', {
        OrderId : Sequelize.DataTypes.INTEGER,
        UserId : Sequelize.DataTypes.INTEGER
    }, { timestamps : false }, 
);
    UserOrders.associate = function(models) {
        UserOrders.belongsTo( models.Order )
        UserOrders.belongsTo( models.User )
    }
    return UserOrders 
} 