module.exports = ( sequelize, Sequelize ) => {
    const Brand = sequelize.define('Brand', {
        Brand : {
            type : Sequelize.DataTypes.STRING(100),
            allowNull : false,
            unique : { msg : 'Brand already exists.'}
        },
    }, { timestamps : false },);
    Brand.associate = function(models) {
        Brand.belongsToMany( models.Product, { through : models.ProductBrand, foreignKey : 'BrandId', onDelete : 'RESTRICT' })
    };
    return Brand 
};  