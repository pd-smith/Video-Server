import express from 'express';
import * as config from '../util/config.js';
import {streamVideo} from '../../views/video_player/video_server.js';
import {getLastPathURL} from '../util/url.js';
import {constructShowList, constructShowDirectoryList} from './api/response_construct.js';

export default function() {
    let app = express.Router();

    app.get('/', (req, res) => {
        res.sendFile(config.getProjectPath() + '/src/views/index.html');
    });

    app.get('/show/*/*', (req, res) => {
        res.send("world");
    });

    app.get('/show/*', (req, res) => {
        const showName = getLastPathURL(req.path);
        let showList =
          (showName === '') ? constructShowList(): constructShowDirectoryList(showName);
        res.send(showList);
    });

    app.get('/movie/*', (req, res) => {
        streamVideo(req.headers.range, req.param(config.getParam()), res);
    });

    return app;
}
