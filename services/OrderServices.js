class OrderService {
    constructor(db) {
        this.client = db.sequelize;
        this.Order = db.Order;
        this.OrderProgress = db.OrderProgress;
        this.User = db.User;
        this.UserOrders = db.UserOrders;
        this.OrderStatus = db.OrderStatus;
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
    async createOrder(Order){
        return await this.Order.bulkCreate(
            Order,
            { individualHooks : true, 
                fields : ['OrderId', 'membershipstatus', 'product', 'Quantity', 'discount', 'discountUnitPrice', 'userid']
            },
        ).catch( err => { console.log(err); throw err })
    }

    async createUserOrder(Order){
        return await this.UserOrders.bulkCreate(
            Order,
            { fields : ['OrderId', 'UserId'] }
        ).catch( err => { console.log(err); return err })
    }

    //change order status
    async alterOrder(Input){
        return await this.OrderProgress.update({
            OrderStatusId : Input.Statusid
        }, { where : { id : Input.Orderid }
        }).catch( err => { console.log(err); return err }) 
    }

    //Delete order
    async deleteOrder(Orderid){
        return await this.Order.destroy({
            where : { OrderId : Orderid }
        }).catch( err => { console.log(err); return err })
    }

}

module.exports = OrderService;