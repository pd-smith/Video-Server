import {main} from './server/app.js';
import {generateShowName} from './server/util/naming_convention.js';

const projectPath = __dirname.substring(0, __dirname.lastIndexOf("/"));

export function getProjectPath() {
    return projectPath;
}

main().then((server) => {
    const address = server.address();
    console.log(`Listening on http://${address.address}:${address.port}`);
});
