//import required modules for app
const express = require('express');
const app = express();
const http = require('http');

// import and connecting for socket.io
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors:{
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["my-custom-header"],
  credentials: true,
}});




//import addUsers
const {addUser} = require('./users')

//dontenv
const dotenv = require('dotenv');
dotenv.config();

//connect to mongodb
const mongoose = require('mongoose');
mongoose.connect(
  process.env.DB_CONNECT,
()=>console.log('connected to mongodb'))


//import mongoose schema
const chatLogs = require('./models/logs')


//On connection established from frontend
io.on('connection', (socket) => {
    //log when a new user enters
    // console.log('A user has entered chat');
    
  
    //when a user joins the room
    socket.on("join", ({ name, room }, callBack) => {
      const { user, error } = addUser({ id: socket.id, name, room });
      if (error) return callBack(error);
      socket.join(user.room);
      
      socket.broadcast.to(user.room)
      .emit("message", { user: "Admin", text: `${user.name} has joined!` });

    
      socket.on("sendMessage", ({ message }) => {
        var today = new Date();
        var newLog = new chatLogs({
          name: user.name,
          message: message,
          time : new Date().getTime()
        })
        
        let response  = newLog.save();
        response.then((result) => {
          io.to(user.room).emit("message",{
            user: user.name,
            text: message,
            time : today.getHours() + ":" + today.getMinutes()
          });
        }).catch((err) => {
          console.log(err)
        });
      }); 
      callBack(null);
    });  
    //log when a user disconnects
    // socket.on('disconnect', () => {
    //     console.log('A user had exited chat');
    // });
});

const cors = require('cors')
app.use(cors())
app.get("/chatLogs",(req,res)=>{
  var oldmessages = chatLogs.find();
      oldmessages.then((result) => {
        result = result.map((message)=>{return {user:message.name,text:message.message,time : new Date(message.time).getHours() + ":"+ new Date(message.time).getMinutes()}})
        return res.status(200).send(result)
      }).catch((err) => {
        console.log(err)
      });
  
})


//run on port 5000
server.listen(5000, () => {
  console.log('listening on *:5000');
});

