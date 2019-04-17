const User=require('../../models/user');
const ActiveStaff=require('../../models/activeStaff')
const CustomerCrud=require('../customer/crud')
const StaffCrud=require('../staff/crud')


function userLogin(userId,password)
{
    var promise=new Promise(function(resolve,reject){
        User.find({userId:userId,password:password},function(error,doc){
            if(error)
            {
                reject(error);
            }
            else if(doc)
            {
                if(!doc[0].userId.includes("emp"))
                {
                    resolve(CustomerCrud.getCustomerDetails(userId))
                }
                else
                {
                    resolve(StaffCrud.getStaffdetails(userId))
                }
            }
        })
    })
    return promise;
}

function userRegistration(userId,userPassword)
{
    var promise=new Promise(function(resolve,reject){
        var user=new User({
            userId:userId,
            password:userPassword
        })

        user.save(function(error,doc){
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

function activeStaffLogin(userId,socketId){
    
    var promise = new Promise(function(resolve,reject){

        ActiveStaff.findOne({userId:userId},function(error,doc){
            if(doc)
            {
                ActiveStaff.update({userId:userId},{socketId:socketId},{new:true},function(error,doc){
                    if(error)
                    {
                        reject(error)
                    }
                    else
                    {
                        resolve(doc)
                    }
                })
            }
            else if(!doc && userId)
            {
                var activeStaff=new ActiveStaff({
                    userId:userId,
                    socketId:socketId
                })
                activeStaff.save(function(error,doc){
                    if(error)
                    {
                        reject(error)
                    }
                    else
                    {
                        resolve(doc)
                    }
                })     
            }
            else
            {
                reject(error)
            }
        })
    })
    return promise
}

function removeActiveStaff(userId)
{
    var promise=new Promise(function(resolve,reject){
        ActiveStaff.deleteOne({userId:userId},function(error,doc){
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



module.exports.userLogin=userLogin;
module.exports.userRegistration=userRegistration;
module.exports.activeStaffLogin=activeStaffLogin;
module.exports.removeActiveStaff=removeActiveStaff;