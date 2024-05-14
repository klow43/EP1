const { QueryTypes } = require('sequelize');

class SearchService {
    constructor(db) {
        this.client = db.sequelize;
    }

    //specific brand name, return all products, number of result
    async searchBrand(search){
        return await this.client.query(
        `select products.id, price, deletedAt, createdAt, name, quantity, imgurl, description, brands.Brand, productbrands.BrandId, categories.Category, productcategories.CategoryId  from products
        inner join productcategories
        on products.id = productcategories.ProductId
        join categories
        on productcategories.CategoryId = categories.id
        inner join productbrands
        on products.id = productbrands.ProductId
        join brands
        on productbrands.BrandId = brands.id
        where brands.Brand = '${search}'`, 
        { raw : true, type : QueryTypes.SELECT })
            .catch( err => { console.log(err); return err }) 
    }

    //search specific categoryname, return all products with this category, number of results
    async searchCategory(search){
        return await this.client.query(
        `select products.id, price, deletedAt, createdAt, name, quantity, imgurl, description, categories.Category , productcategories.CategoryId, brands.Brand, productbrands.BrandId from products
        inner join productbrands
        on products.id = productbrands.ProductId
        join brands
        on productbrands.BrandId = brands.id
        inner join productcategories
        on products.id = productcategories.ProductId
        join categories
        on productcategories.CategoryId = categories.id
        where Categories.Category =  '${search}'`,
        { raw : true, type : QueryTypes.SELECT })
            .catch( err => { console.log(err); return err })         
    }

    //partial product name and number of results
    async searchProduct(search){
        return await this.client.query(
            `SELECT products.id, price, deletedAt, createdAt, name, quantity, imgurl, description, categories.Category , productcategories.CategoryId, brands.Brand, productbrands.BrandId from products
            inner join productbrands
            on products.id = productbrands.ProductId
            join brands
            on productbrands.BrandId = brands.id
            inner join productcategories
            on products.id = productcategories.ProductId
            join categories
            on productcategories.CategoryId = categories.id
            WHERE name LIKE '%${search}%'`,
             { raw : true, type : QueryTypes.SELECT })
            .catch( err => { console.log(err); return err })
    }

}

module.exports = SearchService;