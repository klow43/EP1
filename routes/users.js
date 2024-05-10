var express = require('express');
var router = express.Router();
const { isAdmin } = require('../services/middleware');
const db = require('../models');
const UserServices = require('../services/UserService');
const userServices = new UserServices(db);


router.get('/:userid', isAdmin, async function(req, res, next) {
    let result;
    let userid = req.params.userid;
    try{
        result = await userServices.getUser(userid)
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieved user."}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { user : result }})
});

router.get('/', isAdmin, async function(req, res, next) {
    let result;
    try{
        result = await userServices.getUsers();
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot retrieved users."}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { users : result }});
});


//req.body contains changes
router.put('/', isAdmin, async function(req, res, next) {
    let result;
    let newuser = req.body;
    try{
        result = await userServices.updateUser(newuser);
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update users."}}); return;}
    result[0] == 0 ? res.status(400).json({ status : "success", statusCode : 400, data : { result : "No user of provided id."}}) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "User updated."}})
});

router.delete('/', isAdmin, async function(req, res, next){
    let result;
    let userid = req.body;
    try{
        result = await userServices.deleteUser(userid);
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot delete users."}}); return;}
    result == 0 ? res.status(400).json({ status : "success", statusCode : 400, data : { result : "No user of provided id."}}) : 
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "User deleted."}})
});



module.exports = router;