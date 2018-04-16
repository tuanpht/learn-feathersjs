const feathers = require('@feathersjs/feathers');
const Messages = require('./services/Messages');

const app = feathers();

app.use('messages', new Messages());

async function processMessages() {
    await app.service('messages').create({
        text: 'First message',
    });

    await app.service('messages').create({
        text: 'Second message',
    });

    const messageList = await app.service('messages').find();

    console.log('Available messages', messageList);
}

// processMessages();

async function messageEvents() {
    const messagesService = app.service('messages');

    messagesService.on('created', message => {
        console.log('Created new message', message);
    });

    messagesService.on('removed', message => {
        console.log('Removed message', message);
    });

    await messagesService.create({
        text: 'First Message',
    });

    const lastMessage = await messagesService.create({
        text: 'Second message',
    });

    await messagesService.remove(lastMessage.id);

    const messageList = await messagesService.find();

    console.log('Available messages', messageList);
}

messageEvents();
