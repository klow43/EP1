class OrderService {
    constructor(db) {
        this.client = db.sequelize;
        this.Order = db.Order;
        this.orderprogress = db.orderprogress;
        this.User = db.User;
        this.UserOrders = db.UserOrders;
    }

    async getOrder(orderid){
        return await this.Order.findAll({
            where : { OrderId : orderid },
            include : [{ model : this.Order }]     
        }).catch( err => { console.log(err); return err })
    }
    //get view of all orders(admin)
    async getAllOrders(){
        return await this.Order.findAll()
        .catch( err => { console.log(err); return err }) 
    }

    //user get own orders
    async getOrders(userId){
        return await this.Order.findAll({
            where : { UserId : userId },
            include : [{ model : this.Order }]
        }).catch( err => { console.log(err); return err })
    }    


    async getQuantityOrders(userId){
        return await this.UserOrders.findAll({
            where : { UserId : userId},
            include : [{ model : this.Order, attributes : ['Quantity']}]
       }).catch( err => { console.log(err); return err })
    }  

    //create order, create orderprogress/orderStatus relation(default 1 - "In Progress"), create userorders relation.
    async createOrder(Order){
        return await this.Order.bulkCreate(
            Order,
            { individualHooks : true, fields : ['OrderId', 'membershipstatus', 'product', 'Quantity', 'discount', 'discountUnitPrice'] },
        ).catch( err => { console.log(err); return err })
    }

    //change order status
    async alterOrder(Input){
        return await this.orderprogress.update({
            OrderStatusId : Input.Statusid
        }, { where : { id : Input.Orderid }
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