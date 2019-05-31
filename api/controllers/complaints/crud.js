const Complaint=require('../../models/complaint')
const Report=require('../../models/report')
const Staff=require('../staff/crud')
const nodemailer = require('nodemailer');


function getComplaintsOfCustomer(customerId)
{
    var promise=new Promise(function(resolve,reject){
        Complaint.find({"customer.nic":customerId},function(error,doc){
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

function getComplaintsOfStaff(empId)
{
    var promise=new Promise(function(resolve,reject){
       Complaint.find({"staff.empId":empId},function(error,doc){
           if(error)
           {
               reject(error)
           }
           else
           {
               resolve(doc)
           }
       }).sort({date:-1}); 
    })
    return promise
}

function addReport(complaintId,date,start,end,cost,ticket)
{
    var promise=new Promise(function(resolve,reject){
        Complaint.findByIdAndUpdate(complaintId,{"report.date":date,"report.startTime":start,"report.endTime":end,"report.cost":cost,"report.jobTicket":ticket},{new:true},function(error,doc){
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

function getUnallocatedComplaints()
{
    var promise=new Promise(function(resolve,reject){
        Complaint.find({allocatedStaff:false},function(error,doc){
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

function manuallyAllocateStaffToComplaint(empId,complaintId)
{
    $Vals={}

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

    function allocateStaffToComplaint()
    {
        return new Promise(function(resolve,reject){
            Complaint.findByIdAndUpdate(complaintId,{staff:$Vals.staff,allocatedStaff:true},{new:true},function(error,doc){
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
        return allocateStaffToComplaint()
    })
    .then(function(doc){
        $Vals.complaint=doc
        return sendMail($Vals.staff.email)
    })
    .then(function(doc){
        return($Vals.complaint)
    })

}

module.exports.manuallyAllocateStaffToComplaint=manuallyAllocateStaffToComplaint;
module.exports.getUnallocatedComplaints=getUnallocatedComplaints;
module.exports.addReport=addReport;
module.exports.getComplaintsOfStaff=getComplaintsOfStaff;
module.exports.getComplaintsOfCustomer=getComplaintsOfCustomer;
