const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const Messages = require('../feathers-basic/services/Messages.js');

// This creates an app that is both, an Express and Feathers app
const app = express(feathers());

// Json body parsing for rest services
app.use(express.json());

// Url-encoded body parsing
app.use(express.urlencoded({extended: true}));

// Express rest transport
app.configure(express.rest());

app.use('messages', new Messages());

// Express errors handler
// In Express an error handler, always has to be the last line before starting the server.
app.use(express.errorHandler());

const server = app.listen(3000);

app.service('messages').create({
    text: 'Hello from server',
});

server.on('listening', () => console.log('Feathers REST API started at http://localhost:3000'));
