const { Op } = require("sequelize");
class ProductService {
    constructor(db) {
        this.client = db.sequelize;
        this.Product = db.Product;
        this.Brand = db.Brand;
        this.Category = db.Category;
    }

    async getProduct(ProductId){
        return await this.Product.findOne({
            where : { id : ProductId }, 
            include : [{ model : this.Brand, through : { attributes : []}}, { model : this.Category, through : { attributes : []}}],
        }).catch( err => { console.log(err); return err }) 
    }

    //get products not "deleted"
    async getProducts(){
        return await this.Product.findAll({
            where : { deletedAt : null },
            include : [{ model : this.Brand, through : { attributes : []}}, { model : this.Category, through : { attributes : []}}],
            })  
        .catch( err => { console.log(err); return err })
    }

    //get all products, included "deleted" 
    async getAllProducts(){
        return await this.Product.findAll({
            where : {},
            include : [{ model : this.Brand, through : { attributes : []}}, { model : this.Category, through : { attributes : []}}],
        })
        .catch( err => { console.log(err); return err })
    }

    //creates product
    async createProduct(Product){
        return await this.Product.create({
            name : Product.name,
            description : Product.description,
            price : Product.price,
            quantity : Product.quantity,
            imgurl : Product.imgurl
        }).catch( err => { console.log(err); return err })
    }

    async alterProduct(Product){
        return await this.Product.update({
            name : Product.name,
            description : Product.description,
            price : Product.price,
            quantity : Product.quantity,
            imgurl : Product.imgurl
        }, { where : { id : Product.id }}
        ).catch( err => { console.log(err); return err }) 
    }

    async deleteProduct(Productid){
        return await this.Product.update({
            deletedAt : 1,
        }, { where : { id : Productid}}
        ).catch( err => { console.log(err); return err }) 
    }

    //actual deletion
    async destroyProduct(Productid){
        return await this.Product.destroy({
            where : { id : Productid }
        }).catch( err => { console.log(err); return err })
    }

}

module.exports = ProductService;  