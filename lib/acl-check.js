const path = require('path');
const fs = require('fs');
const mergePermissions = require('./merge-permissions')
const processPermissions = require('./process-permissions')

module.exports = checkAcl;

/**
 * 
 * @param {string} resource The resource address. If pointing to an asset, the resource will be resolved.
 * @param {string} identity The identity of the visitor.
 * @param {object} acl The ACL object.
 * @param {object} defaultAcl The owner's default ACL.
 * @param {array} ownerGroups The groups the owner has created and identities that are identified as a group.
 * @param {function} callback The callback to run when the list has been resolved.
 */
const checkAcl = (resource, identity, acl, defaultAcl, ownerGroups, callback) => {
    if(acl.private) return processPermissions({}, callback)
    getCache(resource, identity, callback, () => {      
        mergePermissions(resource, identity, acl, defaultAcl, ownerGroups, (err, acl) => {
            if(err) return callback(err)
            processPermissions(acl, callback)
        })        
    })
};
