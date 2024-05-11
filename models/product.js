//assuming Product.brand and Product.category is sent from frontend when adding new product(dropdown)
module.exports = ( sequelize, Sequelize ) => {
    const Product = sequelize.define('Product', {
        name : {
            type : Sequelize.DataTypes.STRING(100),
                    allowNull : false,
                    unique : { msg : 'Product already exists.'},
                    validate : {
                        notNull : { msg : "name of Product cannot be null."},
                    }  
              },   
        //not requiring description
        description :  Sequelize.DataTypes.STRING(255),
        price : {
                type : Sequelize.DataTypes.DOUBLE(10,2),
                allowNull : false,
                validate : {
                    notNull : { msg : 'Price must be present.'},
                    isNumeric : { msg : "Price must only consist of numbers."}
                } 
            },
        quantity : {
                type : Sequelize.DataTypes.INTEGER,
                allowNull : false,
                validate : {
                    notNull : { msg : 'Quantity must be present.'},
                    isInt : { msg : 'Quantity must be a number.'},
                }
            },
        imgurl : {
                type : Sequelize.DataTypes.STRING(255),
                allowNull : false,
                validate : {
                    isUrl : { msg : 'Invalid url'},
                    notNull : { msg : 'Url must be present'},
                }
            },
            deletedAt : {
                type : Sequelize.DataTypes.BOOLEAN,
                defaultValue : 0,
            }
        }, { timestamps : true,
            hooks : {
                afterUpdate : (product, options) => {
                        //if updating quantity of products, result in 0,
                        if( product.quantity == 0 ){ product.deletedAt = 1 }      
                }
            }
        },
    );
    Product.associate = function(models) {
        Product.hasOne( models.ProductBrands )
        Product.hasOne( models.ProductCategories )
        Product.belongsToMany( models.Cart, { through : models.CartProduct }) 
    } 
    return Product 
}  
  