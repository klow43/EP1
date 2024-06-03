const db = require("../models");
const DatabaseService = require('../services/DatabaseService');
const databaseService = new DatabaseService(db);

//initial data
let Roles = [ { 'id' : 1, 'Role' : 'Admin' }, { 'id' : 2, 'Role' : 'User'} ]
let OrderStatus = [ {'id' : 1, 'Status' : 'In Progress'}, {'id' : 2, 'Status' : 'Ordered'}, { 'id' : 3, 'Status' : 'Completed'} ]
let Memberships = [ {'id' : 1, 'Membership' : 'Bronze', 'minItems' : 0, 'maxItems' : 15, 'discount' : 0 }, {'id' : 2, 'Membership' : 'Silver', 'minItems' : 15, 'maxItems' : 30, 'discount' : 15 }, {'id' : 3, 'Membership' : 'Gold', 'minItems' : 30, 'maxItems' : 100, 'discount' : 30 } ]

async function InsertProducts(){ 
let dbEmpty = await databaseService.checkDatabase();

if(dbEmpty == null){
    //get products
    let apicall = await fetch('http://backend.restapi.co.za/items/products')  
    .then((response) => response.json())
    .then((json) => json.data) 

    //create array for bulkCreate, unique names
    Brand =  [...new Map(apicall.map(item => [item['brand'], item])).values()]
    Category = [...new Map(apicall.map(item => [item['category'], item])).values()]
    Relations = []
    const t = await db.sequelize.transaction();
    try{
        await Promise.all(
            brands = await databaseService.BrandData( Brand, { transaction : t } ),
            categories = await databaseService.CategoryData( Category, { transaction : t } ),
            await databaseService.RoleData( Roles, { transaction : t }),
            await databaseService.OrderStatusData( OrderStatus, { transaction : t } ),
            await databaseService.MembershipData( Memberships, { transaction : t }),
            await databaseService.ProductData( apicall, { transaction : t }), 
            await apicall.forEach(product => {
                let obj = {};
                obj.ProductId = product.id
                brands.forEach(brand =>{
                    if(brand.dataValues.brand == product.brand){ obj.BrandId = brand.dataValues.id }
                 })
                categories.forEach(category => {
                    if(category.dataValues.category == product.category){ obj.CategoryId = category.dataValues.id }
                })
                Relations.push(obj);
            }),
            await databaseService.ProductBrand( Relations,  { transaction : t }),
            await databaseService.ProductCategory( Relations, { transaction : t }) 
        )
        t.commit() 
        //register admin through endpoint to set safe password in db, then change admin roleid to 1.
        await fetch('http://localhost:3000/auth/register', { method : 'POST', headers: {'Content-Type': 'application/json'}, body : JSON.stringify({firstName : 'Admin', lastName : 'Support', email : 'admin@noroff.no', password :  'P@ssword', phone : 911, userName : 'Admin', address : 'Online'})})
            .then( res => databaseService.setAdmin())  
        }catch(err) { t.rollback(); console.log(err); }  
        return 200;
    }  
return 208; 
} 
 
module.exports = InsertProducts;