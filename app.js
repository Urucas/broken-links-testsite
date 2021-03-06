var express = require('express')
var app = express();

var server = require('http').Server(app);

app.use('/', express.static('static/'));

var io = require('socket.io')(server);

io.on('connection', function(socket){
	
	socket.on("test", function(params){

		if(!params.s.match(/^[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/)){
			socket.emit("log", {stdout: "Invalid site url format!"});
			return;
		}

		if(!params.e.match(/^[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/)){
			socket.emit("log", {stdout: "Invalid site url 404 format!"});
			return;
		}

		var spawn = require('child_process').spawn;
		var args = []; 
				args.push("-s");
				args.push(params.s);
				args.push("-404");
				args.push(params.e);

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

