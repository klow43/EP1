const { Op } = require("sequelize");

class CartService {
    constructor(db) {
        this.client = db.sequelize;
        this.Cart = db.Cart;
        this.CartProduct = db.cartProduct;
    }

    //view items and quantity in cart of userId
    async getCart(userId){
        return await this.Cart.findAll({ 
            where : { UserId : userId }
        }).catch( err => { console.log(err); return err })
    }

    //create cart on register of user.
    async createCart(userId){
        return await this.Cart.create({
            UserId : Cart.userid
        }).catch( err => { console.log(err); return err })
    }

    //update or create product in cart, no response if isDeleted(out of stock) is true.
    async updateCart(Cartid,Cart){
        return await this.CartProduct.upsert({
            ProductId : Cart.productId,
            quantity : Cart.quantity, 
        },{
        where : { id : Cartid, ProductId : Cart.productId, [Op.not] : product.isDeleted}
            }).catch( err => { console.log(err); return err })
    }

    //delete items in cart after checkout.
    async deleteCart(cartId){
        return await this.CartProduct.destroy({
            where : { CartId : cartId }
        }).catch(err => { console.log(err); return err })
    }
    
}

module.exports = CartService;