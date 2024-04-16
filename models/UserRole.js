module.exports = ( sequelize, Sequelize ) => {
    const UserRole = sequelize.define('UserRole', {
           UserId : Sequelize.DataTypes.INTEGER,
           RoleId : Sequelize.DataTypes.INTEGER
        }, { timestamps : false }, 
    );
        return UserRole
 }
