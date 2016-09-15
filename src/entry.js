import {main} from "./server/app.js"

const projectPath = __dirname.substring(0, __dirname.lastIndexOf("/"));
function entryFunction() {
    main();
}

export function getProjectPath() {
    return projectPath;
}

entryFunction();
