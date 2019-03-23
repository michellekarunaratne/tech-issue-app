const User=require('../../models/user');
const ActiveStaff=require('../../models/activeStaff')
function userLogin(userId,password)
{
    var promise=new Promise(function(resolve,reject){
        User.find({userId:userId,password:password},function(error,doc){
            if(error)
            {
                reject(error);
            }
            else
            {
                resolve(doc[0]);
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

        return promise
    })
}

function removeActiveStaff(socketId)
{
    var promise=new Promise(function(resolve,reject){
        ActiveStaff.remove({socketId:socketId},function(error,doc){
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