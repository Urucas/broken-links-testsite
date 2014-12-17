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
				args.push(params.site);
				args.push("-404");
				args.push(params.e404);

		var	child = spawn("broken-links", args);
				child.on("close", function(code, signal){
					console.log("Finished!");
				});
				
				child.stderr.on("data", function(data){
					console.log("error "+ data);
				});

				child.stdout.on("data", function(data){
					console.log(" "+data);
					socket.emit("log", {stdout : " "+data});
				});
			
	});
});

server.listen(3000, function(){
	console.log("Server running");
});

