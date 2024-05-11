var express = require('express');
var router = express.Router();
const { isAdmin } = require('../services/middleware');
const db = require('../models');
const UserServices = require('../services/UserService');
const userServices = new UserServices(db);
const MembershipServices = require('../services/MembershipServices');
const membershipService = new MembershipServices(db);


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


//req.body = id + changes
router.put('/', isAdmin, async function(req, res, next) {
    if(!req.body.id){res.status(400).json({ status : "error", statusCode : 400, data : { result : "id of user must be provided."}}); return;}
    let result;
    let newuser = req.body;
    try{
        result = await userServices.updateUser(newuser);
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot update users."}}); return;}
    result[0] == 0 ? res.status(400).json({ status : "success", statusCode : 400, data : { result : "No user of provided id."}}) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "User updated."}})
});

//req.body = id (cannot delete id of 1, Admin)
router.delete('/', isAdmin, async function(req, res, next){
    if(!req.body.id){res.status(400).json({ status : "error", statusCode : 400, data : { result : "id of user must be provided."}}); return;}
    let result;
    let userid = req.body.id;
    try{
        result = await userServices.deleteUser(userid);
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot delete users."}}); return;}
    result == 0 ? res.status(400).json({ status : "success", statusCode : 400, data : { result : "No user of provided id."}}) : 
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "User deleted."}})
});


//req.body = userid, membershipid
router.put('/membership', isAdmin, async function(req, res, next){
    if(!req.body.userid || !req.body.membershipid){res.status(400).json({ status : "error", statusCode : 400, data : { result : "userid and new membershipid must be provided"}});return;}
    let membership = req.body;
    let result;
    try{
        result = await membershipService.alterUserMembership(membership);
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot change users membership."}}); return;}
    result[0] == 0 ? 
        res.status(400).json({ status : "success", statusCode : 400, data : { result : "No user of provided id."}}) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Users membership altered."}})
})

//req.body = userid, roleid (cannot change original admin : 1 )
router.put('/role', isAdmin, async function(req, res,next) {
    if(!req.body.userid || !req.body.roleid){res.status(400).json({ status : "error", statusCode : 400, data : { result : "userid and new roleid must be provided"}}); return;}
    let role = req.body;
    let result;
    try{
        result = await userServices.alterUserRole(role);
    }catch(err) { console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Server error. Cannot change users role."}}); return;}
    result[0] == 0 ? 
        res.status(400).json({ status : "success", statusCode : 400, data : { result : "No user of provided id."}}) :
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Users role altered."}})
})


module.exports = router;