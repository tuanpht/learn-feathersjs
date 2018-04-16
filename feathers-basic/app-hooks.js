const feathers = require('@feathersjs/feathers');
const Messages = require('./services/Messages');

const app = feathers();

app.use('messages', new Messages());

app.service('messages').hooks({
    before: {
        create: async context => {
            console.log('Hooked with context data', context.data);
            context.data.createdAt = new Date();

            return context;
        }
    }
});

// Re-usable hooks
const setTimestamp = fieldName => {
    return async context => {
        context.data[fieldName] = new Date();

        return context;
    }
}

async function loggingHook(context) {
    const {path, method, type} = context;
    console.log('Context hook', {path, method, type});
}

// Validation hooks example
const { BadRequest } = require('@feathersjs/errors');

const validate = context => {
    const { data } = context;

    if (!data.text) {
        throw new BadRequest('Message text must exist');
    }

    if (typeof data.text !== 'string' || data.text.trim() === '') {
        throw new BadRequest('Message text is invalid');
    }

    context.data = {
        text: data.text,
    };

    return context;
}

app.service('messages').hooks({
    before: {
        create: [
            validate,
            setTimestamp('created_at'),
            loggingHook,
        ],
        update: setTimestamp('updated_at'),
    }
});

// Application hooks
app.hooks({
    before: async context => {
        console.log('Hook before: application hooks will always run before all service before hooks');
    },
    after: async context => {
        console.log('Hook after: application hooks will always run after all service after hooks');
    },
    error: async context => {
        console.log('Hook error: application hooks will always run after all service error hooks');
        console.error(`Error in '${context.path}' service method '${context.method}'`, context.error.stack);
    }
});

async function testHooks() {
    const message = await app.service('messages').create({
        text: 'First message',
    });

    console.log(message);

    const message2 = await app.service('messages').create({
        text: '',
    });
}

testHooks();

