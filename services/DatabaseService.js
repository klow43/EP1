const { sequelize } = require('../models');
const db = require('../models');
const { QueryTypes } = require('sequelize');
const ProductRelationService = require('../services/ProductRelationServices');
const productRelationService = new ProductRelationService(db);
const ProductServices = require('../services/ProductServices');
const productServices = new ProductServices(db);
class DatabaseService {
    constructor(db){
        this.client = db.sequelize;
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

    //insert category names from api
    async CategoryData(Category){
       return await sequelize.query(`INSERT IGNORE INTO Categories(Category) VALUES('${Category}')`, { raw : true, type : QueryTypes.INSERT })
        .catch( err => { console.log(err); return err })   
    }

    async setAdmin(){
        return await sequelize.query(`UPDATE userroles SET RoleId = 1 WHERE UserId = 1`, { raw : true, type : QueryTypes.UPDATE })
        .catch( err => { console.log(err); return err }) 
    }

    async createProduct(Product){
        await productServices.createProduct(Product)
        await sequelize.query(`SELECT id FROM Categories WHERE Category = '${Product.category}'`, { raw : true, type : QueryTypes.SELECT })
            .then(res => productRelationService.createProductCategory({categoryid : res[0].id, productid : Product.id }));
        await sequelize.query(`SELECT id FROM BRANDS WHERE BRAND = '${Product.brand}'`, { raw : true, type : QueryTypes.SELECT })
            .then(res => productRelationService.createProductBrand({brandid : res[0].id, productid : Product.id}))
        .catch( err => { console.log(err); return err })
    } 
} 
  
module.exports = DatabaseService;