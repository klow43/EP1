module.exports = ( sequelize, Sequelize ) => {
        const UserMembership = sequelize.define('UserMembership', {
            UserId : Sequelize.DataTypes.INTEGER,
            MembershipId : Sequelize.DataTypes.INTEGER
        }, { timestamps : false },
    );
    return UserMembership;
};