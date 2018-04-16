const app = feathers();
const FEATHER_SERVER = "http://localhost:3000";

const socket = io(FEATHER_SERVER);

// Socket client
app.configure(feathers.socketio(socket));

// Or Rest client
// const rest = feathers.rest(FEATHER_SERVER);
// Use Rest client to use window.fetch for ajax
// app.configure(rest.fetch(window.fetch));

app.service('messages').on('created', message => {
    console.log('Someone created an message', message);
});

// Test
/* async function createAndList() {
    await app.service('messages').create({
        text: 'Hello from browser client',
    });

    const messages = await app.service('messages').find();

    console.log('Current messaes', messages);
}

createAndList(); */
