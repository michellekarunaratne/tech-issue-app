const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
cors = require('cors'),
mongoose = require('mongoose'),
config = require('./DB'),
User=require('./controllers/user/crud')


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

app.post('/userLogin',jsonencodedParser,(req,res)=>{
  User.userLogin(req.body.userId,req.body.password)
  .then(function(doc){
    res.send(doc);
  })
  .catch(function(error){
    res.send(error);
  })
})