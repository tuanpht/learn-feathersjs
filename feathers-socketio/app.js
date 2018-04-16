const feathers = require("@feathersjs/feathers");
const socketio = require("@feathersjs/socketio");
const express = require("@feathersjs/express");
const memory = require("feathers-memory");
const { BadRequest } = require("@feathersjs/errors");

// const app = feathers(); // If no rest transport
const app = express(feathers());

// Rest transport
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());

// Socket.io transport
app.configure(socketio());

// On any real-time connection, add it to the `everybody` channel
app.on("connection", connection => app.channel("everybody").join(connection));

// Publish all events to the `everybody` channel
app.publish(() => app.channel("everybody"));

// Services
app.use(
  "messages",
  memory({
    paginage: {
      default: 10,
      max: 25
    }
  })
);

const validate = context => {
  const { data } = context;

  if (!data.text) {
    throw new BadRequest("Message text must exist");
  }

  if (typeof data.text !== "string" || data.text.trim() === "") {
    throw new BadRequest("Message text is invalid");
  }

  context.data = {
    text: data.text
  };

  return context;
};

app.service('messages').hooks({
    before: {
        create: validate
    }
});

app.use(express.errorHandler());
const server = app.listen(3000);

server.on("listening", () =>
  console.log("Feathers API started at localhost:3000")
);
