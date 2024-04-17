module.exports = ( sequelize, Sequelize ) => {
    const Cart = sequelize.define('Cart', {  
    }, { timestamps : false }, 
)   
    Cart.associate = function(models) {
        Cart.belongsTo( models.User )
        Cart.belongsToMany( models.Product, { through : models.CartProduct, foreignKey : 'CartId'})
    };
    return Cart
}



