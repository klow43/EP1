module.exports = ( sequelize, Sequelize ) => {
    const UserOrders = sequelize.define('UserOrders', {
    }, { timestamps : false }, 
);
    UserOrders.associate = function(models) {
        UserOrders.belongsTo( models.Order )
        UserOrders.belongsTo( models.User )
    }
    return UserOrders 
} 