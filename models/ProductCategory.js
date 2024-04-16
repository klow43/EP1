module.exports = ( sequelize, Sequelize ) => {
    const ProductCategory = sequelize.define('ProductCategory', {
        CategoryId : {
            type : Sequelize.DataTypes.INTEGER,
        },
        ProductId :  Sequelize.DataTypes.INTEGER,
    }, { timestamps : false }, 
);
    return ProductCategory
}