const db = require('../models');
const ProductServices = require('./ProductServices');
const productServices = new ProductServices(db);
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class DatabaseService {
    constructor(db){
        this.client = db.sequelize;
        this.Product = db.Product;
    }

    //count user table for checking if emtpy or not.
    async CountDataUser(){
        return await sequelize.query(`SELECT COUNT(*) as total FROM Users`, { raw : true, type : QueryTypes.SELECT })
    }

    //raw query to insert json to db
    async InitialData(query){
        return await sequelize.query(query, {raw : true})
            .catch( err => { console.log(err); return err })     
    }

    //insert in api brand names
    async BrandData(Brand){
       return await sequelize.query(`INSERT IGNORE INTO Brands(Brand) VALUES('${Brand}')`,{ raw : true, type : QueryTypes.INSERT })
       .catch( err => { console.log(err); return err })   
    }

    //get brand id for each product
     async getBrandid(Brandname){
        return await sequelize.query(`SELECT id FROM BRANDS WHERE BRAND = '${Brandname}'`, { raw : true, type : QueryTypes.SELECT })
        .catch( err => { console.log(err); return err }) 
    } 

    //insert category names from api
    async CategoryData(Category){
       return await sequelize.query(`INSERT IGNORE INTO Categories(Category) VALUES('${Category}')`, { raw : true, type : QueryTypes.INSERT })
        .catch( err => { console.log(err); return err })   
    }

    //get category id of each product.
    async getCategoryid(Categoryname){
        return await sequelize.query(`SELECT id FROM Categories WHERE Category = '${Categoryname}'`, { raw : true, type : QueryTypes.SELECT })
        .catch( err => { console.log(err); return err }) 
    }

    //create products from API, categoryId and brandId added.
    async ProductData(Product){
        return await productServices.createProduct(Product)
        .catch( err => { console.log(err); return err })    
    }
}
//{include : [{association : 'ProductBrand', include : ['Brand',{where : Product.brand == 'Brand.Brand', as : 'BrandId'}]} ]  })
module.exports = DatabaseService;