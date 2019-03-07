// const moment = require("moment");

var socket = io();

socket.on('connect' , function (){
    console.log('connect to the server');
});

socket.emit('clientMessage' , {
    from : "client123@gmail.com" ,
    to : 'server',
    createdAt : '4324'
});


socket.on('disconnect' , function (){
    console.log('disconnect to the server');
});

socket.on('newMessage' , function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: formattedTime
    });
  
    jQuery('#messages').append(html); 
});

socket.on('newLocationMessage' , function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
      from: message.from,
      url: message.url,
      createdAt: formattedTime
    });
  
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit' , function(e){
e.preventDefault();

let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage' , {
    from : 'User',
    text : messageTextbox.val()    
    } , function() {
    messageTextbox.val('')
    });
});

let locationButton = jQuery('#geo-location');


locationButton.on('click' , function() {
    if(!navigator.geolocation)
    {
    return alert('geolocation does not sppourt your browser');
    }

    locationButton.attr('disabled' , 'disabled').text('sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('send location');
            socket.emit('createLocationMessage' , {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            });
        } , function() {
            locationButton.removeAttr('disabled').text('send location');
            alert('unable to fetch location');
        });

});
