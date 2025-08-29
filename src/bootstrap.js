'use strict';

/**
 * Bootstrap with NO SEEDING.
 * Grants Public role read access to the APIs your frontend needs.
 *
 * - Articles, Categories, Authors, Global, About, Partners
 * - Idempotent: creates or enables missing permissions, changes nothing else
 */
module.exports = async () => {
  await ensurePublicPermissions({
    article: ['find', 'findOne'],
    category: ['find', 'findOne'],
    author: ['find', 'findOne'],
    global: ['find', 'findOne'],
    about: ['find', 'findOne'],
    partner: ['find', 'findOne'],
  });

  // Optional: log for visibility
  strapi.log.info('✅ Public permissions ensured (articles, categories, authors, global, about, partners).');
};

/* -------------------------------------------------------------------------- */
/*                               Helper functions                             */
/* -------------------------------------------------------------------------- */

/**
 * Ensure the "public" role has the specified actions.
 * Example input:
 * {
 *   article: ['find','findOne'],
 *   partner: ['find','findOne']
 * }
 */
async function ensurePublicPermissions(map) {
  const publicRole = await strapi.db
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) {
    strapi.log.warn('Public role not found; users-permissions plugin enabled?');
    return;
  }

  for (const apiName of Object.keys(map)) {
    const actions = map[apiName];
    for (const action of actions) {
      const actionKey = `api::${apiName}.${apiName}.${action}`;
      await ensurePermission(publicRole.id, actionKey);
    }
  }
}

/**
 * Create or enable a specific permission for a role.
 */
async function ensurePermission(roleId, action) {
  try {
    const existing = await strapi.db
      .query('plugin::users-permissions.permission')
      .findOne({ where: { role: roleId, action } });

    if (!existing) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .create({ data: { role: roleId, action, enabled: true } });
      strapi.log.debug(`Permission created: ${action}`);
      return;
    }

    if (!existing.enabled) {
      await strapi.db
        .query('plugin::users-permissions.permission')
        .update({ where: { id: existing.id }, data: { enabled: true } });
      strapi.log.debug(`Permission enabled: ${action}`);
    }
  } catch (err) {
    // If a content-type doesn't exist yet, we just skip and continue
    strapi.log.warn(`Skipping permission ${action}: ${err.message}`);
  }
}
