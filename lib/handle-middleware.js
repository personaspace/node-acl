const middleware = require('./middleware')

const handleMiddleware = (req, permissions, key, permObjs, asArray = false, i = 0) => {
    permissions[key] = permissions[key] || {
        result: false,
        enforced: false
    }
    let result, enforced, p = permissions[key]
    if(Array.isArray(permObjs) && !asArray) {
        handleMiddleware(req, permissions, key, permObjs, true, i)    
    } else if(asArray) {
        let perm = permObjs[i]
        if(typeof perm.middleware === 'string') {
            const mw = middleware[perm.middleware]
            if(!mw || typeof mw.middleware !== 'function') throw new Error(`${perm.middleware} is not valid permissions middleware.`)
            if(mw.middleware.apply(null, [req, ...(perm.params || [])])) {
                let newResult = !!perm.result
                result = !!(p.enforced ? perm.enforce ? newResult : p.result : newResult)
                enforced = p.enforced ? true : perm.enforce ? true : false
                permissions[key] = {result, enforced}
            }
            if(i < permObjs.length - 1) {
                handleMiddleware(req, permissions, key, permObjs, true, ++i)
            }
        }
    } else if(typeof permObjs === 'object') {
        let perm = permObjs
        if(typeof perm.middleware === 'string') {
            const mw = middleware[perm.middleware]
            if(!mw || typeof mw.middleware !== 'function') throw new Error(`${perm.middleware} is not valid permissions middleware.`)
            if(mw.middleware.apply(null, [req, ...(perm.params || [])])) {
                let newResult = !!perm.result
                result = !!(p.enforced ? perm.enforce ? newResult : p.result : newResult)
                enforced = p.enforced ? true : perm.enforce ? true : false
                permissions[key] = {result, enforced}
            }
            if(i !== permObjs.length -1) {
                handleMiddleware(req, permissions, key, permObjs, true, ++i)
            }
        }
    }
}

module.exports = handleMiddleware