var mongoose=require('mongoose');

var costCategoriesSchema=new mongoose.Schema({
	name: {type:String, required:true},
	created_by:{type:mongoose.Schema.Types.ObjectId}

});

var CostCategory=mongoose.model('CostCategory',costCategoriesSchema,'cost_categories');

module.exports=CostCategory;