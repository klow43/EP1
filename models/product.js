module.exports = ( sequelize, Sequelize ) => {
    const Product = sequelize.define('Product', {
        name : {
            type : Sequelize.DataTypes.STRING,
                validate : {
                    allowNull : false,
                    msg : "Name must be provided."
                }, 
              },   
        description :  Sequelize.DataTypes.STRING,
        price : {
                type : Sequelize.DataTypes.FLOAT,
                validate : {
                    allowNull : false,
                    msg : "Price must be provided."
                },
            },
        quantity : {
                type : Sequelize.DataTypes.INTEGER,
                validate : {
                    allowNull : false,
                    isInt : true,
                    msg : "Quantity must be provided in form of number."   
                }
            },
        isDeleted : {
                type : Sequelize.DataTypes.BOOLEAN,
                defaultValue : 0
            },
        imgurl : {
                type : Sequelize.DataTypes.STRING,
                validate : {
                    isUrl : true,
                    allowNull : true,
                    msg : "Please provide image url for product"
                }
            },
        discount : Sequelize.DataTypes.INTEGER,
        date_added : Sequelize.DataTypes.DATE,
       
    }, { timestamps : true }, 
);
    Product.associate = function(models) {
        Product.belongsToMany( models.Cart, { as : 'Product', through : models.CartProduct, foreignKey : 'ProductId'}) 
    };
    return Product
}
