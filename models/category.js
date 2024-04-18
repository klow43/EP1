module.exports = ( sequelize, Sequelize ) => {
    const Category = sequelize.define('Category', {
        Category : {
                type : Sequelize.DataTypes.STRING(100),
                allowNull : false,
                unique : { msg : 'Category already exists.'}
        },
    }, { timestamps : false },);
    Category.associate = function(models) {
        Category.belongsToMany( models.Product, { through : models.ProductCategory, foreignKey : 'CategoryId', onDelete : 'RESTRICT' })
    };
    return Category  
};  