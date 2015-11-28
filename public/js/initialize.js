function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
var server = 'localhost:3000';
//var server = 'http://192.168.1.148:3000';
var socket = io.connect(server);
var showList = [];
var listEpisodes = [];
var titleImage;
var showTitle;
var description;
var genres = [];


ss(socket).on("episode_stream", function(stream, uuid){
		$("#fragment").load("pages/showListTemplate.html");
		if(UUID == uuid){
			stream.pipe(this);
		}
});
ss(socket).on("pop_list", function(list){
	showList = list;
});
ss(socket).emit("pop_list_req");
var UUID = generateUUID();