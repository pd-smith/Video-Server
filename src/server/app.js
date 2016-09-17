import express from 'express';
import http from 'http';
import * as config from './util/config.js';
import {streamVideo} from '../views/video_player/video_server.js';

export function main() {
    let app = express();

    app.use(express.static(config.getProjectPath() + '/public'));

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



    http.Server(app).listen(3000);
    console.log('Listening on LocalHost:3000');
}
