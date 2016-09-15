import express from 'express';
import http from 'http';
import server from 'socket.io';
import ss from 'socket.io-stream';
import path from 'path';
import fs from 'fs';
import * as config from './util/config.js';
import {streamVideo} from '../views/video_player/video_server.js';

const VIDEO_PATH = global.SOURCE_PATH + "/videos/";
const META_PATH = global.SOURCE_PATH + "/public/meta/";

var contentTypes = {
    "default":"text/html",
    "video":"video/mp4",
    "text":"text/json",
    "html":"text/html"
}
export function main() {
    let app = express();

    app.use(express.static("../../public"));


    app.get('/', function(req, res){
        res.sendFile(config.getProjectPath() + '/index.html');
    });

    app.get('/video', function(req, res){
        streamVideo(req.headers.range, req.param("vid"), res);
    });

    http.Server(app).listen(3000);
    addSocketListeners();
    console.log("Listening on LocalHost:3000");

}



function addSocketListeners() {
    let io = new server();
    io.on('connection', function(socket) {
        ss(socket).on('upload_episode', function(stream,data){
            //console.log("File Upload. Size: " + (data.size/1000000) + " MB");
            if(findShow(data.name) === false){
                fs.mkdirSync(VIDEO_PATH + data.name);
                fs.mkdirSync(META_PATH + data.name + "/meta");
            }
            if(findSeason(data.name,data.season) === false){
                fs.mkdirSync(VIDEO_PATH + data.name + "/" + data.season);
            }
            stream.pipe(fs.createWriteStream(VIDEO_PATH + data.name + "/" + data.season + "/" + data.episode));

        });

        ss(socket).on('upload_ova', function(stream,data){
            //console.log("File Upload. Size: " + (data.size/1000000) + " MB");
            if(findShow(data.name) === false){
                fs.mkdirSync(VIDEO_PATH + data.name);
                fs.mkdirSync(META_PATH + data.name);
            }
            if(findSeason(data.name,"OVA") === false){
                fs.mkdirSync(VIDEO_PATH + data.name + "/OVA");
            }
            stream.pipe(fs.createWriteStream(VIDEO_PATH + data.name +"/OVA/" + data.episode));

        });

        ss(socket).on('upload_picture' , function(stream,data){
            stream.pipe(fs.createWriteStream(META_PATH + data.name + "/show_image" + data.exten));
        });

        ss(socket).on('upload_desc' , function(stream,data){
            stream.pipe(fs.createWriteStream(META_PATH + data.name + "/desc.txt"));
        });

        ss(socket).on('upload_movie', function(stream,data){
            //console.log("File Upload. Size: " + (data.size/1000000) + " MB");
            if(findShow(data.name) === false){
                fs.mkdirSync(VIDEO_PATH + data.name);
                fs.mkdirSync(META_PATH + data.name);
            }
            if(findSeason(data.name,"Movies") === false){
                fs.mkdirSync(VIDEO_PATH + data.name + "/Movies");
            }
            stream.pipe(fs.createWriteStream(VIDEO_PATH + data.name+ "/Movies/" + data.title));

        });

        ss(socket).on("show_retrieve", function(title,uuid){
            ss(socket).emit("show_retrieve_complete",listDir(title),uuid);
        });

        ss(socket).on("episode_retrieve", function(title,season,episode, uuid){
            var stream = fs.createReadStream(VIDEO_PATH+title +"/"+season+"/"+episode);
            ss(socket).emit("episode_stream",stream,uuid);
            //stream.pipe(socket);

        });

        ss(socket).on("episode_info", function(title,uuid){
            var image = getImage(title);
            var desc = getDesc(title);

            ss(socket).emit("episode_info",{img_path:image,desc:desc}, uuid);
        });

        ss(socket).on("pop_list_req", function(){
            ss(socket).emit("pop_list", listShows());
        });

        ss(socket).on('finished', function(data){
            console.log("Upload Complete!");
        });
    });
}
