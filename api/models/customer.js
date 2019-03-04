const mongoose=require('mongoose');
const Schema =mongoose.Schema;

var customerSchema= new Schema (
    {
        firstName:String,
        lastName:String,
        Nic:String,
        Email:String,
        ContactNumber:Number
    }
)

module.exports= mongoose.model('Customer',customerSchema);
