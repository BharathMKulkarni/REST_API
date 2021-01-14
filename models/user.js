var mongoose=require('mongoose');

var UserSchema=mongoose.Schema({
    username:String,
    email:{
        type:String,
        required:true,
        unique:true
    }
})

module.exports=mongoose.model("user",UserSchema);