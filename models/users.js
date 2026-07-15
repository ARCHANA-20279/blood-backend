const Mongoose=require("mongoose")
const useerSchema=new Mongoose.Schema({

name:{type:String,required:true},
phone:{type:Number,required:true},
password:{type:String,required:true},
email:{type:String,required:true}

})
var userModel=Mongoose.model("users",useerSchema)
module.exports=userModel