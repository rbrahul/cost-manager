var User=require('../models/user');

var usersApi={
	create: function(req, res, next) {
  			res.render('partials/user-registration.html', { title: 'Sign Up' });
			},
	save:function(req, res, next) {
				 req.checkBody('full_name', 'Full name is required').notEmpty();
				 req.checkBody('email', 'Invalid email').isEmail();
				 req.checkBody('email', 'Email is required').notEmpty();
				 req.checkBody('password', 'Password must have at leas 5 characters').isLength({min:5, max: undefined});
				 req.checkBody('password', 'Password is required').notEmpty();
				 req.checkBody('confirmation_password', 'Password doesn\'t match').equals(req.body.password,req.body.confirmation_password);
				 var errors = req.validationErrors(true);// true for mapped errors returns a object with unique req.body
				 if(errors){
				 	//res.send(errors);
			  		res.render('partials/user-registration.html', { title: 'Sign Up',formErrors:errors });
				 }else{
				 	User.create({
				 		name:req.body.full_name,
				 		email:req.body.email,
				 		password: req.body.password
				 	},function(err,user){
				 		if(err) throw err;

				 			res.render('partials/user-registration.html', { title: 'Sign Up',successMsg:'You have been registered successfully' });

				 	});
				 }

			},

	loginview: function(req, res, next) {
				res.render('partials/user-login.html', { message:'Login form',title: 'Sign In' });
			},

	login:function(req, res, next) {
					req.checkBody('email', 'Invalid email').isEmail();
				 	req.checkBody('email', 'Email is required').notEmpty();
				 	 var errors = req.validationErrors(true);// true for mapped errors returns a object with unique req.body
					 if(errors){
				  		res.render('partials/user-login.html', { title: 'Sign In',formErrors:errors });
					 }else{
					 	User.findOne({email:req.body.email,password:req.body.password},function(err,user){
					 		if(err) throw err;
					 		console.log("###LOGGED IN USER INFO#######");
					 		console.log(user);
					 		if(user){
						 		delete user.password;
						 		req.session.user=user;
						 		res.redirect('/');
					 		}else{
					 			res.render('partials/user-login.html', { loginError:'Email or password does not match',title: 'Sign In',oldValue:req.body });
					 		}
	
					 	});
							
						}

			},
	logOut:function(req, res, next) {
			req.session.destroy(function(err){
				if(err) throw err;

				console.log("User Logged Out");
				res.redirect('/login');
			});
		},
	index:function(req, res, next) {
		User.find({},function(err,users){
			if(err) throw err;

			res.render('partials/list-of-users.html',{title:'Users',users:users});
		});
		}
};

module.exports=usersApi;