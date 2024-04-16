module.exports = ( sequelize, Sequelize ) => {
    const User = sequelize.define('User', {
        firstName : {
            type : Sequelize.DataTypes.STRING,
            validate : {
                allowNull : false,
                isAlpha : true,
                msg : "Name cannot be empty, and must consist of only letters."
            },
        },
        lastName : {
            type : Sequelize.DataTypes.STRING,
            validate : {
                allowNull : false,
                isAlpha : true,
                msg : "Name cannot be empty, and must consist of only letters."
            },
        },
        email : {
            type : Sequelize.DataTypes.STRING,
            validate : {
                isEmail : true,
                notEmpty : true,
                msg : "email must be in correct format. Example@email.com"
            },
            validate : {
                unique : true,
                msg : "email already in use."
            }
        },
        password : {
            type : Sequelize.DataTypes.BLOB,
            validate : {
                allowNull : false,
                msg : "Password cannot be null."
            },
        },
        phone : {
            type : Sequelize.DataTypes.INTEGER,
            validate : {
                allowNull : false,
                isNumeric : true,
                msg : "Phone cannot be null and can only consist of numbers."
            },
        },
        userName : {
            type : Sequelize.DataTypes.STRING,
            validate : {
                allowNull : false,
                unique : true,
                msg : "Username already in use."
                },
            },
        address : {
            type : Sequelize.DataTypes.STRING,
            validate : {
                allowNull : false,
                msg : "Adress cannot be null." 
            }
        }
        }, { timestamps : true },
        );
    User.associate = function(models) {
        User.belongsToMany( models.Order, { through : models.UserOrder })
    };
    return User
};