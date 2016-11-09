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
    const episodeInformation = {};

    files.forEach((season) => {
  	   const seasonPathStat = fs.statSync(videoPath + '/' + season);
       if (seasonPathStat.isDirectory()) {
          const seasonContents = fs.readdirSync(videoPath + '/' + season);
          let episodeListForSeason = [];
          seasonContents.forEach((episode) => {
              episodeListForSeason.push({
                  [EPISODE_NAME_ATTRIBUTE]: episode,
                  [EPISODE_LINK_ATTRIBUTE]: `${videoPath}/${season}/${episode}`
              });
          });
          episodeInformation[season] = episodeListForSeason;
       }
    });

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
