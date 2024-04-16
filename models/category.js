module.exports = ( sequelize, Sequelize ) => {
    const Category = sequelize.define('Category', {
        Category : {
            type : Sequelize.DataTypes.STRING,
            validate : {
                allowNull : false,
                msg : "Name cannot be empty."
            },
        },
    }, { timestamps : false },);
    Category.associate = function(models) {
        Category.belongsToMany( models.Product, { through : models.ProductCategory, foreignKey : 'CategoryId', onDelete : 'RESTRICT' })
    };
    return Category  
};  