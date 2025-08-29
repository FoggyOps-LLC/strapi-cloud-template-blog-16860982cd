// src/bootstrap.js
'use strict';

module.exports = async () => {
  await ensurePublicPermissions({
    article: ['find', 'findOne'],
    category: ['find', 'findOne'],
    author: ['find', 'findOne'],
    global: ['find', 'findOne'],
    about: ['find', 'findOne'],
    partner: ['find', 'findOne'],
  });
  strapi.log.info('✅ Public permissions ensured for partner and existing types.');
};

async function ensurePublicPermissions(map) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  for (const apiName of Object.keys(map)) {
    for (const action of map[apiName]) {
      const actionKey = `api::${apiName}.${apiName}.${action}`;
      const existing = await strapi.db.query('plugin::users-permissions.permission')
        .findOne({ where: { role: publicRole.id, action: actionKey } });
      if (!existing) {
        await strapi.db.query('plugin::users-permissions.permission')
          .create({ data: { role: publicRole.id, action: actionKey, enabled: true } });
      } else if (!existing.enabled) {
        await strapi.db.query('plugin::users-permissions.permission')
          .update({ where: { id: existing.id }, data: { enabled: true } });
      }
    }
  }
}
