// const moment = require("moment");

var socket = io();

socket.on('connect' , function (){
    console.log('connect to the server');

    let params = jQuery.deparam(window.location.search);

    socket.emit('join' , params , function(err) {
        if(err)
        {
            alert(err);
            window.location.search = '/';
        }
        else{
            console.log('no error');
        }
    });

});

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }


socket.on('updateList' , function(users){
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user) {
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
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
    scrollToBottom();
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
    scrollToBottom();
});

jQuery('#message-form').on('submit' , function(e){
e.preventDefault();

let messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage' , {
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
