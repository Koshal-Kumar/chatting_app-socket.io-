const express = require('express');
const { Server } = require('socket.io');

const app = express();
const http = require('http');       
const server = http.createServer(app);
// const { join } = require('node:path');
const io = new Server(server);

const path = require('path');

app.use(express.static(path.resolve('./public')))


app.get('/',(req,res) => {
    res.sendFile( '/public/index.html');
})

io.on('connection', (socket)=>{

    socket.on('chat message', (msg) => {
        io.emit('chat message',msg);
        console.log('message: '  + msg);
      });
})


server.listen(3000, ()=>{
    console.log("Server running at port 3000...");
})