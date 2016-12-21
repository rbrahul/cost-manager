var express = require('express');
var router = express.Router();

var CostCategory=require('../models/costCategories');
var Cost=require('../models/costModel');

var userController=require('../controllers/usersApiController');
var usersMiddleware=require('../middlewares/usersmiddleware.js');



/* GET home page. */
router.get('/', usersMiddleware.authCheck,function(req, res, next) {
	var query=Cost.aggregate(
			[
			{$match:{user_id:req.session.user._id}},
			{$group:{_id:'$date',total:{$sum:'$amount'}}},
			]
		);
	query.exec(function(err,costs){
				if(!err){
						var costsByKey={};
						costs.map(function(data){
								costsByKey[data._id]=data.total;
								return data;
								});
			var date= new Date();
			var month=date.getMonth()+1;
			var year =date.getFullYear();
			var totalDaysInMonth=new Date(year, month, 0).getDate();
			console.log("Total days in june"+totalDaysInMonth);

				if(month<10){
					month='0'+month;
				}
			for(var i=1;i<=totalDaysInMonth;i++){
				var day='';
				if(i<10){
					day='0'+i;
				}else{
					day=i;
				}

				var dateAsKey=month+'/'+day+'/'+year;
				if(typeof costsByKey[dateAsKey]=='undefined'){
					costsByKey[dateAsKey]=0;
				}
			}
			//res.json(costsByKey);
			res.render('partials/dashboard.html',{title:'Dashboard',month:month,year:year,costs:costsByKey});
		}else{
			req.next(500);
		}

		});
});

router.get('/login',userController.loginview);
router.get('/logout',userController.logOut);
router.post('/login',userController.login);
router.get('/signup',userController.create);
router.post('/signup', userController.save);
module.exports = router;
