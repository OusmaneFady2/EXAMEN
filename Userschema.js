var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    username:String,
    firstname :String,
    lastname : String,
    email :String,
    password :String 
});
module.exports = mongoose.model(
    'user', userSchema);
