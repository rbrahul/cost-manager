var express = require('express');
var router = express.Router();

var userController=require('../controllers/usersApiController');
var usersMiddleware=require('../middlewares/usersmiddleware.js');
/* GET users listing. */
router.get('/',usersMiddleware.authCheck,userController.index);

router.get('/:user',  function(req, res, next) {
	res.render('layout.html');
	
});


module.exports = router;
