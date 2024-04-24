module.exports = ( sequelize, Sequelize ) => {
        const ProductBrands = sequelize.define('ProductBrands', {
            BrandId : Sequelize.DataTypes.INTEGER,
            ProductId :  Sequelize.DataTypes.INTEGER,
        }, { timestamps : false }, 
    );
    return ProductBrands
} 