const ActiveStaff=require('../../models/activeStaff')
const Complaint=require('../../models/complaint')
const Staff=require('../staff/crud')

function getActiveStaffMember()
{
    var promise=new Promise(function(resolve,reject){
        ActiveStaff.find({},function(error,doc){
            if(error)
            {
                reject(error)
            }
            else
            {
                resolve(doc[0])
            }
        }).sort({"loginStamp": -1})
    })

    return promise;
}

function allocateStaffToComplaint(customerId,empId)
{
   const $Vals={}
   
   function getStaff()
   {
       return new Promise(function(resolve,reject){
           Staff.getStaffdetails(empId)
           .then(function(doc){
               resolve(doc)
           })
           .catch(function(error){
               reject(error)
           })

       })
   }

  function setStaffToComplaint()
  {
      return new Promise(function(resolve,reject){
          Complaint.findOneAndUpdate({"customer.nic":customerId,allocatedStaff:false},{staff:$Vals.staff,allocatedStaff:true},function(error,doc){
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
  }

  return getStaff()
  .then(function(doc){
      $Vals.staff=doc
      return setStaffToComplaint()
  })
}


module.exports.allocateStaffToComplaint=allocateStaffToComplaint
module.exports.getActiveStaffMember=getActiveStaffMember;