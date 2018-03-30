var passport      = require('passport');
var ldapStrategy  = require('passport-ldapauth');
var jwt           = require('jsonwebtoken');
var config        = require("../config.json")

exports.isValidToken = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers["x-access-token"];
    if(token){
        jwt.verify(token, config.jwt.secretOrKey,function(err, decode){
            if(err){
                res.json({err: err})
            }else{
                next();
            }
        })
    }else{
        res.json({success: false, message: "cannot find token"})
    }
}

exports.getJwtSecret = function(req, res, next){
    res.json({secret: config.jwt.secretOrKey});
}