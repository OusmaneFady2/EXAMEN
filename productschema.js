var mongoose=require('mongoose');
 
var productSchema = new mongoose.Schema({
    Name:String,
    Description:String,
    Price:Number,
    Stock:Number,
    Image:String,
    UserId:String,
    CreatedAt:Date
});
 
module.exports = mongoose.model(
    'product', productSchema);