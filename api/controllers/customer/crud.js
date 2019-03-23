const Customer=require('../../models/customer');
const User=require('../user/crud')

function customerRegistration(firstName,lastName,nic,email,phone,password)
{
    var promise=new Promise(function(resolve,reject){
        var customer = new Customer({
            firstName:firstName,
            lastName:lastName,
            nic:nic,
            email:email,
            phone:phone
        })
        customer.save(function(error,doc){
            if(error)
            {
                reject(error);
            }
            else
            {
               User.userRegistration(nic,password)
               .then(function(doc){
                   resolve(doc)
               })
               .catch(function(error){
                   reject(error)
               })
            }
        })
    })
    return promise;
}

module.exports.customerRegistration=customerRegistration;