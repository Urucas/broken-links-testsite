var socket = io();

socket.on("log", function(data){
	var stdout = data.stdout;
			stdout = uncolor(stdout);

	$(".terminal").append(stdout+"<br />");
});

$(document).ready(function(){
	$(".form > button").click(function(){
		$(".terminal").html("test@broken-links: broken-links -s <br />");
		socket.emit("test");
	});
});

function uncolor(stdout){

	/* require('colors') colors array
	 * black: [30, 39],
	 * red: [31, 39],
	 * green: [32, 39],
   * yellow: [33, 39],
   * blue: [34, 39],
   * magenta: [35, 39],
   * cyan: [36, 39],
   * white: [37, 39],
   * gray: [90, 39],
   * grey: [90, 39],
	 */

	stdout = stdout.replace(/\[30m/g, '<span class="black">');
	stdout = stdout.replace(/\[31m/g, '<span class="red">');
	stdout = stdout.replace(/\[32m/g, '<span class="green">');
	stdout = stdout.replace(/\[33m/g, '<span class="yellow">');
	stdout = stdout.replace(/\[34m/g, '<span class="blue">');
	stdout = stdout.replace(/\[35m/g, '<span class="magenta">');
	stdout = stdout.replace(/\[36m/g, '<span class="cyan">');
	stdout = stdout.replace(/\[37m/g, '<span class="white">');
	stdout = stdout.replace(/\[90m/g, '<span class="gray">');
	stdout = stdout.replace(/\[39m/g, '</span>');
	stdout = "test@broken-links: " + stdout;
	return stdout;
}
