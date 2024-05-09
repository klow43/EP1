class CartService {
    constructor(db) {
        this.client = db.sequelize;
        this.Cart = db.Cart;
        this.CartProducts = db.CartProduct;
        this.User = db.User;
        this.Product = db.Product;
        this.UserMembership = db.UserMembership;
        this.Membership = db.Membership;
    }

    async getCartId(userid){
        return await this.Cart.findOne({
            where : { UserId : userid }
        }).catch( err => { console.log(err); return err })
    }

    //view items and quantity in cart of userId
    async getCart(userId){
        return await this.Cart.findAll({ 
            where : { UserId : userId },
            include : [{ 
                model : this.Product,attributes : ['id', 'name', 'description', 'imgurl'], 
                    through : { attributes : [ 'quantity' ,'unitPrice', 'discountUnitPrice'], where : { 'Processed' : 0 }}
                }]
        }).catch( err => { console.log(err); return err })
    }

    //create cart on register of user.
    async createCart(userId){
        return await this.Cart.create({
            UserId : userId
        }).catch( err => { console.log(err); return err })
    }

    async checkoutCart(cartid, t){
        return await this.CartProducts.update({
            Processed : 1
        }, { where : { CartId : cartid} }
        ).catch( err => { console.log(err); return err })
    }

    async incrementCart(product,cartid){
        return await this.CartProducts.increment({
           quantity : product.quantity  
            },{ where : { CartId : cartid.id, ProductId : product.productid, Processed : 0 }}
        ).catch( err => { console.log(err); return err })
    }

    //update or create product in cart, no response if isDeleted(out of stock) is true.
    async postCart(cartid, product ){
        return await this.CartProducts.findOrCreate({
            where : { ProductId : product.productid, CartId : cartid.id, Processed : 0 },
            defaults : {
            quantity : product.quantity, 
            unitPrice : product.unitPrice,
            discountUnitPrice : 0,
            discount : product.discount                
            },
        }).catch( err => { console.log(err); return err })
    }

    async updateCart(product,cartid){
        return await this.CartProducts.update({
            quantity : product.quantity 
        },{
            where : { CartId : cartid, ProductId : product.productid, Processed : 0 }
        }).catch( err => { console.log(err); return err })
    }

    async deleteFromCart(productid,cartid){
        return await this.CartProducts.destroy({
            where : { ProductId : productid, CartId : cartid, Processed : 0 },
        }).catch(err => { console.log(err); return err })
    }

    //delete items in cart after checkout.
    async deleteCart(cartId){
        return await this.CartProducts.update({
            Processed : 1,
            where : { CartId : cartId, Processed : 0 }
        }).catch(err => { console.log(err); return err })
    }
    
}

module.exports = CartService;