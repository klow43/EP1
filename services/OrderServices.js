class OrderService {
    constructor(db) {
        this.client = db.sequelize;
        this.Order = db.Order;
        this.orderprogress = db.orderprogress;
    }

    async getOrder(orderid){
        return await this.Order.findOne({
            where : { id : orderid}       
        }).catch( err => { console.log(err); return err })
    }
    //get view of all orders
    async getAllOrders(){
        return await this.Order.findAll()
        .catch(err => {console.log(err); return err }) 
    }

    //user get own orders
    async getOrders(userId){
        return await this.Order.findAll({
            where : {userId : userId}
        }).catch( err => { console.log(err); return err })
    }    

    //create order, create orderprogress/orderStatus relation(default 1 - "In Progress"), create userorders relation.
    async createOrder(Order){
        return await this.Order.create({
            id : Order.id,
            membershipstatus : Order.membershipstatus,
            quantity : Order.quantity,
            product : Order.product
        }).catch( err => { console.log(err); return err })
    }

    //change order status
    async alterOrder(Orderid, newStatusid){
        return await this.orderprogress.update({
            OrderStatusId : newStatusid
        }, { where : { id : Orderid }
        }).catch( err => { console.log(err); return err }) 
    }

    //Delete order
    async deleteOrder(Orderid){
        return await this.Order.destroy({
            where : { id : Orderid }
        }).catch( err => { console.log(err); return err })
    }

}

module.exports = OrderService;