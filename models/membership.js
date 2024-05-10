module.exports = ( sequelize, Sequelize ) => {
    const Membership = sequelize.define('Membership', {
        Membership : {
            type : Sequelize.DataTypes.STRING(100),
            allowNull : false, 
            validate : {
                 notNull : { msg : "Membership cannot be null."},
                 isAlpha : { msg : "lastName must consist of only letters." }
            } 
        },
        minItems : {
            type : Sequelize.DataTypes.INTEGER,
                allowNull : false,
                validate : {
                    notNull : { msg : "minItems cannot be null."},
                    isNumeric : { msg : "minItems can only consist of numbers." }
               },                 
        },
        maxItems : {
            type : Sequelize.DataTypes.INTEGER,
                allowNull : false,
                validate : {
                    notNull : { msg : "maxItems cannot be null."},
                    isNumeric : { msg : "maxItems can only consist of numbers." }
               },
        },
        discount : {
            type : Sequelize.DataTypes.INTEGER,
                allowNull : false,
                validate : {
                    notNull : { msg : "minItems cannot be null."},
                    isNumeric : { msg : "maxItems can only consist of numbers." }
               },
        },
    }, { timestamps : false }, 
);
 Membership.associate = function(models) {
     Membership.hasMany( models.UserMembership, {  onDelete : 'RESTRICT', hooks : true })
    };
    return Membership
} 