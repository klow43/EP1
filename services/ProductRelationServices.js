class ProductRelationService {
    constructor(db) {
        this.client = db.sequelize;
        this.ProductBrands = db.ProductBrands;
        this.ProductCategories = db.ProductCategories;
    }

    async getProductBrand(Input){
        return await this.ProductBrands.findOne({
            where : {ProductId : Input.productid}
        }).catch( err => { console.log(err); return err })
    }

    async createProductBrand(Input){
        return await this.ProductBrands.create({
            BrandId : Input.brandid,
            ProductId : Input.productid
        }).catch( err => { console.log(err); return err })
    }

    async alterProductBrand(Input){
        return await this.ProductBrands.update({
            BrandId : Input.brandid
        }, { where : { ProductId : Input.id}}
        ).catch( err => { console.log(err); return err })
    }

    async deleteProductBrand(Input){
        return await this.ProductBrands.destroy({
            where : { ProductId : Input.productid }
        }).catch( err => { console.log(err); return err })
    }

    //Divider between CRUD for junction tables 

    async getProductCategory(Input){
        return await this.ProductCategories.findOne({
            where : {ProductId : Input.productid, CategoriesId : Input.categoryid}
        }).catch( err => { console.log(err); return err })
    }

    async createProductCategory(Input){
        return await this.ProductCategories.create({
            CategoryId : Input.categoryid,
            ProductId : Input.productid
        }).catch( err => { console.log(err); return err })
    }

    async alterProductCategory(Input){
        return await this.ProductCategories.update({
            CategoryId : Input.categoryid
        }, { where : { ProductId : Input.id}}
        ).catch( err => { console.log(err); return err })
    }

    async deleteProductCategory(Input){
        return await this.ProductCategories.destroy({
            where : { ProductId : Input.id }
        }).catch( err => { console.log(err); return err })
    }

}

module.exports = ProductRelationService;