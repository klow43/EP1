module.exports = ( sequelize, Sequelize ) => {
    const Membership = sequelize.define('Membership', {
        id : {
            type : Sequelize.DataTypes.INTEGER,
            primaryKey : true,
        },
        Membership : {
            type : Sequelize.DataTypes.STRING(100),
                allowNull : false,
        },
        minItems : {
            type : Sequelize.DataTypes.INTEGER,
                allowNull : false
        },
        maxItems : {
            type : Sequelize.DataTypes.INTEGER,
                allowNull : false
        },
        discount : {
            type : Sequelize.DataTypes.INTEGER,
                allowNull : false
        },
    }, { timestamps : false }, 
);
 Membership.associate = function(models) {
     Membership.belongsToMany( models.User, { through : models.UserMembership, foreignKey : 'MembershipId',  onDelete : 'RESTRICT'})
    };
    return Membership
} 