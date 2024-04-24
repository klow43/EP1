const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class SearchService {
    constructor(db) {
        this.Brand = db.Brand;
        this.Category = db.Category;
        this.Product = db.Product;
    }

    //specific brand name, return all products, number of result
    async searchBrand(search){
        return await sequelize.query(
        `select name, quantity, imgurl, description, brands.Brand, categories.Category  from products
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
        return await sequelize.query(
        `select products.id, name, quantity, imgurl, description, categories.Category, brands.Brand from products
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
        return await sequelize.query(
            `SELECT products.id, name, quantity, imgurl, description, categories.Category, brands.Brand from products
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