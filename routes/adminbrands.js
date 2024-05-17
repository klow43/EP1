var express = require('express');
var router = express.Router();
const axios = require('axios')

let brands;

router.get('/', async function (req, res, next){

    getbrands = await axios({
        method : 'get',
        url : 'http://localhost:3000/brands'
    }).catch(err => console.log(err.status));

    brands = getbrands?.data?.data?.brands;
        res.render('brands', { brands : brands })
});

//router .post/put
router.post('/', async function(req,res,next){
    let brand = req.body.brands;
    create = await axios({
        method : 'post',
        url : 'http://localhost:3000/brands',
        data : {
            brand : brand
        }
    }).catch(err => console.log(err));
    res.redirect('/admin/brands');
})

router.delete('/', async function(req,res,next){
    let id = req.body.id;
    console.log(id)
    product = await axios({
        method : 'delete',
        url : 'http://localhost:3000/brands',
        data : {
            id : id
        }
    }).catch(err => console.log(err?.response?.data));
    res.end()
})


module.exports = router;