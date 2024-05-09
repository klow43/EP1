module.exports = ( sequelize, Sequelize ) => {
    const Role = sequelize.define('Role', {
            id : {
                type : Sequelize.DataTypes.INTEGER,
                primaryKey : true,
            },
            Role : {
                type : Sequelize.DataTypes.STRING(50),
                    allowNull : false,
                    isAlpha : true,
            },
        }, { timestamps : false }, 
    );
        Role.associate = function(models) {
            Role.hasMany( models.UserRole, { onDelete : ' RESTRICT' })
        };
        return Role
 } 

