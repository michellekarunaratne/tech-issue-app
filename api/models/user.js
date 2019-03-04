const mongoose=require('mongoose');
const Schema =mongoose.Schema;

var userSchema= new Schema (
    {
       userId:String,
       password:String
    }
)

module.exports= mongoose.model('User',userSchema);