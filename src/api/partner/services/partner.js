'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

// Default service (you can add custom business logic here later)
module.exports = createCoreService('api::partner.partner');
