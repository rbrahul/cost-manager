var userMiddleware={
	authCheck:function(req,res,next){
			if(req.session && req.session.user){
				console.log(req.session.user);
					return next();
			}else{
				return res.redirect('/login');
			}
	},
	matchesId:function(req,res,next){
		if(req.params.id!=1){	
				res.status(401);
				res.json('user ID didn\'t match');
				
			}else{
				return next();
			}
	}
};
module.exports=userMiddleware;