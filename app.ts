import { Server } from "./Server";
import opn = require('better-opn');

let server = Server.bootstrap();
server.start();

opn('http://localhost:3000');

