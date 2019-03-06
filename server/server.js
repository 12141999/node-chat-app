const express = require('express');
const path = require('path');
const ejs = require('ejs');
const socketIO = require('socket.io');
const http = require('http');

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

    // socket.emit('newMessage' , {
    //     from : "robinjain9587@gmail.com",
    //     to : "the client",
    //     createdAt : "23.05 PM"
    // });

    // socket.on('clientMessage' , (data) => {
    //     console.log(data);
    //     io.emit('newMessage' , {
    //         from : 'robin jain',
    //         text : 'welcome to my chat app',
    //         createdAt : new Date().getTime()
    //     });
    // });

    socket.broadcast.emit('newMessage' , {
        from : 'admin',
        text : 'i have done it',
        createdAt : new Date().getTime()
    });
    
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