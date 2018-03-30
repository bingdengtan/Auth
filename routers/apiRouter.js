var express = require('express');
var router = express.Router();

var apiController = require('../controllers/apiController')

router.use(apiController.isValidToken)
router.get('/jwtSecret', apiController.getJwtSecret);

module.exports = router;