var express = require('express');
var router = express.Router();
const db = require("../models");
const InsertProducts = require('../databasevalue/database'); 
const DatabaseService = require('../services/DatabaseService');
const databaseService = new DatabaseService(db);


//checks db, if users table empty will populate.
router.post('/', async function(req, res, next) {
let result;
   try{
     result = await InsertProducts();  
      if(result == 208){res.status(208).json({status : 'success', statusCode : 208, data : { result : 'Database already populated.'}}); return;}   
   }catch(err){console.log(err); res.status(500).json({status : 'error', statusCode : 500, data : { result : "Server error.Unable to populate database with inital data."}});return;}
 if(result == 200){
    await databaseService.setAdmin();  
      res.json({ status : 'success', statusCode : 200, data : { result : 'Database populated with inital data.' }})  
 }
}); 

  
module.exports = router;  