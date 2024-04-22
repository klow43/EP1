const db = require('../models');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class DatabaseService {
    constructor(db){
        this.client = db.sequelize;
        this.Product = db.Product;
    }

    async setAdmin(){
        return await sequelize.query(`UPDATE userroles SET RoleId = 1 WHERE UserId = 1`, { raw : true, type : QueryTypes.UPDATE })
        .catch( err => { console.log(err); return err }) 
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

}

module.exports = DatabaseService;