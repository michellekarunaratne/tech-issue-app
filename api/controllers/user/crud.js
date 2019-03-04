const User=require('../../models/user');

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

module.exports.userLogin=userLogin;