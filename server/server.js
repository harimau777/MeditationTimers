const express = require('express');

const server = new express();

server.use(express.static(__dirname + '/../client'));

server.listen(8080, () => console.log('Server is now listening on port 8080'));