module.exports = ( sequelize, Sequelize ) => {
    const Brand = sequelize.define('Brand', {
        brand : {
            type : Sequelize.DataTypes.STRING(100),
            allowNull : false,
            unique : true,
        },
    }, { timestamps : false },);
    Brand.associate = function(models) {
        Brand.hasMany( models.ProductBrands, { onDelete : 'RESTRICT' })
    };
    return Brand 
}; 