var mongoose=require('mongoose');

var userSchema=new mongoose.Schema({
	name: String,
	email: {type:String,unique:true},
	mobileno: Number,
	address: String,
	user_type:String,
	password: String,
	created_at: Date,
	updated_at: Date

});

userSchema.pre('save',function(next){
	  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

var User=mongoose.model('User',userSchema,'users');

module.exports=User;