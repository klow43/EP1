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
            }
        }, {
            hooks : {
                //if quantity gets to 0, softDelete(paranoid)
                afterValidate : () => {
                        Product.destroy({where : { quantity : 0 }});
                }
            }
        },{ timestamps : true, paranoid : true, deletedAt : 'isDeleted' }, 
    );
    Product.associate = function(models) {
        Product.belongsToMany( models.Cart, { as : 'Product', through : models.CartProduct, foreignKey : 'ProductId'}) 
    };
    return Product
}


