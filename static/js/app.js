var socket = io();
var user = '<span class="green">hello@urucas</span><span class="white">:</span>~<span class="magenta">$</span>';

socket.on("log", function(data){
	var stdout = data.stdout;
			stdout = uncolor(stdout);

	$(".terminal").append(stdout+"<br />");
	$(".terminal").animate({
  	scrollTop: $(".terminal").height()
  }, 100);	
});

$(document).ready(function(){
	$("#testBtt").click(function(){
		window.scrollTo(0, 0);
		
		var s = $("#site_url").val();
		var e = $("#site_url_404").val();

		$(".terminal").html(user+" broken-links -s "+s+" -404 "+e+"<br />");
		socket.emit("test", {s:s, e:e});
	});

	$("#site_url").keyup(function(){
		$(".cli-s").text(this.value);
	});

	$("#site_url_404").keyup(function(){
		$(".cli-404").text(this.value);
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
	stdout = user + stdout;
	return stdout;
}
