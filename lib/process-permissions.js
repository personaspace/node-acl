//  @TODO: import permission middleware

const middleWare = require('./middleware')

module.exports = processPermissions;

const processPermissions = (acl, callback) => {
    const permissions = {}
    Object.keys(acl).forEach(key => {
        if(typeof acl[key] === 'boolean') {
            permissions[key] = acl[key]
        } else {
            let enforced
            let result
            acl[key].forEach(a => {
                if(typeof a.condition !== 'function') return
                if(a.condition.apply(null, a.params || [])) {
                    let newResult = !!a.result
                    result = enforced ? a.enforce ? a.result : result : a.result
                }
                result = !!result
                enforced = enforced ? a.enforce ? true : enforced : false
            })
            permissions[key] = result
        }
    })
    callback(null, permissions)
}