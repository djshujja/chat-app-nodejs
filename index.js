const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
var cors = require('cors')
const server = http.createServer(app);
const io = socketio(server,
	{
		cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  	}
	});
const chatRoutes = require('./routes/chatRoutes.js')
const port = process.env.PORT || 5000;
app.use(cors())



io.on('connection', socket => {

	console.log("we have an we connection!!!")

	socket.on('join', ({name, room}, cb) => {
		console.log(name, room)
		
		const error = true;
		if(error) cb({error: "error"})

	})


	socket.on('disconnect', () => {
		console.log("disconnected!")
	})

})
app.use('/', chatRoutes);

server.listen(port, () => {
	console.log(`listening to ${port}`)
});
