var express = require('express');
var router = express.Router();
const axios = require('axios')
axios.default.baseURL = 'http://localhost:3000/admin';
const { loginAdmin } = require('../services/middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
    // #swagger.tags = ['Admin Login']
    // #swagger.description = 'Gets login page for /admin '
    // #swagger.produces = ['json']
  let err;
  res.render('login', { err });
});

router.post('/', async function(req, res,next){
    // #swagger.tags = ['Admin Login']
    // #swagger.description = 'Logs in for /admin, sets jwt token in axios, signs SESSION BASED cookie for a little shorter then jwt valid time.'
    // #swagger.produces = ['json']
    /* #swagger.parameters['body'] = {
        'required' : true,
        'in' : 'body',
        'schema' : { $ref : '#/definitions/login' }
    }*/
  let { password, name } = req.body;
  result = await axios({
    method : 'post',
    url : 'http://localhost:3000/auth/login',
    data : {
      name : name,
      password : password
    }
  }).catch(err => console.log(err.message));

  if(loginAdmin(result?.data?.data?.token) == true){ 
    const token = result?.data?.data?.token; 

    //set token into axios automatically being provided with every axios call(session restricted)
    axios.defaults.headers.common['Authorization'] =  `Bearer ${token}`;

    //create cookie and sign if successful, maxAge less than jwt token.
    res.cookie('token', 'admin', { signed:true, maxAge: 7100000 });

    res.redirect('admin/products')
  }
  else{ let err = 'unathorized'; res.render('login', { err } ) }
})

module.exports = router;
