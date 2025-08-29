'use strict';

const { createCoreRouter } = require('@strapi/strapi').factories;

// Default REST router for Partner (GET /partners, GET /partners/:id, etc.)
module.exports = createCoreRouter('api::partner.partner');
