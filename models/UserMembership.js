module.exports = ( sequelize, Sequelize ) => {
        const UserMembership = sequelize.define('UserMembership', {
            UserId : Sequelize.DataTypes.INTEGER,
            MembershipId : {
                type : Sequelize.DataTypes.INTEGER,
                defaultValue : 1
            }
        }, { timestamps : false },
    );
    return UserMembership;
};

//defaultValue : 1 (Bronze) 