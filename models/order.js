module.exports = ( sequelize, Sequelize ) => {
    const Order = sequelize.define('Order', {
        id : {
            type : Sequelize.DataTypes.STRING,
            primaryKey : true,
        },
        membershiptatus : Sequelize.DataTypes.STRING(100),
        product : Sequelize.DataTypes.STRING(100),
        quantity : Sequelize.DataTypes.INTEGER
        }, { timestamps : true }, 
    );
    return Order 
}  