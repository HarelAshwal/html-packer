import * as bodyParser from "body-parser";
import express = require("express");
import * as path from "path";
import * as http from 'http';
import morgan = require('morgan');
import cors = require('cors');
import split = require('split')

import * as jwt from 'jsonwebtoken';


export class Server {

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {

        this.app = express();
        this.config();
        this.routes();
    }

    server: http.Server;
    port: number;

    start() {
        var selected_port = process.env.PORT || 3000;
        this.port = parseInt(selected_port.toString());
        this.app.set('port', selected_port);

        this.server = http.createServer(this.app);
        this.server.listen(selected_port);

        this.server.on('error', this.onError);
        this.server.on('listening', this.onListening);
    }

    async stop() {
        return new Promise((resolve, reject) => {
            this.server.close((err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                resolve(true);
            });
        });
    }

    onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        var bind = typeof error.port.toString() === 'string'
            ? 'Pipe ' + error.port.toString()
            : 'Port ' + error.port.toString();

        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    onListening() {

        var addr = (this as any).address();
        var bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;

        console.log('Web Server Listening on ' + bind);
    }



    private config() {

        var sizeLimit = '200mb';

        this.app.use('/', express.static(path.join(__dirname, "doc")));

        this.app.use(morgan('dev'))

        this.app.use(bodyParser.json({ limit: sizeLimit }));

        this.app.use(bodyParser.urlencoded({ limit: sizeLimit, extended: true }));
        this.app.use(cors());

        this.app.use(express.static(path.join(__dirname, "public")));

        this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            var error = new Error("Not Found");
            err.status = 404;
            next(err);
        });


    }

    private routes() {
        let router: express.Router;

        router = express.Router();

        this.app.use(router);

        this.app.get('*', function (req, res) {
            res.redirect('/');
        });
    }

}
