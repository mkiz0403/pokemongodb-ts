"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const hostname = 'localhost', port = 4000;
(0, http_1.createServer)((req, res) => {
    res.write('hello World');
    res.end();
}).listen(port, () => console.log(`${hostname} 서버접속 완료`));
