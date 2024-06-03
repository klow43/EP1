var express = require('express');
var router = express.Router();
const axios = require('axios');
const { cookieCheck } = require('../services/middleware');

router.get('/',cookieCheck, async function (req, res, next){
    // #swagger.tags = ['Admin Membership']
    // #swagger.description = 'Gets list of all memberships'
    // #swagger.produces = ['json']
    getmemberships = await axios({
        method : 'get',
        url : 'http://localhost:3000/memberships'
    }).catch(err => console.log(err.status));

    membership = getmemberships?.data?.data?.Memberships;
        res.render('membership', { memberships : membership })
});

//if !id - POST, else PUT
router.post('/', async function(req,res,next){
    // #swagger.tags = ['Admin Membership']
    // #swagger.description = 'Creates new membership or alters existing membership,  if id - put request, !id - post'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/altermembership' }
    }*/
    let membership = req.body;

    if(!req.body.id){
        create = await axios({
            method : 'post',
            url : 'http://localhost:3000/memberships',
            data : {
                Membership: membership.membership,
                minItems : membership.minItems,
                maxItems : membership.maxItems,
                discount : membership.discount
            }
        }).catch(err => console.log(err));
    }

    else{
        alter = await axios({
            method : 'put',
            url : 'http://localhost:3000/memberships',
            data : {
                id : req.body.id,
                Membership : membership.membership,
                minItems : membership.minItems,
                maxItems : membership.maxItems,
                discount : membership.discount
            }
        }).catch(err => console.log(err));
    }
    res.end();
})

router.delete('/', async function(req,res,next){
    // #swagger.tags = ['Admin Membership']
    // #swagger.description = 'Deletes membership of provided id, ondelete - restrict.'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/delete' }
    }*/
    let id = req.body.id;
    product = await axios({
        method : 'delete',
        url : 'http://localhost:3000/memberships',
        data : {
            id : id
        }
    }).catch(err => console.log(err?.response?.data));
    res.end()
})


module.exports = router;