import {main} from "./server/app.js"

global.SOURCE_PATH = __dirname.substring(0, __dirname.lastIndexOf("/"));
function entryFunction() {
    main();
}
    
entryFunction();