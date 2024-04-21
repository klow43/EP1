class ProductRelationService {
    constructor(db) {
        this.client = db.sequelize;
        this.ProductBrand = db.ProductBrand;
        this.ProductCategory = db.ProductCategory;
    }

    async getProductBrand(productid, brandid){
        return await this.ProductBrand.findOne({
            where : {ProductId : productid, BrandId : brandid}
        })
        .catch( err => { console.log(err); return err })
    }

    async createProductBrand(BrandId, ProductId){
        return await this.ProductBrand.create({
            BrandId : BrandId,
            ProductId : ProductId
        }).catch( err => { console.log(err); return err })
    }

    async deleteProductBrand(Productid, BrandId){
        return await this.ProductBrand.destroy({
            where : { ProductId : Productid, BrandId : BrandId }
        }).catch( err => { console.log(err); return err })
    }

    //Divider between CRUD for junction tables 

    async getProductCategory(productid, categoryid){
        return await this.ProductCategory.findOne({
            where : {ProductId : productid, CategoryId : categoryid}
        })
        .catch( err => { console.log(err); return err })
    }

    async createProductCategory(ProductId, CategoryId){
        return await this.ProductCategory.create({
            CategoryId : CategoryId,
            ProductId : ProductId
        }).catch( err => { console.log(err); return err })
    }

    async deleteProductCategory(Productid, CategoryId){
        return await this.ProductCategory.destroy({
            where : { ProductId : Productid, CategoryId : CategoryId }
        }).catch( err => { console.log(err); return err })
    }

}

module.exports = ProductRelationService;