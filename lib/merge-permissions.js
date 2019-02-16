const cachePermissions = require('./cache-permissions')

//  @TODO: Connect to remote identity groups

module.exports = mergePermissions;

const mergePermissions = (resource, identity, acl, defaultAcl, ownerGroups, callback) => {
    const groupPermissions = ownerGroups.reduce((prev, curr, index, arr) => {
        return Object.assign(prev, curr)
    }, getIdPermissions(identity, ownerGroups[0]))

    const identityPermissions = acl[identity] || acl['*'] || defaultAcl
    const permissions = Object.assign(groupPermissions, identityPermissions)
    cachePermissions(resource, identity, permissions, callback)
}

const getIdPermissions = (identity, group) => {
    return group[identity] ? group[identity] : {}
}

//  groups are ordered in priority level, so the owner has control over how permissions are applied.
    //  merge the group permissions from the top-down.
    //  once merged the group permissions are merged with the visitors permissions.
    //      if no visitor permissions are available then the catch-all permission are merged.
    //      if no catch-all permissions are available then the owners default permissions are merged.
    //  once resolved, cache the permissions. This cache file will be re-built if permissions are updated.