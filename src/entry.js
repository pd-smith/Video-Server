import {main} from './server/app.js';
import {generateShowName} from './server/util/naming_convention.js';

const projectPath = __dirname.substring(0, __dirname.lastIndexOf("/"));
function entryFunction() {
    main();
}

export function getProjectPath() {
    return projectPath;
}

entryFunction();
