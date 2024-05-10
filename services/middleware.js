const jwt = require('jsonwebtoken');
//UserRoleId = 1(Admin), UserName.

module.exports = {

  //anyone registered, user and admin
  isUser : (req, res, next) => {
    !req.headers.authorization?.split(' ')[1] ? 
      res.status(401).json({ status : "error", statusCode : 401, data : { result : "Unauthorized for unregistered users, please register as customer to continue." }}) :
        jwt.verify( req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET, ( err,valid ) => {
          if( err ){ res.status(401).json({ status : "error", statusCode : 401, data : { result : err.message } }) }
          else{ next(); }
        })
  },

  //just Admin(userRole = 1)
  isAdmin : ( req, res, next ) => {
  !req.headers.authorization?.split(' ')[1] ?   
    res.status(401).json({ status : "error", statusCode : 401, data : { result : "Unauthorized." }}) :
      jwt.verify(req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET, ( err,valid ) => {
        if(err){res.status(401).json({ status : "error", statusCode : 401, data : { result : err.message } }) }
        valid.UserRoleId == 1 ? next() : res.status(401).json({ status : "error", statusCode : 401, data : { result : "Unauthorized" } })
      })
    },

    UserId : (req) => {
      let id;
      jwt.verify( req.headers.authorization.split(' ')[1], process.env.TOKEN_SECRET, ( err,valid ) => 
      { id = valid.UserId })
      return id
    }
}
