class ProductService {
    constructor(db) {
        this.client = db.sequelize;
        this.Product = db.Product;
    }

    //creates product with relation to brand(ProductBrand junctiontable) and category(ProductCategory junctiontable)
    async createProduct(Product){
        return await this.Product.create({
            id : Product.id,
            name : Product.name,
            description : Product.description,
            price : Product.price,
            quantity : Product.quantity,
            imgurl : Product.imgurl
        }).catch(err => {console.log(err); return err })
    }

    //softDelete, table is Paranoid.
    async deleteProduct(Productid){
        return await this.Product.destroy({
            where : { id : Productid}
        }).catch(err => {console.log(err); return err })
    }

    //everyone can viwe products
    async getProducts(){
        return await this.Product.findAll({})
        .catch(err => {console.log(err); return err })
    }

    //admin
    async alterProduct(oldProductid,newProduct){
        return await this.Product.update({
            name : newProduct.name,
            description : newProduct.description,
            price : newProduct.price,
            quantity : newProduct.quantity,
            imgurl : newProduct.imgurl,
            discount : newProduct.discount
        }, { where : { id : oldProductid }})
        .catch(err => {console.log(err); return err })
    }

}

module.exports = ProductService;