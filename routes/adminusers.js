var express = require('express');
var router = express.Router();
const axios = require('axios');


router.get('/', async function (req, res, next){

    getUsers = await axios({
        method : 'get',
        url : 'http://localhost:3000/users'
    }).catch(err => console.log(err.status));

    users = getUsers?.data?.data?.users;
    res.render('users', { users : users })
})


router.post('/', async function(req, res, next){
    user = req.body;
    alter = await axios({
        method : 'put',
        url : 'http://localhost:3000/users',
        data : user
    }).catch(err => console.log(err?.response?.data));
    res.redirect('/admin/users');
})



router.delete('/', async function(req,res,next){
    let id = req.body.id;
    product = await axios({
        method : 'delete',
        url : 'http://localhost:3000/users',
        data : {
            id : id
        }
    }).catch(err => console.log(err?.response?.data));
    res.end()
})



module.exports = router;