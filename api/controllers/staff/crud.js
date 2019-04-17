const Staff=require('../../models/staff')

function getStaffdetails(empId)
{
    var promise=new Promise(function(resolve,reject){
        Staff.find({empId:empId},function(error,doc){
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(doc[0])
            }
        })
    })

    return promise
}

function editStaffDetails(empId,email,phone)
{
    var phone=parseInt(phone)
    var promise=new Promise(function(resolve,reject){
        Staff.findOneAndUpdate({empId:empId},{email:email,phone:phone},{new:true},function(error,doc){
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(doc)
            }
        })
    })
    return promise
}

module.exports.editStaffDetails=editStaffDetails;
module.exports.getStaffdetails=getStaffdetails;