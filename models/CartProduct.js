module.exports = ( sequelize, Sequelize ) => {
    const CartProduct = sequelize.define('CartProduct', {
        CartId : Sequelize.DataTypes.INTEGER,
        ProductId :  Sequelize.DataTypes.INTEGER,
    }, { timestamps : false }, 
);
    return CartProduct
} 