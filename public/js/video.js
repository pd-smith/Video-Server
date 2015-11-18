var video = (function () {
    return {
        download : download
    };




    function download(stream, cb) {
        var parts = [];

        stream.on('data', function (data) {
            parts.push(data);
        });

        stream.on('error', function (err) {
            cb(err);
        });

        stream.on('end', function () {
            var src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));

            cb(null, src);
        });
    }
})();