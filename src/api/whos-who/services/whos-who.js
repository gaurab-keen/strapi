'use strict';

/**
 * whos-who service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::whos-who.whos-who');
