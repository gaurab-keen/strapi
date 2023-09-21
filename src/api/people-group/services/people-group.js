'use strict';

/**
 * people-group service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::people-group.people-group');
