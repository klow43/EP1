module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define('User', {
        firstName : {
            type : Sequelize.DataTypes.STRING(100),
            notNull : { msg : "firstName cannot be empty" },
            isAlpha : { msg : "firstName must consist of only letters." },
        },
        lastName : {
            type : Sequelize.DataTypes.STRING(100),
            notNull : { msg : "lastName cannot be empty" },
            isAlpha : { msg : "lastName must consist of only letters." },
        },
        email : {
            type : Sequelize.DataTypes.STRING(100),
            isEmail : { msg : "email must be in correct format. Example@email.com" },
            notEmpty : { msg : "email is require" },
            unique : { msg : "email already in use." },
        },
        password : {
            type : Sequelize.DataTypes.BLOB,
            notNull : { msg : "Password cannot be null." }
        },
        phone : {
            type : Sequelize.DataTypes.INTEGER,
            notNull : { msg : "Phone cannot be null." },
            isNumeric : { msg : "Phone can only consist of numbers." }
        },
        userName : {
            type : Sequelize.DataTypes.STRING(100),
            notNull :{ msg : "Username is required." },
            unique : { msg : "Username already in use." }
            },
        address : {
            type : Sequelize.DataTypes.STRING(150),
            allowNull : { msg : "Address cannot be null." }
        }
        }, { timestamps : true },
    );
    User.associate = function(models) {
        User.belongsToMany( models.Order, { through : models.UserOrder })
    },
        {
            hooks : {
                //create membership,role,cart on register
                afterCreate : (User) => {
                    models.UserMembership.create({ UserId : User.id})
                    models.UserRole.create({ UserId : User.id})
                    models.Cart.create({UserId : User.id})
                }
            }
        }
    return User
}; 