module.exports = ( sequelize, Sequelize ) => {
        const ProductBrand = sequelize.define('ProductBrand', {
            BrandId : Sequelize.DataTypes.INTEGER,
            ProductId :  Sequelize.DataTypes.INTEGER,
        }, { timestamps : false }, 
    );
    return ProductBrand
} 