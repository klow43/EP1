class MembershipService {
    constructor(db) {
        this.client = db.sequelize;
        this.Membership = db.Membership;
        this.UserMembership = db.UserMembership;
    }

    async alterUserMembership(userid, membershipid){
        return await this.UserMembership.update({
            MembershipId : membershipid,
            }, { where : { UserId : userid } }
        ).catch( err => { console.log(err); return err })
    }

    async updateUserQuantity(quantity, userid){
        return await this.UserMembership.update({
            quantity : quantity,
            }, { where : { UserId : userid }, individualHooks : true }
        ).catch( err => { console.log(err); return err })
    }

    async getUserMembership(userid){
        return await this.UserMembership.findOne({
            where : { UserId : userid },
            include : [{ 
                model : this.Membership, attributes : [ 'Membership',  'discount', 'maxItems' ]
            }]
        }).catch( err => { console.log(err); return err })
    }

    async getMembership(id){
        return await this.Membership.findOne({
            where : { id : id }
        }).catch( err => { console.log(err); return err })
    }

    async getMemberships(){
        return await this.Membership.findAll()
    }

    async createMembership(Membership){
        return await this.Membership.create({
            id : Membership.id,
            Membership : Membership.name,
            minItems : Membership.minItems,
            maxItems : Membership.maxItems,
            discount : Membership.discount
        }).catch( err => { console.log(err); return err })  
    }

    //change values in membership of id.
    async alterMembership(id, newMembership) {
        return await this.Membership.update({
            Membership : newMembership.Membership,
            minItems : newMembership.minItems,
            maxItems : newMembership.maxItems,
            discount : newMembership.discount
            }, { where : { id : id } }
        ).catch( err => { console.log(err); return err })
    }

    //no delete if in use, restrict.
    async deleteMembership(Membershipid){
        return await this.Membership.destroy({
            where : { id : Membershipid }
        }).catch( err => { console.log(err); return err })
    }  

}

module.exports = MembershipService;