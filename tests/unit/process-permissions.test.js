/* global intern */
const { registerSuite } = intern.getPlugin('interface.object')
const { assert } = intern.getPlugin('chai')

const processPermissions = require('../../lib/process-permissions')

const simpleACL = require('../support/simple-acl-list.json')
const complexACL = require('../support/complex-acl-list.json')
registerSuite('process-permissions', {
  'process simple ACL test' () {
    const dfd = this.async()
    processPermissions(simpleACL, {}, dfd.callback((err, perms) => {
      if (err) throw err
      assert.isTrue(perms.create)
      assert.isTrue(perms.read)
      assert.isTrue(perms.update)
      assert.isFalse(perms.delete)
      assert.isFalse(perms.crud)
      assert.isFalse(perms.perm_create)
      assert.isTrue(perms.perm_read)
      assert.isFalse(perms.perm_update)
      assert.isFalse(perms.perm_delete)
      assert.isFalse(perms.perm_crud)
      assert.isFalse(perms.full)
    }))
  },
  'process complex ACL test (BLOCK DOMAIN CREATE:OKAY)' () {
    const dfd = this.async()
    processPermissions(complexACL, { headers: { host: 'example.com' } }, dfd.callback((err, perms) => {
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
  },
  'process complex ACL test (BLOCK DOMAIN CREATE:NOTOKAY)' () {
    const dfd = this.async()
    processPermissions(complexACL, { headers: { host: 'test.example.com' } }, dfd.callback((err, perms) => {
      if (err) throw err
      assert.isTrue(perms.create)
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
