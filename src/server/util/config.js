import * as entry from '../../entry.js'

export function getProjectPath() {
    return entry.getProjectPath();
}

export function getVideoPath() {
    return getProjectPath() + '/videos';
}

export function getEpisodePath() {
    return getVideoPath() + '/episodes';
}

export function getMoviePath() {
    return getVideoPath() + '/movies'
}

export function getViewsPath() {
    return getProjectPath() + '/server/views';
}

export function getParam() {
    return 'id';
}
export function getSeasonFolderPrefix() {
    return 'Season_';
}

export function getEpisodeFilePrefix() {
    return 'Episode_';
}
