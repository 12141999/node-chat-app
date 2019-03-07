const express = require('express');
const path = require('path');
const ejs = require('ejs');
const socketIO = require('socket.io');
const http = require('http');

const { generateMessage , generateLocationMessage } = require('./util/message');

const publicPath = path.join(__dirname + '../views');
let app = express();
app.use(express.static(publicPath));
//app.set("view engine" , "ejs");

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection' , (socket) => {
    console.log('new user connected' , socket.id);

    sendStatus = function(s){
        socket.emit(s);
      }

    socket.emit('newMessage' , generateMessage("robinjain9587@gmail.com" , "hi client"));

    socket.on('createMessage' , (data) => {
        console.log(data);
        io.emit('newMessage' , generateMessage(data.from , data.text));
    });

    socket.on('createLocationMessage' , (location) => {
        console.log(location);
        io.emit('newLocationMessage' , generateLocationMessage('admin' , location.latitude , location.longitude ));
    });

    socket.broadcast.emit('newMessage' , generateMessage("robin jain" , "welcome in my chat-app"));
    
    socket.on('disconnect' , () => {
        console.log('user is disconnect');
    });

});


const port = process.env.PORT || 3001 ;

app.get("/" , (req,res) => {
    res.render("index.ejs");
});

server.listen(port , () => {
    console.log('server is started');
});