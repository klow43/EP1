module.exports = ( sequelize, Sequelize ) => {
        const UserMembership = sequelize.define('UserMembership', {
            UserId : Sequelize.DataTypes.INTEGER,
            MembershipId : {
                type : Sequelize.DataTypes.INTEGER,
                //defaultValue : 1 (Bronze) 
                defaultValue : 1
            },
            quantity : {
                type : Sequelize.DataTypes.INTEGER,
                defaultValue : 0
            }
        }, { timestamps : false,
            hooks : {
                beforeUpdate : async ( UserMembership , options ) => {
                    let memberships = await sequelize.models.Membership.findAll();
                    await memberships.forEach(membership => {
                        if( UserMembership.quantity >= membership.minItems && UserMembership.quantity < membership.maxItems )
                            { UserMembership.MembershipId = membership.id }
                    })
                },
            } 
         },
    );
    UserMembership.associate = function(models) {
        UserMembership.belongsTo( models.Membership )
        UserMembership.belongsTo( models.User)
    }
    return UserMembership;
};

