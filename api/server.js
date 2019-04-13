const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./DB'),
User=require('./controllers/user/crud'),
Customer= require('./controllers/customer/crud'),
ActiveStaff=require('./controllers/complaints/notifyStaff')


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
  socket.on('appdisconnect', function (socketId) {
    console.log('a staff member disconnected');
  });

  socket.on('reconnect',function (socketId) {
    console.log('a staff member reconnected');
  });


});

io.on('connection',function(socket){
  
  socket.on('notifyStaff',function(){
    ActiveStaff.getActiveStaffMember()
    .then(function(doc){
      if(doc.socketId!=null)
      {
        io.sockets.connected[doc.socketId].emit('staffMemberNotification',{msg:"you have a complaint to attend to"})
      }
    })
    .catch(function(error){
      console.log(error)
    })
    
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
  
