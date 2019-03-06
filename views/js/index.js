var socket = io();

socket.on('connect' , function (){
    console.log('connect to the server');

    socket.emit('clientMessage' , {
        from : "client123@gmail.com" ,
        to : 'server',
        createdAt : '4324'
    });

    

});

socket.on('disconnect' , function (){
    console.log('disconnect to the server');
});

socket.on('newMessage' , function (data) {
    console.log(data);
});