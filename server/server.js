const express = require('express');
const path = require('path');
const ejs = require('ejs');
const socketIO = require('socket.io');
const http = require('http');
const bodyParser = require('body-parser');

const { generateMessage , generateLocationMessage } = require('./util/message');
const { isRealString } = require('./util/validation');
const { Users } = require('./util/user');

const publicPath = path.join(__dirname + '../../views');
let app = express();
app.use(express.static(publicPath));
//app.set("view engine" , "ejs");

app.use(bodyParser.urlencoded({extended : true}));
app.use('', express.static(path.join(__dirname + '')));

let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

io.on('connection' , (socket) => {
    console.log('new user connected' , socket.id);

    sendStatus = function(s){
        socket.emit(s);
      }

    socket.on('join' , (params , callback) => {
        if(!isRealString(params.name) || !isRealString(params.room))
        {
            return callback('name and room are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id , params.name , params.room );
        io.to(params.room).emit('updateList' , users.getUserList(params.room));

        socket.emit('newMessage' , generateMessage("robin jain" , "welcome in my chat-app"));
        socket.broadcast.to(params.room).emit('newMessage' , generateMessage("admin" , `user ${params.name} has joined room`));

        callback();
    });


    socket.on('createMessage' , (data) => {
        let user = users.getUser(socket.id);
        if(user && isRealString(data.text))
        {
            io.to(user.room).emit('newMessage' , generateMessage(user.name , data.text));
        }
    });

    socket.on('createLocationMessage' , (location) => {
        let user = users.getUser(socket.id);
        if(user)
        {
            io.to(user.room).emit('newLocationMessage' , generateLocationMessage(user.name , location.latitude , location.longitude ));
        }
    });

    
    socket.on('disconnect' , () => {
        let user =  users.removeUser(socket.id);
        if(user)
        {
            io.to(user.room).emit('updateList' , users.getUserList(user.room));
            io.to(user.room).emit('newMessage' , generateMessage('Admin' , `${user.name} has left`));
        }
    });

});


const port = process.env.PORT || 3001 ;

app.get("/" , (req,res) => {
    res.render("index.ejs");
});

app.post('/chat' , (req,res) => {
    console.log(req.body);
    let username = req.body.username;
    let room = req.body.room;
    let data = { username : username , room : room };
    res.render("chat.ejs" , { data : data });
});

// app.get("/chat" , (req,res) => {

// });

server.listen(port , () => {
    console.log('server is started');
});