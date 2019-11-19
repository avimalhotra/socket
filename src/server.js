var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/view/index.html');
});

//io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  console.log("new user connected");
  socket.username="avi";
  socket.on('change_username',(data)=>{
    socket.username=data.username;
  })
  
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  });

http.listen(3000, function(){
  console.log('listening on *:3000');
});