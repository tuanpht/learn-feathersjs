// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// Need to create MD5
const crypto = require('crypto');

// Gravatar service
const gravatarUrl = 'https://s.gravatar.com/avatar';
// Image size, 60px
const query = ' s=60';

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // User email
    const { email } = context.data;

    // Gravatar use md5 hash from email to get image
    const hash = crypto.createHash('md5').update(email).digest('hex');

    context.data.avatar = `${gravatarUrl}/${hash}?${query}`;;

    return context;
  };
};
