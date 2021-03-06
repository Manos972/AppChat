'use strict';

// Tout d'abbord on initialise notre application avec le framework Express 
// et la bibliothèque http integrée à node.
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

server.listen(process.env.PORT || 3000);
// On gère les requêtes HTTP des utilisateurs en leur renvoyant les fichiers du dossier 'public'
app.use("/", express.static(__dirname + "/public"));

//Log de connexion et de déconnexion des utilisateurs

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconected');
  });

//Réception de l'événement 'chat-message' et réémission vers tous les utilisateurs
  socket.on('chat-message', function (message) {
    io.emit('chat-message', message);
    console.log('message : ' + message.text);
      });
  });

// On lance le serveur en écoutant les connexions arrivant sur le port 3000
http.listen(3000, function(){
  console.log('Server is listening on *:3000');
});

  
