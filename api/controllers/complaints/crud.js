const Complaint=require('../../models/complaint')

function getComplaintsOfCustomer(customerId)
{
    var promise=new Promise(function(resolve,reject){
        Complaint.find({"customer.nic":customerId},function(error,doc){
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

function getComplaintsOfStaff(empId)
{
    var promise=new Promise(function(resolve,reject){
       Complaint.find({"staff.empId":empId},function(error,doc){
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

module.exports.getComplaintsOfStaff=getComplaintsOfStaff;
module.exports.getComplaintsOfCustomer=getComplaintsOfCustomer;