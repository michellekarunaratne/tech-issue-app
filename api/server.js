const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./DB'),
User=require('./controllers/user/crud'),
Customer= require('./controllers/customer/crud'),
ActiveStaff=require('./controllers/complaints/notifyStaff'),
Complaint=require('./controllers/complaints/crud'),
Staff=require('./controllers/staff/crud')


mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();

app.use(bodyParser.json());
app.use(cors());
const port = process.env.PORT || 4000;
var jsonencodedParser = bodyParser.json({ extended: false });

const server = app.listen(port, function(){
 console.log('Listening on port ' + port);
});

var io = require('socket.io').listen(server);

io.on('connection', function(socket){
  var socketId=socket.id
  socket.on('login',function(userId){
  User.activeStaffLogin(userId,socketId)
  console.log('a staff member connected'+' '+socketId);
  })
  socket.on('disconnect', function () {
    console.log('a staff member disconnected');
  });

  socket.on('reconnect',function (socketId) {
    console.log('a staff member reconnected');
  });


});

io.on('connection',function(socket){

  socket.on('notifyStaff',function(customerId){
    ActiveStaff.getActiveStaffMember()
    .then(function(doc){
      if(doc.socketId)
      {
        console.log(doc.socketId)
        io.sockets.connected[doc.socketId].emit('staffMemberNotification',{msg:"you have a complaint to attend to"})
        ActiveStaff.allocateStaffToComplaint(customerId,doc.userId)
        .then(function(doc){
          console.log("succesful")

        })
        .catch(function(error){
          console.log(error)
        })
      }
    })
    .catch(function(error){
      //io.sockets.connected.emit('NoStaffMemberNotification',{msg:"No Avaialable staff member to allocate complaints"})
    })

    socket.on('reconnect',function (socketId) {
      console.log('a staff member reconnected');
    });



  })
})


app.post('/userLogin',jsonencodedParser,(req,res)=>{
  User.userLogin(req.body.userId,req.body.password)
  .then(function(doc){
    if(!doc)
    {
      res.send({userId:"Not Found"})
    }
    else
    {
      res.send(doc);
    }
  })
  .catch(function(error){
    res.send(error);
  })
})

app.post('/userRegistration/customer',jsonencodedParser,(req,res)=>{
  Customer.customerRegistration(req.body.firstName,req.body.lastName,req.body.nic,req.body.email,req.body.phone,req.body.password)
  .then(function(doc){
    res.send(doc);
  })
  .catch(function(error){
    res.send(error)
  })
})

app.post('/logComplaint',jsonencodedParser,(req,res)=>{

})

app.post('/activeStaffLogout',jsonencodedParser,(req,res)=>{

  User.removeActiveStaff(req.body.userId)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.post('/customer/editCustomerDetails',jsonencodedParser,(req,res)=>{
  Customer.editCustomerDetails(req.body.firstName,req.body.lastName,req.body.nic,req.body.email,req.body.phone)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.post('/customer/logComplaints',jsonencodedParser,(req,res)=>{
  Customer.logCustomerComplaints(req.body.equipmentName,req.body.equipmentFault,req.body.image.filename,req.body.image.filetype,req.body.image.filevalue,req.body.location.latitude,req.body.location.longitude,req.body.phone,req.body.address,req.body.customerId)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.get('/customer/viewComplaints',jsonencodedParser,(req,res)=>{
  Complaint.getComplaintsOfCustomer(req.query.userId)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.get('/staff/viewAllocatedComplaints',jsonencodedParser,(req,res)=>{
  Complaint.getComplaintsOfStaff(req.query.empId)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.post('/staff/editDetails',jsonencodedParser,(req,res)=>{
  Staff.editStaffDetails(req.body.empId,req.body.email,req.body.phone)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })

})

app.post('/staff/addReport',jsonencodedParser,(req,res)=>{
  Complaint.addReport(req.body.id,req.body.date,req.body.startTime,req.body.endTime,req.body.cost,req.body.jobTicket)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.get('/staff/getUnallocatedComplaints',jsonencodedParser,(req,res)=>{
  Complaint.getUnallocatedComplaints()
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.get('/staff/acceptComplaint',jsonencodedParser,(req,res)=>{
  Complaint.manuallyAllocateStaffToComplaint(req.query.empId,req.query.complaintId)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.get('/staff/logoutActiveStaff',jsonencodedParser,(req,res)=>{
  User.removeActiveStaff(req.query.empId)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.get('/admin/getAllocatedComplaintsByYear',jsonencodedParser,(req,res)=>{
  Complaint.getAllocatedByYear(req.query.currentYear)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})

app.get('/admin/getUnallocatedComplaintsByYear',jsonencodedParser,(req,res)=>{
  Complaint.getUnallocatedByYear(req.query.currentYear)
  .then(function(doc){
    res.send(doc)
  })
  .catch(function(error){
    res.send(error)
  })
})


