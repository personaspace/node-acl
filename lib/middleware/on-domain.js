module.exports = {
    middleware: (req, domain) => {
        return req.headers.host === domain
    }
}
