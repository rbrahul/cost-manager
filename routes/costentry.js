var express = require('express');
var router = express.Router();

var usersMiddleware=require('../middlewares/usersmiddleware.js');
var costEntryController=require('../controllers/costEntryController');

router.get('/',costEntryController.allcosts);
router.get('/details/:date',costEntryController.dailyCost);
router.get('/create',costEntryController.index);
router.get('/edit/:date',costEntryController.edit);
router.post('/save',costEntryController.save);

module.exports=router;