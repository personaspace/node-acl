const handleMiddleware = require('./handle-middleware')
//  @TODO: import permission middleware

const processPermissions = (aclList, req, callback) => {
  const permissions = {}
  aclList.forEach(acl => {
    Object.keys(acl).forEach(key => {
      const perm = acl[key]
      permissions[key] = permissions[key] || {}
      if (typeof perm === 'boolean') {
        permissions[key] = {
          result: permissions[key].enforced ? permissions[key].result : !!perm,
          enforced: permissions[key].enforced ? permissions[key].enforced : false
        }
        return
      }
      if (typeof perm === 'object') {
        handleMiddleware(req, permissions, key, perm)
      } else {
        permissions[key] = {
          result: permissions[key].enforced ? permissions[key].result : !!perm,
          enforced: permissions[key].enforced ? permissions[key].enforced : false
        }
      }
    })
  })
  const resultantPermissions = {}
  Object.keys(permissions).forEach(key => { resultantPermissions[key] = permissions[key].result })

  callback(null, resultantPermissions)
}

module.exports = processPermissions
