import * as entry from '../../entry.js'

export function getProjectPath() {
    return entry.getProjectPath();
}

export function getVideoPath() {
    return getProjectPath() + "/videos/";
}
