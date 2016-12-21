var mongoose=require('mongoose');

var costSchema=new mongoose.Schema({
	date: {type:String, required:true},
	amount:{type:Number},
	user_id:{type:mongoose.Schema.Types.ObjectId},
	category:{type:mongoose.Schema.Types.ObjectId},
});

var Cost=mongoose.model('Cost',costSchema,'cost');

module.exports=Cost;