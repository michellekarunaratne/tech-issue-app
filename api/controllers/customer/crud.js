const Customer=require('../../models/customer');
const User=require('../user/crud')
const Complaint=require('../../models/complaint')
const Staff=require('../../models/staff')

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
            else if(doc)
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

function logCustomerComplaints(equipmentName,equipmentFault,imageName,imageType,imageValue,lat,lng,phone,address,userId)
{
    const $Vals={};

    function getCustomer()
    {
        return new Promise(function(resolve,reject){
            Customer.find({nic:userId},function(error,doc){
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
    }

    function createComaplaint()
    {
        var moment=require('moment')
        var date=moment().format('LLL')

        return new Promise(function(resolve,reject){
            var complaint=new Complaint({
                refferenceNumber:makeDefaultRefferenceNumber(),
                equipmentName:equipmentName,
                equipmentFault:equipmentFault,
                image:{
                    filename:imageName,
                    filetype:imageType,
                    filevalue:imageValue
                },
                location:{
                  latitude:lat,
                  longitude:lng
                },
                phone:parseInt(phone),
                address:address,
                customer:$Vals.customer,
                date:date
            })

            complaint.save(function(error,doc){
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

    return getCustomer()
    .then(function(doc){
        $Vals.customer=doc
        return createComaplaint()
    })
}

function makeDefaultRefferenceNumber()
{
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


module.exports.editCustomerDetails=editCustomerDetails;
module.exports.getCustomerDetails=getCustomerDetails;
module.exports.customerRegistration=customerRegistration;
module.exports.logCustomerComplaints=logCustomerComplaints;
