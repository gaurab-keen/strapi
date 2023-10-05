'use strict';

module.exports = ({ strapi }) => {
  // register phase
  strapi.customFields.register({
    name: 'npistrapi',
    plugin: 'npistrapi',
    type: 'string',
  });
  strapi.customFields.register({
    name: 'npistrapi1',
    plugin: 'npistrapi',
    type: 'string',
  });
  strapi.customFields.register({
    name: 'npistrapi2',
    plugin: 'npistrapi',
    type: 'json',
  });
};
