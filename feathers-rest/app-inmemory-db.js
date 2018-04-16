const feathers = require("@feathersjs/feathers");
const memory = require("feathers-memory");

const app = feathers();

app.use(
  "messages",
  memory({
    paginate: {
      default: 10,
      max: 25
    }
  })
);

async function createAndFind() {
  const messages = app.service("messages");

  for (let id = 0; id < 100; ++id) {
    await messages.create({
      id,
      message: `Message id ${id}`
    });
  }

  // Show 10 items by default, but skip 10 items to show page 2
  const page2 = await messages.find({
    query: { $skip: 10 }
  });

  console.log('Page number 2', page2);

  // Show 20 items
  const largePage = await messages.find({
    query: { $limit: 20 },
  });

  console.log('20 items', largePage);

  // Find the first 10 items with counter greater 50 and less than 70
  const filterResults = await messages.find({
    query: {
      id: { $gt: 50, $lt: 70 }
    }
  });

  console.log('Items with id between 50, 70', filterResults);

  // Find all entries with text "Message id 20"
  const message20 = await messages.find({
    query: {
      message: 'Message id 20'
    }
  });

  console.log('Entries with text "Message id 20"', message20);
}

createAndFind();
