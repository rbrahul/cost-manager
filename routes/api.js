var express = require('express');
var router = express.Router();

var usersMiddleware=require('../middlewares/usersmiddleware.js');
var usersApiController=require('../controllers/usersApiController.js');
var costCategoryController=require('../controllers/costCategoryController.js');

router.get('/categories/:id',costCategoryController.fetchCategories);


module.exports = router;