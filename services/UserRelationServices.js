class UserRelationServices{
    constructor(db) {
       this.UserRole = db.UserRoles;
       this.UserOrders = db.UserOrders; 
    }

    async createUserOrder(userid, orderid){
        return await this.UserOrders.create({
            UserId : userid,
            OrderId : orderid
        }).catch( err => { console.log(err); return err })
    }


}

module.exports = UserRelationServices;