module.exports = ( sequelize, Sequelize ) => {
    const ProductCategories = sequelize.define('ProductCategories', {
        CategoryId : Sequelize.DataTypes.INTEGER,
        ProductId :  Sequelize.DataTypes.INTEGER,
    }, { timestamps : false }, 
);
    return ProductCategories
}