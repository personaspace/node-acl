const mergePermissions = require('./merge-permissions')
const processPermissions = require('./process-permissions')

/**
 *
 * @param {string} resource The resource address. If pointing to an asset, the resource will be resolved.
 * @param {string} identity The identity of the visitor.
 * @param {object} acl The ACL object.
 * @param {object} defaultAcl The owner's default ACL.
 * @param {array} ownerGroups The groups the owner has created and identities that are identified as a group.
 * @param {function} callback The callback to run when the list has been resolved.
 */
const checkAcl = (resource, req, identity, acl, defaultAcl, ownerGroups, callback) => {
  if (acl.private) return processPermissions(require('./private-acl.json'), callback)

  mergePermissions(resource, identity, acl, defaultAcl, ownerGroups, (err, acl) => {
    if (err) return callback(err)
    processPermissions(acl, req, callback)
  })

  //  Not sure if we are going to use caching yet, as we only apply caching to connections
  // getCache(resource, identity, callback, () => {
  //     mergePermissions(resource, identity, acl, defaultAcl, ownerGroups, (err, acl) => {
  //         if(err) return callback(err)
  //         processPermissions(acl, callback)
  //     })
  // })
}

module.exports = checkAcl
