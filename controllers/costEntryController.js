var CostCategory=require('../models/costCategories');
var Cost=require('../models/costModel');
var costEntryController={
	index:function(req,res,next){

		CostCategory.find({created_by:req.session.user._id},function(err,categories){
			if(err) throw err;

				res.render('partials/add-new-cost',{title:'Cost Entry',categories:categories});
		});
		
	},
	save:function(req,res,next){
		var categories=req.body['category[]'];
		var amounts=req.body['amount[]'];
		for(var i=0; i<categories.length;i++){
		
			Cost.create({
				user_id:req.session.user._id,
				date:req.body.date,
				amount:(amounts[i]).trim(),
				category:categories[i]
			},function(err){
				if(err) throw err;
			});
		}

				req.flash('success','Costs have been saved successfully');
				res.redirect('/costs');

		
	
	},
	allcosts:function(req,res,next){
var query=Cost.aggregate(
			[
			{$match:{user_id:req.session.user._id}},
			{$group:{_id:'$date',total:{$sum:'$amount'}}},
			]
		);
query.exec(function(err,costs){
			//console.log(costs);
			
			res.render('partials/all-costs.html',{title:'All Costs',expenses:costs});
		});

		
	},
	dailyCost:function(req,res,next){
		if(req.params.date ){
			var date=req.params.date.replace(/\-/g,'/')
			var query=Cost.find({date:date,user_id:req.session.user._id});

			query.exec(function(err,expences){
				if(!err){
					CostCategory.find({created_by:req.session.user._id},function(err,categories){
							if(!err){

			

								res.render('partials/daily-costs.html',{expences:expences,date:date,categories:categories});	
							}else{
								res.send('no category found');
							}	
					});

				}else{
					req.next(500);
				}
			});
		}
	},
	edit:function(req,res,next){
				if(req.params.date ){
			var date=req.params.date.replace(/\-/g,'/')
			var query=Cost.find({date:date,user_id:req.session.user._id});

			query.exec(function(err,expences){
				if(!err){
					CostCategory.find({created_by:req.session.user._id},function(err,categories){
							if(!err && categories.length>0) {
									console.log(categories.length);
									var categoriesByKey={};
									categories.map(function(data){
										categoriesByKey[data._id]=data.name;
										return data;
									});
									console.log(expences);

								res.render('partials/edit-daily-cost.html',{expences:expences,date:date,categories:categoriesByKey});	
							}else{
								res.send('no category found');
							}	
					});

				}else{
					req.next(500);
				}
			});
		}
		//res.send('edit category of :'+req.params.date);
	},
};

module.exports=costEntryController;