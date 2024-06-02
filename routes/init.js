var express = require('express');
var router = express.Router();
const InsertProducts = require('../databasevalue/database'); 


//checks db, if users table empty will populate.
router.post('/', async function(req, res, next) {
    // #swagger.tags = ['Init']
    // #swagger.description = 'Populates initial products to db'
    // #swagger.produces = ['json']
let result;
   try{
     result = await InsertProducts();  
      if(result == 208){res.status(208).json({status : 'success', statusCode : 208, data : { result : 'Database already populated.'}}); return;}  
   }catch(err){console.log(err); res.status(500).json({status : 'error', statusCode : 500, data : { result : "Server error.Unable to populate database with inital data."}});return;}
 if(result == 200){  
      res.json({ status : 'success', statusCode : 200, data : { result : 'Database populated with inital data.' }})  
 }
}); 

  
module.exports = router;  