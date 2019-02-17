# node-acl
[![CircleCI](https://circleci.com/gh/personaspace/node-acl/tree/master.svg?style=svg)](https://circleci.com/gh/personaspace/node-acl/tree/master)
[![Known Vulnerabilities](https://snyk.io/test/github/personaspace/node-acl/badge.svg?targetFile=package.json)](https://snyk.io/test/github/personaspace/node-acl?targetFile=package.json)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

A package for checking resource ACLs on PersonaSpace servers.


Owners can create their own groups, which they can place connections into. They can also define an identity as a group, of which the connections of that identity are reviewed.

Groups are reviewed first, looking for the identity currently accessing a resource or container. If a permission is denied, it is denied unless explicitly granted when reviewing the user permissions. 

This should be cached per visitor unless permissions change and the owner has access to all (so a mechanism should be in place to prevent blocking themselves from the resource) and no json directory or file viewing should be permitted!

```
{
    //  resource level
    "resource": {
        "private": true,    //  quick way to block anything
        "webID": {
            "create": true | false
            "read": [
                {
                    "hasFriend": "webID",
                    "result": false,
                    "enforce": true
                },
                {
                    "dayOfWeek": ["M"],
                    "result": true
                },
                {
                    "dateBetween": ["July 19, 2019", "July 30, 2019"],
                    "result": false
                },
                {
                    "dateAfter|dateBefore": "July 19, 2019",
                    "result": false
                },
                {
                    "timeBetween": [1800, 2200],
                    "result": false
                },
                {
                    "timeAfter|timeBefore": 2300,
                    "result": false
                },
                {
                    "onDomain": "somedomain",
                    "result": false
                },
                {
                    "ip": "172.98.24.11",
                    "result": false
                },
                {
                    "ipRange": ["172.98.24.11", "172.98.24.150"],
                    "result": false
                },
                {
                    "ipSubnet": ["0.0.0.0/8"],
                    "result": false
                },
                {
                    "and": "...",
                    "result": false
                },
                {
                    "or": "...",
                    "result": false
                }
            ],
            "update": "...",
            "delete": "...",
            "crud": "...",
            "perm_create": "...",
            "perm_read": "...",
            "perm_update": "...",
            "perm_delete": "...",
            "perm_crud": "...",
            "full"
        },
        "props": {
            "webID": "..."
        }
    }
}
```