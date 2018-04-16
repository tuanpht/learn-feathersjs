// Create a websocket connecting to Feathers server
const socket = io("http://localhost:3000");

// Listen to new messages being created
socket.on("messages created", message =>
  console.log("Someone created a messae", message)
);

socket.emit('find', 'messages', (error, messageList) => {
    error && console.log(error);

    console.log('Current messages', messageList);
});
