const { QueryTypes } = require('sequelize');
class ProductService {
    constructor(db) {
        this.client = db.sequelize;
        this.Product = db.Product;
        this.ProductBrands = db.ProductBrands;
    }

    async getProduct(ProductId){
        return await this.client.query(
         `select products.id, price, deletedAt, createdAt, name, quantity, imgurl, description,productcategories.CategoryId, categories.Category,productbrands.BrandId, brands.Brand from products
         join productbrands
         on products.id = productbrands.ProductId
         join brands
         on productbrands.BrandId = brands.id
         inner join productcategories
         on products.id = productcategories.ProductId
         join categories
         on productcategories.CategoryId = categories.id
         where products.id = ${ProductId}`,   
        { raw : true, type : QueryTypes.SELECT })
        .catch( err => { console.log(err); return err }) 
    }

    //get products not "deleted"
    async getProducts(){
        return await this.client.query(
        `select products.id, price, deletedAt, createdAt, name, quantity, imgurl, description,productcategories.CategoryId, categories.Category,productbrands.BrandId, brands.Brand from products
        join productbrands
        on products.id = productbrands.ProductId
        join brands
        on productbrands.BrandId = brands.id
        inner join productcategories
        on products.id = productcategories.ProductId
        join categories
        on productcategories.CategoryId = categories.id
        where deletedAt = 0`,
        { raw : true, type : QueryTypes.SELECT })  
            .catch( err => { console.log(err); return err })
    }

    //get all products, included "deleted" 
    async getAllProducts(){
        return await this.client.query(
        `select products.id, price, deletedAt, createdAt, name, quantity, imgurl, description,productcategories.CategoryId, categories.Category,productbrands.BrandId, brands.Brand from products
        join productbrands
        on products.id = productbrands.ProductId
        join brands
        on productbrands.BrandId = brands.id
        inner join productcategories
        on products.id = productcategories.ProductId
        join categories
        on productcategories.CategoryId = categories.id`,
        { raw : true, type : QueryTypes.SELECT })
            .catch( err => { console.log(err); return err }) 
    }
 
    //creates product
    async createProduct(Product){
        return await this.Product.create({
            name : Product.name,
            description : Product.description,
            price : Product.price,
            quantity : Product.quantity,
            imgurl : Product.imgurl,
        }).catch( err => { console.log(err); throw err })
    }
 
    async alterProduct(Product){
        return await this.Product.update({
            name : Product.name,
            description : Product.description,
            price : Product.price,
            quantity : Product.quantity,
            imgurl : Product.imgurl,
            deletedAt : Product.deletedAt
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