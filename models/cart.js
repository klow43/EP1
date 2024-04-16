module.exports = ( sequelize, Sequelize ) => {
    const Cart = sequelize.define('Cart', {
        quantity : Sequelize.DataTypes.INTEGER,  
        unitPrice : Sequelize.DataTypes.INTEGER,  
    }, { timestamps : true }, 
)   
    Cart.associate = function(models) {
        Cart.belongsTo( models.User )
        Cart.belongsToMany( models.Product, { through : models.CartProduct, foreignKey : 'CartId'})
    };
    return Cart
}



