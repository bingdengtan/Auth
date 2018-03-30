var passport      = require('passport');
var ldapStrategy  = require('passport-ldapauth');
var jwt           = require('jsonwebtoken');
var config        = require("../config.json")

exports.check = function(req, res, next){
    passport.authenticate(['ldap1'], { session: false, userNotFound: 'Sorry, but we could not find that username.' }, function(err, user, info) {
        var generateToken = function () {
          var token = jwt.sign(
            {name: user.name},
            config.jwt.secretOrKey,
            {
              expiresIn: "7d" // 24 hours
            }
          );
    
          // return the information including a token
          return res.json({
              success: true,
              message: 'User ' + user.name + ' authenticated successfully!',
              token: token
          });
        };
    
        if (err) return next(err);
        console.log(user)
        if (!user) {
          var message = 'Invalid credentials'; // default message
              for (var data of info) {
                  if (!!data) {
                      message = data.message;
                      break;
                  }
              }
    
          return res.json({
              success: false,
              message: 'Authentication failed! ' + message + '.'
          });
        }
    
        if (user) {
          return generateToken();
        }
    })(req, res, next);
}