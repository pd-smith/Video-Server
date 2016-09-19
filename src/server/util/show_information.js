import * as config from './config.js';
import * as naming from './naming_convention.js';
import fs from 'fs';

const SHOW_NAME_ATTRIBUTE = 'show_name';
const SHOW_LINK_ATTRIBUTE = 'show_links';
const EPISODE_NAME_ATTRIBUTE = 'episode_name';
const EPISODE_LINK_ATTRIBUTE = 'episode_link'


export function listEpisodeInformation(showTitle){
    const videoPath = `${config.getEpisodePath()}/${showTitle}`;
    const files = fs.readdirSync(videoPath);
    let hasMultipleSeasons = false;
    let episodeInformation = '{';

    for (var season in files) {
  	   const seasonPathStat = fs.statSync(videoPath + '/' + files[season]);
       if (seasonPathStat.isDirectory()) {

          hasMultipleSeasons ? episodeInformation += ',': hasMultipleSeasons = true;
          episodeInformation += `"${files[season]}":[`;
          let hasMultipleEpisodes = false;
          const seasonPath = fs.readdirSync(videoPath + '/' + files[season])
      	  for (var episode in seasonPath) {
              hasMultipleEpisodes ? episodeInformation += ',': hasMultipleEpisodes = true;
              episodeInformation += `{
                "${EPISODE_NAME_ATTRIBUTE}": "${seasonPath[episode]}",
                "${EPISODE_LINK_ATTRIBUTE}": "${files[season]}/${seasonPath[episode]}"
              }`;
      	  }
          episodeInformation += ']'
       }
    }
    episodeInformation += '}';
    return episodeInformation;
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
