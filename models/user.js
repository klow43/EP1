module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define('User', {
        firstName : {
            type : Sequelize.DataTypes.STRING(100),
            allowNull : false,
            validate : {
                notNull : { msg : "firstName cannot be empty" },
                isAlpha : { msg : "firstName must consist of only letters." }
            }
        },
        lastName : {
            type : Sequelize.DataTypes.STRING(100),
            allowNull : false,
            validate : {
                notNull : { msg : "lastName cannot be empty" },
                isAlpha : { msg : "lastName must consist of only letters." },
            }
   
        },
        email : {
            type : Sequelize.DataTypes.STRING(100),
            allowNull : false, 
            unique : { msg : "email already in use." },       
            validate : {
                isEmail : { msg : "email must be in correct format. Example@email.com" },
                notNull : { msg : "email is required" },
            }
        },
        password : {
            type : Sequelize.DataTypes.BLOB,
            allowNull : false,
            validate : {
              notNull : { msg : "Password cannot be null." },
            },
        },
        phone : {
            type : Sequelize.DataTypes.INTEGER,
            allowNull : false,
            validate : {
                notNull : { msg : "Phone cannot be null." },
                isNumeric : { msg : "Phone can only consist of numbers." }
            }
        },
        userName : {
            type : Sequelize.DataTypes.STRING(100),
            allowNull : false,
            unique : { msg : "userName already in use." },            
            validate : {
                notNull :{ msg : "userName is required." },
            }
        },
        address : {
            type : Sequelize.DataTypes.STRING(150),
            allowNull : false,
            validate : {
                notNull : { msg : "Address cannot be null." }
            }
        },
        }, { timestamps : true,
            hooks : {
                //create membership,role,cart on register
                afterCreate : async (User, options) => {
                   await sequelize.models.UserMembership.create({ UserId : User.id });
                   await sequelize.models.UserRole.create({ UserId : User.id });
                   await sequelize.models.Cart.create({ UserId : User.id });
                }
            }
        },
    );
    User.associate = function(models) {
        User.hasOne( models.UserRole )
        User.hasMany( models.UserOrders )
        User.hasOne( models.UserMembership )
    }
    return User  
};