const ActiveStaff=require('../../models/activeStaff')

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

module.exports.getActiveStaffMember=getActiveStaffMember;