import * as config from '../../server/util/config.js';
import {getLastPathURL} from '../../server/util/url.js';

const SHOW_NAME_HEADER = document.getElementById('show_header');
const SHOW_CONTENTS_LIST = document.getElementById('show_contents_list');

function main() {
    const showName = getLastPathURL();
    console.log("show name" + showName);
    SHOW_NAME_HEADER.innerHTML = showName;
}

main();
