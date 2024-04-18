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
        brandid : {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : { msg : 'Brand must be provided.'}
        },
        categoryid : {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : { msg : 'Category must be provided.'}
        }
        }, { timestamps : true, paranoid : true,
            hooks : {
                //create relationsips
                afterCreate: async (product, callback) => {
                        //if updating quantity of products, result in 0, soft delete(paranoid)
                        Product.destroy({where : { quantity : 0, deletedAt : false }});
                        await sequelize.models.ProductBrand.create({ BrandId : product.brandid, ProductId : product.id});
                        await sequelize.models.ProductBrand.ProductCategory.create({CategoriId : product.categoryid, ProductId : product.id})
                },
            }
        }, 
    );
    Product.associate = function(models) {
        Product.belongsToMany( models.Cart, { as : 'Product', through : models.CartProduct, foreignKey : 'ProductId'}) 
    }
    return Product
}


