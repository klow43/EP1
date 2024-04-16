module.exports = ( sequelize, Sequelize ) => {
    const Role = sequelize.define('Role', {
            id : {
                type : Sequelize.DataTypes.INTEGER,
                primaryKey : true,
            },
            Role : {
                type : Sequelize.DataTypes.STRING,
                validate : {
                    allowNull : false,
                    isAlpha : true,
                    msg : "Role must consist of letters"
                },
            },
        }, { timestamps : false }, 
    );
        Role.associate = function(models) {
            Role.belongsToMany( models.User, { through : models.UserRole, defaultValue : 2, foreignKey : 'RoleId' })
        };
        return Role
 }

//defaultValue : 2 (User)