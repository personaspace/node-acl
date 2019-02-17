//const cachePermissions = require('./cache-permissions')

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
    //  get the groups the identity is part of
    const appliedGroups = ownerGroups.filter(group => {
        return group.connections.indexOf(identity) != -1
    }).map(group => group.name)
    const permissions = [
        defaultAcl,
        ...appliedGroups.map(group => acl[group] ? acl[group] : false),
        acl[identity] || acl['*'] || false
    ].filter(acl => acl)
    callback(null, permissions)
    //  Not sure if we are going to use caching yet, as we only apply caching to connections
    //  cachePermissions(resource, identity, permissions, callback)
}

module.exports = mergePermissions;
//  groups are ordered in priority level, so the owner has control over how permissions are applied.
    //  merge the group permissions from the top-down.
    //  once merged the group permissions are merged with the visitors permissions.
    //      if no visitor permissions are available then the catch-all permission are merged.
    //      if no catch-all permissions are available then the owners default permissions are merged.
    //  once resolved, cache the permissions. This cache file will be re-built if permissions are updated.