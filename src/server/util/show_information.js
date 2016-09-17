import * as config from './config.js';
import fs from 'fs';

export function listShowDirectory(showTitle){
    const videoPath = config.getVideoPath() + showTitle;
  	var directoryContent = [];
  	var files = fs.readdirSync(videoPath);
    for(var i in files){
  	   var stat = fs.statSync(videoPath + '/' + files[i]);
       if(stat.isDirectory()){
      	  directoryContent.push(files[i]);
      	  var episodeCollection = fs.readdirSync(videoPath + '/' + files[i]);
      	  for(var j in episodeCollection){
      		    shows.push(episodeCollection[j]);
      	  }
       }
    }
    return directoryContent;
}

export function listShows(){
  	var shows = [];
  	var files = fs.readdirSync(config.getVideoPath());
  	for(var i in files){
  		shows.push(files[i]);
  	}
  	return shows;
}

export function findShow(showTitle){
    var files = fs.readdirSync(config.getVideoPath());
    for(var i in files){
        if(files[i] === showTitle){
          console.log('Show Found');
          return true;
        }
    }
    return false;
}

export function findSeason(showTitle,season){
    var files = fs.readdirSync(config.getVideoPath() + showTitle);
    for(var i in files){
        if(files[i] === season){
          console.log('Season found');
          return true;
        }
    }
    return false;
}
