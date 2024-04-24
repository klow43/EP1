//assuming Product.brand and Product.category is sent from frontend when adding new product(dropdown)
module.exports = ( sequelize, Sequelize ) => {
    const Product = sequelize.define('Product', {
        name : {
            type : Sequelize.DataTypes.STRING(100),
                    allowNull : false,
                    unique : { msg : 'Product already exists.'}
              },   
        //not requiring description
        description :  Sequelize.DataTypes.STRING(255),
        price : {
                type : Sequelize.DataTypes.DOUBLE(10,2),
                    allowNull :  { msg : 'Price must be present.'}
            },
        quantity : {
                type : Sequelize.DataTypes.INTEGER,
                    allowNull : { msg : 'Quantity must be present.'},
                    isInt : { msg : 'Quantity must be a number.'},
            },
        imgurl : {
                type : Sequelize.DataTypes.STRING(255),
                    isUrl : { msg : 'Invalid url'},
                    allowNull : { msg : 'Invalid url'},
            },
            deletedAt : {
                type : Sequelize.DataTypes.BOOLEAN,
                defaultValue : null,
            }
        }, { timestamps : true,
            hooks : {
                afterCreate: async (product, options) => {
                        //if updating quantity of products, result in 0, soft delete(paranoid)
                        Product.destroy({where : { quantity : 0, deletedAt : false }});
                }, 
            }
        },
    );
    Product.associate = function(models) {
        Product.belongsToMany( models.Brand , { through : models.ProductBrands })
        Product.belongsToMany( models.Category, { through : models.ProductCategories })
        Product.belongsToMany( models.Cart, { as : 'Product', through : models.CartProduct, foreignKey : 'ProductId' }) 
    } 
    return Product 
}         
    
 
  