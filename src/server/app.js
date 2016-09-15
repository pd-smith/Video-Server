import express from 'express';
import http from 'http';
import path from 'path';
import fs from 'fs';
import * as config from './util/config.js';
import {streamVideo} from '../views/video_player/video_server.js';

const VIDEO_PATH = global.SOURCE_PATH + "/videos/";
const META_PATH = global.SOURCE_PATH + "/public/meta/";

export function main() {
    let app = express();

    app.use(express.static(config.getProjectPath() + "/public"));

    app.get('/', function(req, res){
        res.sendFile(config.getProjectPath() + '/src/views/index.html');
    });

    app.get('/video', function(req, res){
        streamVideo(req.headers.range, req.param("vid"), res);
    });

    http.Server(app).listen(3000);
    console.log("Listening on LocalHost:3000");
}
