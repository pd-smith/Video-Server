import fs from 'fs';
import * as config from '../../server/util/config.js';

// TODO: Sort through this and code until readable
export function streamVideo(requestRange, videoPath, res) {
    var filePath = config.getVideoPath() + videoPath + "";
    var stat = fs.statSync(filePath);
    var total = stat.size;
    if (requestRange) {

        var range = requestRange;
        var parts = range.replace(/bytes=/, "").split("-");
        var partialstart = parts[0];
        var partialend = parts[1];

        var start = parseInt(partialstart, 10);
        start = +start || 0;
        var end = partialend ? parseInt(partialend, 10) : total-1;
        var chunksize = (end-start)+1;
        console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunksize);

        var file = fs.createReadStream(filePath, {start: start, end: end});
        res.writeHead(206, {
            'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
            'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
            'Content-Type': 'video/mp4'
        });
        file.pipe(res);

      } else {

        console.log('ALL: ' + total);
        res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'video/mp4' });
        fs.createReadStream(filePath).pipe(res);
    }
}
