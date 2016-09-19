import * as config from './config.js';

export function generateSeasonFolderName(seasonNumber) {
    if (Number.isInteger(seasonNumber)) {
        return config.getSeasonFolderPrefix + seasonNumber;
    }
    throw new Error('Parameter inputed is not an integer.');
}

export function generateEpisodeFileName(episodeNumber) {
    if (Number.isInteger(seasonNumber)) {
        return config.getEpisodeFilePrefix + episodeNumber;
    }
    throw new Error('Parameter inputed is not an integer.');
}

export function generateShowFileName(showName) {
    return showName.replace(' ', '-');
}

export function generateShowName(fileName) {
    return showName.replace('-', ' ');
}
