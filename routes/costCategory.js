var express = require('express');
var router = express.Router();

var costCategoryController=require('../controllers/costCategoryController');
var usersMiddleware=require('../middlewares/usersmiddleware.js');

router.get('/',costCategoryController.index);
router.post('/',costCategoryController.save);
router.get('/:id',costCategoryController.destroy);

module.exports = router;