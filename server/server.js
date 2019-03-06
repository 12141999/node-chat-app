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

    socket.on('disconnect' , () => {
        console.log('user is disconnect');
    });

});


const port = process.env.PORT || 3000 ;

app.get("/" , (req,res) => {
    res.render("index.ejs");
});

server.listen(port , () => {
    console.log('server is started');
});