module.exports = ( sequelize, Sequelize ) => {
    const Category = sequelize.define('Category', {
        Category : {
                type : Sequelize.DataTypes.STRING(100),
                allowNull : false,
                unique : true
        },
    }, { timestamps : false },);
    Category.associate = function(models) {
        Category.hasMany( models.ProductCategories, { onDelete : 'RESTRICT' })
    };
    return Category  
};  