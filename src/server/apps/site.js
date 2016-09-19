import express from 'express';
import * as config from '../util/config.js';
import {streamVideo} from '../../views/video_player/video_server.js';

export default function() {
    let app = express.Router();

    app.get('/', (req, res) => {
        res.sendFile(config.getProjectPath() + '/src/views/index.html');
    });

    app.get('/show/*', (req, res) => {
        res.sendFile(config.getProjectPath() +
            '/src/views/show_page/show_page_template.html');
    });

    app.get('/movie/*', (req, res) => {
        streamVideo(req.headers.range, req.param(config.getParam()), res);
    });

    return app;
}
