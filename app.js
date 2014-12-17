var express = require('express')
var app = express();

var server = require('http').Server(app);

app.use('/', express.static('static/'));

var io = require('socket.io')(server);

io.on('connection', function(socket){
	
	socket.on("test", function(params){

		var spawn = require('child_process').spawn;
		var args = []; 
				args.push("-s");
				args.push("kuesty.com");
				args.push("-404");
				args.push("kuesty.com/error/e404");

		var	child = spawn("broken-links", args);
				child.on("close", function(code, signal){
					console.log("Finished!");
				});
				
				child.stderr.on("data", function(data){
					console.log("error "+ data);
					socket.emit("log", {stdout : " "+data});
				});

				child.stdout.on("data", function(data){
					socket.emit("log", {stdout : " "+data});
				});
			
	});
});

server.listen(3000,'localhost', function(){
	console.log("Server running");
});

