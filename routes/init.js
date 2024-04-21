var express = require('express');
var router = express.Router();
const InsertProducts = require('../databasevalue/database'); 


//checks db, if users table empty will populate.
router.post('/', async function(req, res, next) {
let result;
   try{
     result = await InsertProducts();  
      if(result == 208){res.status(208).json({status : 'success', statusCode : 208, data : { result : 'Database already populated.'}})}   
   }catch(err){console.log(err); res.status(500).json({status : 'error', statusCode : 500, data : { result : "Unable to populate databsae with inital data."}})}
 if(result == 200) res.status(200).json({ status : 'success', statusCode : 200, data : { result : 'Database populated with inital data.' }})
});

  
module.exports = router;  