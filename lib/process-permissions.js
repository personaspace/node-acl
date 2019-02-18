const { processMiddleware } = require('@personaspace/server-acl-middleware')
const processPermissions = (aclList, req, middleware, callback) => {
  const permissions = {}
  aclList.forEach(acl => {
    Object.keys(acl).forEach(key => {
      const perm = acl[key]
      permissions[key] = permissions[key] || {}
      if (typeof perm === 'boolean') {
        permissions[key] = {
          result: permissions[key].enforce ? permissions[key].result : !!perm,
          enforced: permissions[key].enforce ? permissions[key].enforce : false
        }
        return
      }
      if (typeof perm === 'object') {
        processMiddleware(req, permissions, key, perm, middleware)
      } else {
        permissions[key] = {
          result: permissions[key].enforce ? permissions[key].result : !!perm,
          enforced: permissions[key].enforce ? permissions[key].enforce : false
        }
      }
    })
  })
  const resultantPermissions = {}
  Object.keys(permissions).forEach(key => { resultantPermissions[key] = permissions[key].result })

  callback(null, resultantPermissions)
}

module.exports = processPermissions
