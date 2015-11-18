$(function() {
	//var socket = io.connect('http://localhost:3000');

	$('#upload_button').click(function(e) {
		var button = document.getElementById("upload_button");
		if(button.className === "waves-effect waves-light btn"){
		    var file = document.getElementById('file').files[0]; // this line needs error checking
		    var stream = ss.createStream();
		    // upload a file to the server.
		    var extention = "." + file.name.split(".")[1];
		    var selection = parseInt(document.getElementById("type_select").value);

		    switch(selection){
		    	case 1:
		    		var name = document.getElementById("show_name").value;
		    		var season = "Season " + document.getElementById("season_number").value;
		    		var episode = "Episode " + document.getElementById("episode_number").value + extention;
		    		ss(socket).emit('upload_episode', stream, {size: file.size, name: name, season: season, episode: episode });
		    	break;
		    	case 2:
		    		var name = document.getElementById("show_name").value;
		    		var episode = document.getElementById("ova_episode_number").value + extention;
		    		ss(socket).emit('upload_ova', stream, {size: file.size, name: name, episode: episode });
		    	break;
		    	case 3:
		    		var name = document.getElementById("show_name").value;
		    		var title = document.getElementById("movie_name").value + extention;
		    		ss(socket).emit('upload_movie', stream, {size: file.size, name: name, title: title});
		    	break;
		    	default:
		    		console.log("There was an Error in Clip Type");
		    	break;
		    }

		    
		    var blobStream = ss.createBlobReadStream(file);
			var size = 0;
			var prog = document.getElementById('progress');
			prog.innerHTML = "<div class=\"progress\"><div class=\"determinate\" style=\"width: 0%\"></div></div>";
			blobStream.on('data', function(chunk) {
			  size += chunk.length;
			  //give some sort of bar to indicate loading
			  if(size >= file.size){
			  	ss(socket).emit('finished', 0);
			  	prog.innerHTML = "";
			  }else{
			  	prog.innerHTML = "<div class=\"progress\"><div class=\"determinate\" style=\"width:" +Math.round((size/file.size)*100) + "%\"></div></div>";
			  }
			});
			blobStream.pipe(stream);
		}
	});
});