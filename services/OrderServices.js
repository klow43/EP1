const { Op } = require('sequelize');
class OrderService {
    constructor(db) {
        this.client = db.sequelize;
        this.Order = db.Order;
        this.OrderProgress = db.OrderProgress;
        this.User = db.User;
        this.UserOrders = db.UserOrders;
        this.OrderStatus = db.OrderStatus;
    }

    async getOrderStatuses(){
        return await this.OrderStatus.findAll()
        .catch( err => { console.log(err); return err }) 
    }

    async getOrder(orderid){
        return await this.Order.findAll({
            where : { orderId : orderid },
            attributes : ['id']
        }).catch( err => { console.log(err); return err }) 
    }

    //get view of all orders(admin)
    async getAllOrders(){
        return await this.Order.findAll(
           { include : [{ model : this.OrderProgress, attributes : ['OrderStatusId'], include : this.OrderStatus }] }  
        ).catch( err => { console.log(err); return err }) 
    }

    //user get own orders
    async getOrders(userId){
        return await this.Order.findAll({
            where : { UserId : userId },
            include : [{ model : this.Order }]
        }).catch( err => { console.log(err); return err })
    }     

    //create order, create orderprogress/orderStatus relation(default 1 - "In Progress"), create userorders relation.
    async createOrder(Order, t){
        return await this.Order.bulkCreate(
            Order,
            { individualHooks : true, transaction : t },
        ).catch( err => { console.log(err); throw err })
    }

    async createUserProgress(orderid, t){
        return await this.OrderProgress.bulkCreate(
            orderid, 
            { transaction : t }
        ).catch( err => { console.log(err); throw err })
    }

    async createUserOrder(Order, t){
        return await this.UserOrders.bulkCreate(
            Order,t
        ).catch( err => { console.log(err); return err })
    }

    //change order status
    async alterOrder(orderid, statusid){
        return await this.OrderProgress.update({
            OrderStatusId : statusid
        },{ where : { OrderId : { [Op.in] : orderid }}} 
        ).catch( err => { console.log(err); throw err }) 
    }

    //Delete order
    async deleteOrder(Orderid){
        return await this.Order.destroy({
            where : { OrderId : Orderid }
        }).catch( err => { console.log(err); return err })
    }

}

module.exports = OrderService;