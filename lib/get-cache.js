const fs = require('fs')
const path = require('path')
module.exports = getCache;

const getCache = (resource, identity, callback, notFound) => {
    const cachePath = resource.replace(path.extname(resource), ".cache.json")
    fs.access(cachePath, (err) => {
        if(err) notFound()
        const data = require(cachePath)
        if(!data[identity]) notFound()
        callback(null, data[identity]) 
    })
}