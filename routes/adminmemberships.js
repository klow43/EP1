var express = require('express');
var router = express.Router();
const axios = require('axios');
const { cookieCheck } = require('../services/middleware');

router.get('/',cookieCheck, async function (req, res, next){
    // #swagger.ignore = true
    getmemberships = await axios({
        method : 'get',
        url : 'http://localhost:3000/memberships'
    }).catch(err => console.log(err.status));

    membership = getmemberships?.data?.data?.Memberships;
        res.render('membership', { memberships : membership })
});

//if !id - POST, else PUT
router.post('/', async function(req,res,next){
    // #swagger.ignore = true
    let membership = req.body;

    if(!req.body.id){
        create = await axios({
            method : 'post',
            url : 'http://localhost:3000/memberships',
            data : {
                name : membership.membership,
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
                name : membership.membership,
                minItems : membership.minItems,
                maxItems : membership.maxItems,
                discount : membership.discount
            }
        }).catch(err => console.log(err));
    }
    res.redirect('/admin/memberships');
})

router.delete('/', async function(req,res,next){
    // #swagger.ignore = true
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