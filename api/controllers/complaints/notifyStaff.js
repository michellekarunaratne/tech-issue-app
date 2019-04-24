const ActiveStaff=require('../../models/activeStaff')
const Complaint=require('../../models/complaint')
const Staff=require('../staff/crud')
const nodemailer = require('nodemailer');


function getActiveStaffMember()
{
    var promise=new Promise(function(resolve,reject){
        ActiveStaff.find({complaintAllocated:false},function(error,doc){
            if(error)
            {
                reject(error)
            }
            else if (doc)
            {
                resolve(doc[0])
            }
            else
            {
               resolve({msg:"No available staff"})
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
              else if(doc)
              {
                  ActiveStaff.findOneAndUpdate({userId:$Vals.staff.empId},{complaintAllocated:true},{new:true},function(error,doc){
                        if(doc)
                        {
                            resolve(doc)
                        }
                        else
                        {
                            reject(error)
                        }
                  })
              }
          })
      })
  }

  function sendMail(email)
    {
        
            var promise=new Promise(function(resolve,reject){

                    nodemailer.createTestAccount((err, account) => {
                        // create reusable transporter object using the default SMTP transport
                        let transporter = nodemailer.createTransport({
                            host: 'smtp.gmail.com',
                            port: 465,
                            secure: true, // true for 465, false for other ports
                            auth: {
                                user:"techhelpwebsystem@gmail.com",
                                pass:"techhelp_1" 
                            }
                        });

                        // setup email data with unicode symbols
                        let mailOptions = {
                            from: '"No Reply" <techhelp@gmail.com>', // sender address
                            to: email, // list of receivers
                            subject: 'Allocated Complaint Notification', // Subject line
                            text: 'New Complaint has been allocated to you.Please check your log', // plain text body
                            html: '<p>New Complaint has been allocated to you.Please check your log</p><p>Thank you</p>' // html body
                        };

                        // send mail with defined transport object
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                //return console.log(error);
                                reject(error);
                            }
                            else
                            {
                                resolve(info)
                            }
                            //console.log('Message sent: %s', info.messageId);
                            //console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                        });
                    });
                })
                return promise;


    }

  return getStaff()
  .then(function(doc){
      $Vals.staff=doc
      return setStaffToComplaint()
  })
  .then(function(doc){
    $Vals.complaint=doc
    return sendMail($Vals.staff.email)
  })
  .then(function(doc){
    return($Vals.complaint)
  })

}



module.exports.allocateStaffToComplaint=allocateStaffToComplaint
module.exports.getActiveStaffMember=getActiveStaffMember;