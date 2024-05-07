module.exports = ( sequelize, Sequelize ) => {
        const ProductBrands = sequelize.define('ProductBrands', {
            BrandId : Sequelize.DataTypes.INTEGER,
            ProductId :  Sequelize.DataTypes.INTEGER,
        }, { timestamps : false }, 
    );
    ProductBrands.associate = function(models) {
        ProductBrands.belongsTo( models.Brand )
        ProductBrands.belongsTo( models.Product )
    }
    return ProductBrands
} 