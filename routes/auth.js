var express = require('express');
var router = express.Router();
const db = require('../models');
const UserService = require('../services/UserService');
const userService = new UserService(db);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


//req.body = name(username or email), password
router.post('/login', async function(req, res, next) {
    // #swagger.tags = ['Login']
    // #swagger.description = 'Logs user or admin into application, provides JWT token for 2 hours'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        in : 'body',
        'schema' : { $ref : '#/definitions/login' }
    }*/
    let user = req.body;
    let userdb = await userService.getLogin(user)
    let token;
    if( !user.name || user?.name == 0 || user?.name == "" || !user?.password || user?.password == 0 || user?.password == "" ){
        res.status(400).json({ status : "error", statusCode : 400, data : { result : "userName/email must be provided as name, and password must be provided!"}}); return;
    }
    if(userdb !== null && await bcrypt.compare(user.password, userdb.password.toString()) == true){
        try{
            token = jwt.sign({ User : userdb.email , UserRoleId : userdb.UserRole.dataValues.RoleId, UserId : userdb.id }, process.env.TOKEN_SECRET, { expiresIn : '2h' })
        }catch(err){console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Unable to login."}}); return;}  
    res.status(200).json({ status : "success", statusCode : 200, data : { result : "You are logged in",id : userdb.id, email : userdb.email, userName : userdb.userName, token : token}}); return;     
    }
    else{res.status(400).json({ status : "error", statusCode : 400, data : { result : "Invalid input."}})}
});


 
//req.body = firstName, lastName, email, password, phone, userName, address
router.post('/register',jsonParser, async function(req, res, next) { 
    // #swagger.tags = ['Registration']
    // #swagger.description = 'Registers new user to the application'
    // #swagger.produces = ['json']   
    /* #swagger.parameters['body'] = {
        'required' : true,
        in : 'body',
        'schema' : { $ref : '#/definitions/register' }
    }*/
    const newUser = req.body;
    try{ 
        bcrypt.hash(newUser.password, 12, async function (err, hash) { 
            newUser.password = hash;
            await userService.createUser(newUser)  
            .then(data => data == '[object SequelizeInstance:User]' ? 
                res.status(200).json({status : "success", statusCode : 200, data : { result : "You created an account."}}) :  
                    res.status(400).json({status : "error", statusCode : 400, data : { result : data?.message ? data.message : data.SequelizeUniqueConstraintError}})) 
        })  
    }catch(err){console.log(err); res.status(500).json({status : "error", statusCode : 500, data : { result : 'Unable to create User, pleasy try agin later.'}})}
})

module.exports = router; 