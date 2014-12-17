var socket = io();

socket.on("log", function(data){
	var stdout = data.stdout;
			stdout = uncolor(stdout);

	$(".terminal").append(stdout+"<br />");
});

$(document).ready(function(){
	$(".form > button").click(function(){
		
		$(".terminal").text("test@broken-links: broken-links -s");
		socket.emit("test");
	});
});

function uncolor(stdout){
	stdout = stdout.replace(/\[37m/g, '<span class="white">');
	stdout = stdout.replace(/\[33m/g, '<span class="yellow">');
	stdout = stdout.replace(/\[36m/g, '<span class="cyan">');
	stdout = stdout.replace(/\[31m/g, '<span class="red">');
	stdout = stdout.replace(/\[39m/g, '</span>');
	stdout = "test@broken-links: " + stdout;
	return stdout;
}
