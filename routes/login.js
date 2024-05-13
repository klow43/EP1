var express = require('express');
var router = express.Router();
const axios = require('axios')

/* GET home page. */
router.get('/', function(req, res, next) {
  let err;
  res.render('login', { err });
});

router.post('/', async function(req, res,next){
  let { password, name }= req.body;
  result = await axios({
    method : 'post',
    url : 'http://localhost:3000/auth/login',
    data : {
      name : name,
      password : password
    }
  }).catch(err => console.log(err.message));
  if(result?.data.status === 'success'){ res.redirect('admin/products')}
  else{let err = 'err'; res.render('login', { err })}
})

module.exports = router;
