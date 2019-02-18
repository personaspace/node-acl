/* global intern */
const { registerSuite } = intern.getPlugin('interface.object')
const { assert } = intern.getPlugin('chai')

const { middleware } = require('@personaspace/server-acl-middleware')
const aclCheck = require('../../lib/resolve-acl')
const identity = 'https://testuser.personaspace.com'
const resource = '../support/data/public/notes/test'
const acl = require(`${resource}.json`)['@acl']
const defaultAcl = require('../support/default-acl.json')
const groups = require('../support/groups.json')
registerSuite('acl-check', {
  'resolve-acl (Bad identity on server)' () {
    const dfd = this.async()
    aclCheck(resource, { headers: { host: 'example.com' } }, identity, acl, defaultAcl, groups, middleware, dfd.callback((err, perms) => {
      if (err) throw err
      assert.isTrue(perms.create)
      assert.isTrue(perms.read)
      assert.isTrue(perms.update)
      assert.isFalse(perms.delete)
      assert.isFalse(perms.crud)
      assert.isFalse(perms.perm_create)
      assert.isFalse(perms.perm_read)
      assert.isFalse(perms.perm_update)
      assert.isFalse(perms.perm_delete)
      assert.isFalse(perms.perm_crud)
      assert.isFalse(perms.full)
    }))
  },
  'resolve-acl (Bad identity on bad server)' () {
    const dfd = this.async()
    aclCheck(resource, { headers: { host: 'test.example.com' } }, identity, acl, defaultAcl, groups, middleware, dfd.callback((err, perms) => {
      if (err) throw err
      assert.isTrue(perms.create)
      assert.isTrue(perms.read)
      assert.isTrue(perms.update)
      assert.isFalse(perms.delete)
      assert.isFalse(perms.crud)
      assert.isFalse(perms.perm_create)
      assert.isFalse(perms.perm_read)
      assert.isFalse(perms.perm_update)
      assert.isFalse(perms.perm_delete)
      assert.isFalse(perms.perm_crud)
      assert.isFalse(perms.full)
    }))
  },
  'resolve-acl (Good identity on bad server)' () {
    const dfd = this.async()
    aclCheck(resource, { headers: { host: 'test.example.com' } }, 'https://ebntly.personaspace.com', acl, defaultAcl, groups, middleware, dfd.callback((err, perms) => {
      if (err) throw err
      assert.isFalse(perms.create)
      assert.isTrue(perms.read)
      assert.isFalse(perms.update)
      assert.isFalse(perms.delete)
      assert.isFalse(perms.crud)
      assert.isFalse(perms.perm_create)
      assert.isFalse(perms.perm_read)
      assert.isFalse(perms.perm_update)
      assert.isFalse(perms.perm_delete)
      assert.isFalse(perms.perm_crud)
      assert.isFalse(perms.full)
    }))
  },
  'resolve-acl (Good identity on server)' () {
    const dfd = this.async()
    aclCheck(resource, { headers: { host: 'example.com' } }, 'https://ebntly.personaspace.com', acl, defaultAcl, groups, middleware, dfd.callback((err, perms) => {
      if (err) throw err
      assert.isFalse(perms.create)
      assert.isTrue(perms.read)
      assert.isFalse(perms.update)
      assert.isFalse(perms.delete)
      assert.isFalse(perms.crud)
      assert.isFalse(perms.perm_create)
      assert.isTrue(perms.perm_read)
      assert.isFalse(perms.perm_update)
      assert.isFalse(perms.perm_delete)
      assert.isFalse(perms.perm_crud)
      assert.isFalse(perms.full)
    }))
  }
})
