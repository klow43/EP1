var express = require('express');
var router = express.Router();
const axios = require('axios')

let membership;

router.get('/', async function (req, res, next){

    getmemberships = await axios({
        method : 'get',
        url : 'http://localhost:3000/memberships'
    }).catch(err => console.log(err.status));

    membership = getmemberships?.data?.data?.Memberships;
        res.render('membership', { memberships : membership })
});

//router post/put
router.post('/', async function(req,res,next){
    console.log(req.body)
    let membership = req.body.membership;
    create = await axios({
        method : 'post',
        url : 'http://localhost:3000/memberships',
        data : {
            membership : membership
        }
    }).catch(err => console.log(err));
    res.redirect('/admin/memberships');
})

router.delete('/', async function(req,res,next){
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