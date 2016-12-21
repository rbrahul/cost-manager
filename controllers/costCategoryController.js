var CostCategory=require('../models/costCategories');

var CategoryController={
	index:function(req,res,next){
		CostCategory.find({},function(err,categories){
			if(err) throw err;

			res.render('partials/cost-categories.html',{categories:categories,title:'Categories'});
		})
		//res.send('list of categories');
	},
	create:function(req,res,next){
		res.send('create category');
	},
	save:function(req,res,next){
		 req.checkBody('name', 'Name is required').notEmpty();
		  var errors = req.validationErrors(true);// true for mapped errors returns a object with unique req.body
				 if(errors){
				 			console.log(errors);
				 			res.render('partials/cost-categories.html',{errorMessage:errors});
				 }else{
				 
				 			CostCategory.create({
										name:req.body.name,
										created_by:req.session.user._id
									},function(err,category){
										if(err) throw err;

										res.redirect('/categories');
									});
				 }
	
	},
	edit:function(req,res,next){
		res.send('edit category');
	},
	update:function(req,res,next){
		res.send('updated category');
	},
	destroy:function(req,res,next){
		console.log(req.session.user);
		//res.end();
		CostCategory.findOneAndRemove({_id:req.params.id},function(err){
			if(err) throw err;

			res.redirect('/categories');
		});
		
	},
	fetchCategories:function(req,res,next){
				CostCategory.find({created_by:req.params.id},function(err,categories){
				if(err) throw err;

					res.json(categories);
				});
	}
};

module.exports=CategoryController;