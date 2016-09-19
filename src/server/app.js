import express from 'express';
import http from 'http';
import * as config from './util/config.js';
import site from './apps/site.js';
import serverAPI from './apps/server_api.js';

export function main() {
    const port = 3000;
    const host = 'localhost';
    let app = express();

    app.use(express.static(config.getProjectPath() + '/lib'));

    app.use('/', site());
    app.use('/api', serverAPI());

    return new Promise((resolve) => {
        const server = http.createServer(app);
        server.listen(port, host, () => {
            resolve(server);
        });
    });

}
