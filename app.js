var express = require('express'),
	app = express(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	ss = require('socket.io-stream'),
	path = require('path'),
	fs = require('fs');

var VIDEO_PATH = __dirname + "/videos/";

var contentTypes = {
    "default":"text/html",
    "video":"video/mp4",
    "text":"text/json",
    "html":"text/html"
}

app.use(express.static(path.join(__dirname, "/public")));


app.get('/', function(req,res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/video', function(req,res){
	console.log(req.headers.range);
	var filePath = VIDEO_PATH + req.query.path + "";
	var stat = fs.statSync(filePath);
  	var total = stat.size;
	if (req.headers.range) {
		
		var range = req.headers.range;
	    var parts = range.replace(/bytes=/, "").split("-");
	    var partialstart = parts[0];
	    var partialend = parts[1];

	    var start = parseInt(partialstart, 10);
	    start = +start || 0;
	    var end = partialend ? parseInt(partialend, 10) : total-1;
	    var chunksize = (end-start)+1;
	    console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

	    var file = fs.createReadStream(filePath, {start: start, end: end});
	    res.writeHead(206, { 'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
	    file.pipe(res);

	  } else {

	    console.log('ALL: ' + total);
	    res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
	    fs.createReadStream(filePath).pipe(res);
	}
});
	
   


io.on('connection', function(socket) {
	ss(socket).on('upload_episode', function(stream,data){
		//console.log("File Upload. Size: " + (data.size/1000000) + " MB");
		if(findShow(data.name) === false){
			fs.mkdirSync(VIDEO_PATH + data.name);
		}
		if(findSeason(data.name,data.season) === false){
			fs.mkdirSync(VIDEO_PATH + data.name + "/" + data.season);
		}
		stream.pipe(fs.createWriteStream(VIDEO_PATH + data.name + "/" + data.season + "/" + data.episode));

	});

	ss(socket).on('upload_ova', function(stream,data){
		//console.log("File Upload. Size: " + (data.size/1000000) + " MB");
		if(findShow(data.name) === false){
			fs.mkdirSync(VIDEO_PATH + data.name);
		}
		if(findSeason(data.name,"OVA") === false){
			fs.mkdirSync(VIDEO_PATH + data.name + "/OVA");
		}
		stream.pipe(fs.createWriteStream(VIDEO_PATH + data.name +"/OVA/" + data.episode));

	});

	ss(socket).on('upload_movie', function(stream,data){
		//console.log("File Upload. Size: " + (data.size/1000000) + " MB");
		if(findShow(data.name) === false){
			fs.mkdirSync(VIDEO_PATH + data.name);
		}
		if(findSeason(data.name,"Movies") === false){
			fs.mkdirSync(VIDEO_PATH + data.name + "/Movies");
		}
		stream.pipe(fs.createWriteStream(VIDEO_PATH + data.name+ "/Movies/" + data.title));

	});

	ss(socket).on("show_retrieve", function(title,uuid){
		ss(socket).emit("show_retrieve_complete",listDir(title),uuid);
	});

	ss(socket).on("episode_retrieve", function(title,season,episode, uuid){
		var stream = fs.createReadStream(VIDEO_PATH+title +"/"+season+"/"+episode);
		ss(socket).emit("episode_stream",stream,uuid);
		//stream.pipe(socket);

	});

	ss(socket).on("pop_list_req", function(){
		ss(socket).emit("pop_list", listShows());
	});

  	ss(socket).on('finished', function(data){
  		console.log("Upload Complete!");
  	});
});

var listDir = function(title){
	//nested for loops to maintain order.
	var shows = [];
	var files = fs.readdirSync(VIDEO_PATH + title);
    for(var i in files){
    	var stat = fs.statSync(VIDEO_PATH + title + "/" + files[i]);
        if(stat.isDirectory() && files[i] !== "meta"){
        	shows.push(files[i]);
        	var probSeason = fs.readdirSync(VIDEO_PATH + title + "/" + files[i]);
        	for(var j in probSeason){
        		shows.push(probSeason[j]);
        	}
        }
    }
    return shows;
};

var listShows = function(){
	var shows = [];
	var files = fs.readdirSync(VIDEO_PATH);
	for(var i in files){
		shows.push(files[i]);
	}
	return shows;
}

var findShow = function(title){
    var files = fs.readdirSync(VIDEO_PATH);
    for(var i in files){
        if(files[i] === title){
          console.log('Show Found');
          return true;
        }
    }
    return false;
};

var findSeason = function(title,season){
  var files = fs.readdirSync(VIDEO_PATH + title);
  for(var i in files){
      if(files[i] === season){
        console.log("Season found");
        return true;
      }
  }
  return false;
};

function contentTypeSelector(ctype){
    if (!contentTypes[ctype]) return contentTypes["default"]
    return contentTypes[ctype];
};


http.listen(3000);
console.log("Listening on LocalHost:3000");