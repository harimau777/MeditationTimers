const express = require('express');
const compression = require('compression');

const server = new express();

server.use(compression());  //Enable compression
server.use(express.static(__dirname + '/../client')); //Serve static content

server.listen(8080, () => console.log('Server is now listening on port 8080'));
