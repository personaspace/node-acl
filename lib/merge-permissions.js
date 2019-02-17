// const cachePermissions = require('./cache-permissions')

//  @TODO: Connect to remote identity groups

/**
 * Builds an array of a resultant ACL that applies to the visiting identity. The resultant ACL is an array of
 * permissions that are run top-down by processPermissions to determine a visitors rights.
 *
 * @param {string} resource
 * @param {string} identity
 * @param {object} acl
 * @param {object} defaultAcl
 * @param {array} ownerGroups
 * @param {function} callback
 */
const mergePermissions = (resource, identity, acl, defaultAcl, ownerGroups, callback) => {
  const appliedGroups = ownerGroups.filter(group => {
    return group.connections.indexOf(identity) !== -1
  }).map(group => group.name)
  const permissions = [
    defaultAcl,
    ...appliedGroups.map(group => acl[group] ? acl[group] : false),
    acl[identity] || acl['*'] || false
  ].filter(acl => acl)
  callback(null, permissions)
}

module.exports = mergePermissions
