module.exports = ( sequelize, Sequelize ) => {
    const Membership = sequelize.define('Membership', {
        id : {
            type : Sequelize.DataTypes.INTEGER,
            primaryKey : true,
        },
     Membership : Sequelize.DataTypes.STRING,
     minItems : Sequelize.DataTypes.INTEGER,
     maxItems : Sequelize.DataTypes.INTEGER,
     discount : Sequelize.DataTypes.INTEGER
    }, { timestamps : false }, 
);
 Membership.associate = function(models) {
     Membership.belongsToMany( models.User, { through : models.UserMembership, foreignKey : 'MembershipId', defaultValue : 1, onDelete : 'RESTRICT'})
    };
    return Membership
}

//defaultValue : 1 (Bronze) 