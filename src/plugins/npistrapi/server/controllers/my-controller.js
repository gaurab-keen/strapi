'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('npistrapi')
      .service('myService')
      .getWelcomeMessage();
  },
});
