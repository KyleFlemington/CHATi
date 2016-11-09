const express = require('express');
const SocketServer = require('ws').Server;



const PORT = 4000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });


//broadcast o all
wss.broadcast = function broadcast(data) {
      console.log("broadcast made");

  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

var usersOnline = 0;
wss.on('connection', (ws) => {
  usersOnline += 1;
  var userCountMessage = {
    type: 'userCount',
      usersOnline: {
        usersOnline:usersOnline
      }
    
  };
  wss.broadcast(JSON.stringify(userCountMessage));
  console.log('Client connected', usersOnline);

  ws.on('message', function incoming(message) { 
    console.log("got a message, gonna broadcast this:", message);
    wss.broadcast(message);
    console.log('received', JSON.parse(message));
  });


  ws.on ('incomingMessage',  (ncEvent) => {
    console.log("got a incomingMessage, gonna broadcast this:", ncEvent);
    wss.broadcast(ncEvent);
    console.log(" changed their name", JSON.parse(ncEvent.data));
  });

  ws.on('close', () => {
    usersOnline -= 1;
    console.log('Client disconnected', usersOnline);
  });
});