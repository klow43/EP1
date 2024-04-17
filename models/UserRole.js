module.exports = ( sequelize, Sequelize ) => {
    const UserRole = sequelize.define('UserRole', {
           UserId : Sequelize.DataTypes.INTEGER,
           RoleId :{
            type :  Sequelize.DataTypes.INTEGER,
            defaultValue : 2
            },     
        }, { timestamps : false }, 
    );
        return UserRole
 }

 //defaultValue : 2 (User)