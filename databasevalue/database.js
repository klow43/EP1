const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

const db = require("../models");
const DatabaseService = require('../services/DatabaseService');
const databaseService = new DatabaseService(db);
const UserService = require('../services/UserService');
const userService = new UserService(db);
const ProductServices = require('../services/ProductServices');
const productServices = new ProductServices(db);


async function populateDatabase(){ 
let dbEmpty = await userService.getUsers();

if(dbEmpty.length == 0){

    let apicall = await fetch('http://backend.restapi.co.za/items/products')  
    .then((response) => response.json())
    .then((json) => json.data) 

            //insert category and brand
            let Brand = [];
            let Category = [];
            await Promise.all(
                apicall.map(async obj => {
                    !Brand.includes(obj.brand) 
                     Brand.push(obj.brand); await databaseService.BrandData(obj.brand)
                    !Category.includes(obj.category)
                      Brand.push(obj.category); await databaseService.CategoryData(obj.category)  })
            )

            //insert inital json data
            let files = fs.readdirSync(__dirname) 
            files.forEach(file => { 
                if(file !== basename ) {
                    const { data } = JSON.parse(fs.readFileSync(__dirname + '/' + file));
                    for( i = 0; i < data.length; i++ ){
                    databaseService.InitialData(data[i].query);  
                    } 
                }
            return; 
            })  
    return apicall; 
    } 
return 208;  
}

//insert products into db, after JSON/Categories/Brands
async function InsertProducts(){
    let apicall = await populateDatabase()
    if(apicall != 208){
        await fetch('http://localhost:3000/auth/register', { method : 'POST', headers: {'Content-Type': 'application/json'}, body : JSON.stringify({firstName : 'Admin', lastName : 'Support', email : 'admin@noroff.no', password :  'P@ssword', phone : 911, userName : 'Admin', address : 'Online'})})
        await apicall.forEach(async product => {
            let brand = await databaseService.getBrandid(product.brand)
            let category = await databaseService.getCategoryid(product.category)
            product.brandId = brand[0].id 
            product.categoryId = category[0].id  
            await productServices.createProduct(product) 
        }) 
        await databaseService.setAdmin()        
        return 200        
        }
    return 208
}

   
module.exports = InsertProducts;