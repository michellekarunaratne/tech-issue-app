const mongoose=require('mongoose');
const Schema =mongoose.Schema;

var equipmentSchema= new Schema (
    {
       EquipmentId:String,
       Name:String
    }
)

module.exports= mongoose.model('equipment',equipmentSchema);