const Express = require("express")();
const Http = require("http").Server(Express);
const Socketio = require("socket.io")(Http);
const Messages = require('./database/Message');

const mongoose = require('mongoose')

const dev = true
const addr = dev
  ? 'mongodb://chat_db'
  : 'mongodb://[url mongodb]'

const connect = mongoose.connect(addr, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to mongodb database');
      if (dev) {
        mongoose.connection.dropDatabase();
      }
    })
    .catch(err => {
        console.error('Could not connect to mongodb database:', err.stack);
        process.exit(1);
    });

Http.listen(8082, () => {
    console.log("Listening at :8082...");
});

Socketio.on("connection", socket => {

  socket.emit('available', (true))
  console.log("User " + socket.id + " connected")

  connect.then(db => {
    Messages.find({}).then(chat => {
      chat.forEach(message => {
        socket.emit('chat-message', (message))
      })
    });
  })

  socket.on("disconnect", () => {
    console.log("User " + socket.id + " disconnected")
  });

  socket.on('chat-message', (data) => {
    socket.broadcast.emit('chat-message', (data));
    connect.then(db => {
      Messages.create({ message: data.message, user: data.user});
    })
  });

  socket.on('joined', (data) => {
    console.log("User " + data + " connected")
    socket.broadcast.emit('joined', (data));
    socket.emit('connections', Object.keys(Socketio.sockets.connected).length);
  });

  socket.on('leave', (data) => {
    socket.broadcast.emit('leave', (data));
  });

});
