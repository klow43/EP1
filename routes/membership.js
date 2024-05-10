var express = require('express');
var router = express.Router();
const db = require('../models');
const MembershipServices = require('../services/MembershipServices');
const membershipService = new MembershipServices(db);
const { isAdmin, isUser } = require('../services/middleware');

router.get('/', async function ( req, res, next) {
    let memberships;
    try{
        memberships = await membershipService.getMemberships();
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot retrieve memberships"}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : 'Memberships found.', Memberships : memberships}})
})

router.get('/:membershipid', async function ( req, res, next ) {
    let membershipid = req.params.membershipid;
    let membership;
    try{
        membership = await membershipService.getMembership(membershipid);
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot retrieve membership"}}); return;}
    membership == null ? 
    res.status(400).json({ status : "error", statusCode : 400, data : { result : "No membership found.", products : membership } }) :
        res.status(200).json({ status : "success", statusCode : 200, data : { result : "Membership found.", products : membership }})
})

//req.body = name, minItems, maxItems, discount
router.post('/', isAdmin, async function ( req, res, next ) {
    let newmembership = req.body;
    let result;
    try{
        await membershipService.createMembership(newmembership)
            .then(data => data.name == 'SequelizeValidationError' ? 
                res.status(400).json({status : "error", statusCode : 400, data : { result : data?.message ? data.message : data.SequelizeUniqueConstraintError}}) :
                    res.status(200).json({status : "success", statusCode : 200, data : { result : "Membership created."}}))      
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot create new membership"}}); return;}
    res.send(result)
})

//req.body = id ++ 
router.put('/', isAdmin, async function ( req, res, next ) {
    let membership = req.body;
    let result;
    try{
        result = await membershipService.alterMembership(membership);
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot update membership"}}); return;}
    result[0] == 0 ? 
        res.status(400).json({ status : "success", statusCode : 400, data : { result : "No Membership of provided id."}}) : 
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Membership updated." }})
})

//req.body = id
router.delete('/', isAdmin,  async function ( req, res, next ){
    let membershipid = req.body?.id;
    let result;
    try{
        result = await membershipService.deleteMembership(membershipid);
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot delete membership"}}); return;}
    result[0] == 0 ?
        res.status(400).json({ status : "success", statusCode : 400, data : { result : "No Membership of provided id."}}) : 
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Membership updated." }})
})


module.exports = router;