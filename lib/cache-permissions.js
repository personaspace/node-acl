const fs = require('fs')
const path = require('path')
module.exports = cachePermissions;

const cachePermissions = (resource, identity, permissions, callback) => {
    const cachePath = resource.replace(path.extname(resource), ".cache.json")
    fs.access(cachePath, (err) => {
        if(err) {
            const newData = {}
            newData[identity] = permissions
            return fs.writeFile(cachePath, JSON.stringify(newData), (err) => {
                if(err) return callback(err)

                callback(null, permissions)
            })
        }
        
        const data = require(cachePath)
        data[identity] = permissions
        return fs.writeFile(cachePath, JSON.stringify(data), (err) => {
            if(err) return callback(err)

            callback(null, permissions)
        })
    })
}