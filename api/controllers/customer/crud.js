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

function getCustomerDetails(nic)
{
    var promise=new Promise(function(resolve,reject){
        Customer.find({nic:nic},function(error,doc){
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

function editCustomerDetails(firstName,lastName,nic,email,phone)
{
    var phone=parseInt(phone)
    var promise=new Promise(function(resolve,reject){
        Customer.findOneAndUpdate({nic:nic},{firstName:firstName,lastName:lastName,email:email,phone:phone},{new:true},function(error,doc){
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

module.exports.editCustomerDetails=editCustomerDetails;
module.exports.getCustomerDetails=getCustomerDetails;
module.exports.customerRegistration=customerRegistration;