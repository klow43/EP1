module.exports = ( sequelize, Sequelize ) => {
    const Brand = sequelize.define('Brand', {
        Brand : {
            type : Sequelize.DataTypes.TEXT,
            validate : {
                allowNull : false,
                msg : "Name cannot be empty."
            },
        },
    }, { timestamps : false },);
    Brand.associate = function(models) {
        Brand.belongsToMany( models.Product, { through : models.ProductBrand, foreignKey : 'BrandId', onDelete : 'RESTRICT' })
    };
    return Brand
}; 