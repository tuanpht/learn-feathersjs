// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    if (!data.text) {
      throw new Error('A message must have a text');
    }

    // Authenticated user
    const user = context.params.user;
    // Actual message text sent from client
    const text = context.data.text.substring(0, 400); // Limit message length

    // Whitelist fied to save to db
    context.data = {
      text,
      userId: user._id,
      createdAt: new Date().getTime(),
    };

    // Best practice: hooks should always return the context
    return context;
  };
};
