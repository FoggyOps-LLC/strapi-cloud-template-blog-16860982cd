'use strict';
const { createCoreController } = require('@strapi/strapi').factories;

// If you want default populate/sort, uncomment:
/*
module.exports = createCoreController('api::leader.leader', ({ strapi }) => ({
  async find(ctx) {
    ctx.query = {
      populate: ctx.query.populate ?? '*',
      sort: ctx.query.sort ?? ['priority:asc','name:asc'],
      publicationState: ctx.query.publicationState ?? 'live',
      ...ctx.query,
    };
    return await super.find(ctx);
  },
}));
*/

module.exports = createCoreController('api::leader.leader');
