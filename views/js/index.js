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
console.log('newMessage' , message);
let formatedTime = moment(message.createdAt).format('h:mm a');
let li = jQuery('<li></li>');
li.text(`${message.from} ${formatedTime} : ${message.text}`);

jQuery('#messages').append(li); 
});

socket.on('newLocationMessage' , function (locationMessage){
console.log('newLocationMessage' , locationMessage);
let formatedTime = moment(locationMessage.createdAt).format('h:mm a');
let li = jQuery('<li></li>');
let a = jQuery('<a target="_blank">click here to see my current location</a>');
li.text(`${locationMessage.from} ${formatedTime}: `);
a.attr('href' , locationMessage.url );
li.append(a);
jQuery('#messages').append(li);
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
