var express       = require('express');
var passport      = require('passport');
var bodyParser    = require('body-parser');
var ldapStrategy  = require('passport-ldapauth');

var config        = require("./config.json");
var authRouter    = require("./routers/authRouter");
var apiRouter     = require("./routers/apiRouter")

//ldapStrategy
passport.use("ldap1", new ldapStrategy({server: config.ldap.server}));

var app = express();
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())

app.use('/login', authRouter);
app.use("/api", apiRouter);

//listen port
app.listen(3000, function() {
  console.log("Express is running");
});