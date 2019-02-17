# node-acl
[![CircleCI](https://circleci.com/gh/personaspace/node-acl/tree/master.svg?style=svg)](https://circleci.com/gh/personaspace/node-acl/tree/master)
[![codecov](https://codecov.io/gh/personaspace/node-acl/branch/master/graph/badge.svg)](https://codecov.io/gh/personaspace/node-acl)
[![Known Vulnerabilities](https://snyk.io/test/github/personaspace/node-acl/badge.svg?targetFile=package.json)](https://snyk.io/test/github/personaspace/node-acl?targetFile=package.json)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A package for checking resource ACLs on PersonaSpace servers.

PersonaSpace uses a powerful ACL implementation that give an owner unparalleled control over which visitors can interact with their data, where visitors can access their data from, and when visitors can access it. `node-acl` use simple boolean values for access to the data and permission middleware that can modify an ACL dynamically based on request data, date, time, etc...

*This package provides only the resolution of the ACLs for a given visitor. The [`node-resource`](https://github.com/personaspace/node-resource) package handles validation of the visitor's access to the data.*

## Installation

Install `node-acl` using npm.
```
npm i @personaspace/node-acl
```

## Usage

```js
//  request is the web request on a PersonaSpace server.
const { resolveAcl } = require('@personaspace/node-acl')
const resource = './ebntly/data/notes/test'
const identity = 'https://ebntly.personaspace.com'
const acl = require(`${resource}.json`)['@acl']
const defaultAcl = require('../support/default-acl.json')
const groups = require('../support/groups.json')

resolveAcl(resourcePath, request, identity, acl, defaultAcl, groups, (resultantPerms) => {
    //  Check resultantPerms
})
```

## Contributing to PersonaSpace
PersonaSpace is a large project and [contributors](https://github.com/personaspace/node-acl/blob/master/CONTRIBUTORS.md) are welcome. Thank you for your support and efforts!

There are a lot of ways to contribute:

* [Create a new issue](https://github.com/personaspace/node-acl/issues/new) to report bugs or request features
* [Fix an issue](https://github.com/personaspace/node-acl/issues)

Be sure to look at [CONTRIBUTING.md](https://github.com/personaspace/node-acl/blob/master/CONTRIBUTING.md).

## License
PersonaSpace is licensed under [the MIT License](https://github.com/personaspace/node-acl/blob/master/LICENSE).
