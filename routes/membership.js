var express = require('express');
var router = express.Router();
const db = require('../models');
const MembershipServices = require('../services/MembershipServices');
const membershipService = new MembershipServices(db);
const { isAdmin } = require('../services/middleware');

router.get('/', async function ( req, res, next) {
    // #swagger.tags = ['Memberships']
    // #swagger.description = 'Gets all memberships'
    // #swagger.produces = ['json']
    let memberships;
    try{
        memberships = await membershipService.getMemberships();
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot retrieve memberships"}}); return;}
    res.status(200).json({ status : "success", statusCode : 200, data : { result : 'Memberships found.', Memberships : memberships}})
})

router.get('/:membershipid', async function ( req, res, next ) {
    // #swagger.tags = ['Memberships']
    // #swagger.description = 'Gets membership of provided id'
    // #swagger.produces = ['json']
    /* #swagger.parameters['membershipid'] = {
		"name" : "membershipid",
		"required" : true,
		"in" : "path",
		"type" : "integer"
	} */	
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
    // #swagger.tags = ['Memberships']
    // #swagger.description = 'Creates new membership'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/postmembership' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}
    let newmembership = req.body;
    try{
        await membershipService.createMembership(newmembership)
            .then(data => data.name == 'SequelizeValidationError' ? 
                res.status(400).json({status : "error", statusCode : 400, data : { result : data?.message ? data.message : data.SequelizeUniqueConstraintError}}) :
                    res.status(200).json({status : "success", statusCode : 200, data : { result : "Membership created."}}))      
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot create new membership"}}); return;}
})

//req.body = id ++ 
router.put('/', isAdmin, async function ( req, res, next ) {
    // #swagger.tags = ['Memberships']
    // #swagger.description = 'Creates new membership'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/altermembership' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}    
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
    // #swagger.tags = ['Memberships']
    // #swagger.description = 'delete membership of provided id, ondelete - restrict.'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/delete' }
    }*/
    // #swagger.parameters['authorization'] = {"required" : true, "in" : "header"}   
    let membershipid = req.body?.id;
    if(!req.body.id && typeof(req.body.id) != 'number'){ res.status(400).json({ status : "error", statusCode : 400, data : { result : "id must be provided, and be a number." }}); return; }
    let result;
    try{
        result = await membershipService.deleteMembership(membershipid);
    }catch(err){ console.log(err); res.status(500).json({ status : "error", statusCode : 500, data : { result : "Cannot delete membership"}}); return;}
    result[0] == 0 ?
        res.status(400).json({ status : "success", statusCode : 400, data : { result : "No Membership of provided id."}}) : 
            res.status(200).json({ status : "success", statusCode : 200, data : { result : "Membership updated." }})
})


module.exports = router;