module.exports = ( sequelize, Sequelize ) => {
    const ProductCategories = sequelize.define('ProductCategories', {
        CategoryId : Sequelize.DataTypes.INTEGER,
        ProductId :  Sequelize.DataTypes.INTEGER,
    }, { timestamps : false }, 
);
    ProductCategories.associate = function(models) {
        ProductCategories.belongsTo( models.Category )
        ProductCategories.belongsTo( models.Product )
    }
    return ProductCategories
}