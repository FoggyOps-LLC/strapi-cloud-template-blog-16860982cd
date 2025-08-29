'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

// Default controller. Uncomment "find" to add default sort/populate if you want.
/*
module.exports = createCoreController('api::partner.partner', ({ strapi }) => ({
  async find(ctx) {
    // Ensure sensible defaults (frontend can still override via querystring)
    ctx.query = {
      populate: ctx.query.populate ?? '*',
      sort: ctx.query.sort ?? ['priority:asc', 'name:asc'],
      publicationState: ctx.query.publicationState ?? 'live',
      ...ctx.query,
    };
    return await super.find(ctx);
  },
}));
*/

module.exports = createCoreController('api::partner.partner');
