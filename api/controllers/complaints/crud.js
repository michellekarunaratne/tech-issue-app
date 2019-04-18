const Complaint=require('../../models/complaint')
const Report=require('../../models/report')

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

function addReport(complaintId,date,start,end,cost,ticket)
{
    var promise=new Promise(function(resolve,reject){
        Complaint.findByIdAndUpdate(complaintId,{"report.date":date,"report.startTime":start,"report.endTime":end,"report.cost":cost,"report.jobTicket":ticket},{new:true},function(error,doc){
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

module.exports.addReport=addReport;
module.exports.getComplaintsOfStaff=getComplaintsOfStaff;
module.exports.getComplaintsOfCustomer=getComplaintsOfCustomer;