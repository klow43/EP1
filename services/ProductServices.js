class ProductService {
    constructor(db) {
        this.client = db.sequelize;
        this.Product = db.Product;
        this.ProductBrand = db.ProductBrand;
        this.ProductCategory = db.ProductCategory;
    }

    //creates product with relation to brand and category. Product.brand and Product.category assumed to be INTEGER from frontend.
    async createProduct(Product){
        return await this.Product.create({
            name : Product.name,
            description : Product.description,
            price : Product.price,
            quantity : Product.quantity,
            imgurl : Product.imgurl,  
            ProductBrand : { BrandId : Product.brand },
            ProductCategory : { CategoryId : Product.category }      
        }, {include : [{ association : 'ProductBrand'}, {association : 'ProductCategory' }]
        }).catch(err => { console.log(err); return err })
    }

    //softDelete, table is Paranoid.
    async deleteProduct(Productid){
        return await this.Product.destroy({
            where : { id : Productid.id}
        }).catch(err => { console.log(err); return err })
    }

    async getProduct(ProductId){
        return await this.Product.findOne({
            where : {id : ProductId}
        }).catch(err => { console.log(err); return err })
    }

    //get products not "deleted"
    async getProducts(){
        return await this.Product.findAll({ where : {}, paranoid : true })  
        .catch(err => { console.log(err); return err })
    }

    //get all products, included "deleted"
    async getAllProducts(){
        return await this.Product.findAll({ where : {}, paranoid : false })
        .catch(err => { console.log(err); return err })
    }

    async alterProduct(Productid,newProduct){
        return await this.Product.update({
            name : newProduct.name,
            description : newProduct.description,
            price : newProduct.price,
            quantity : newProduct.quantity,
            imgurl : newProduct.imgurl
        }, { where : { id : Productid }})
        .catch(err => {console.log(err); return err })
    }

}

module.exports = ProductService;