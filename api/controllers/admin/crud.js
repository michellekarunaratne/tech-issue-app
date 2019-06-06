const Admin=require ('../../models/admin');


function getAdminDetails(adminId)
{
    var promise=new Promise(function(resolve,reject){
        Admin.find({adminId:adminId},function(error,doc){
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

module.exports.getAdminDetails=getAdminDetails;