module.exports = ( sequelize, Sequelize ) => {
    const UserOrder = sequelize.define('UserOrder', {
        UserId : Sequelize.DataTypes.INTEGER,
        OrderId :  Sequelize.DataTypes.STRING,
    }, { timestamps : false }, 
);
    return UserOrder
} 