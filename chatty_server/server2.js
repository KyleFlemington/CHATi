const express = require('express');
const SocketServer = require('ws').Server;



const PORT = 4000;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });


//broadcast o all
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};


wss.on('connection', (ws) => {
  console.log('Client connected');




  ws.on('message', function incoming(message) {
    wss.broadcast(message);
    console.log('received', JSON.parse(message));
  });


  ws.on ('incomingMessage',  (ncEvent) => {
    wss.broadcast(ncEvent);
    console.log(" changed their name", JSON.parse(ncEvent.data));
  });




  ws.on('close', () => console.log('Client disconnected'));
});