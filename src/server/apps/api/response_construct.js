import * as showInfo from '../../util/show_information.js';

export function constructShowDirectoryList(showName) {
    let showList = null;
    try {
        showList = showInfo.listEpisodeInformation(showName);
    } catch (err) {
        return {
            error: 'Show not found'
        };
    }

    const output = {
        'show_name': showName,
        'show_links': [
            showList
        ]
    };

    return output;
}

export function constructShowList() {
    const output = {};
    return output;
}
