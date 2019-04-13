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

module.exports.getStaffdetails=getStaffdetails;