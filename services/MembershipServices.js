class MembershipService {
    constructor(db) {
        this.client = db.sequelize;
        this.Membership = db.Membership;
    }

    async createMembership(Membership){
        return await this.Membership.create({
            id : Membership.id,
            Membership : Membership.name,
            minItems : Membership.minItems,
            maxItems : Membership.maxItems,
            discount : Membership.discount
        })
        .catch(err => {console.log(err); return err })  
    }

    //no delete if in use, restrict.
    async deleteMembership(Membershipid){
        return await this.Membership.destroy({
            where : { id : Membershipid }
        })
        .catch(err => {console.log(err); return err })
    }

    async getMemberships(){
        return await this.Membership.findAll()
    }

    //change values in membership of id.
    async alterMembership(id, newMembership) {
        return await this.Membership.update({
            Membership : newMembership.Membership,
            minItems : newMembership.minItems,
            maxItems : newMembership.maxItems,
            discount : newMembership.discount
        }, { where : { id : id }})
        .catch(err => {console.log(err); return err })
    }
    
}

module.exports = MembershipService;