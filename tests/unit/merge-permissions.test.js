/* global intern */
const { registerSuite } = intern.getPlugin('interface.object')
const { assert } = intern.getPlugin('chai')

const mergePermissions = require('../../lib/merge-permissions')

const identity = 'https://testuser.personaspace.com'
const resource = '../support/data/public/notes/test'
const acl = require(`${resource}.json`)['@acl']
const defaultAcl = require('../support/default-acl.json')
const groups = require('../support/groups.json')
registerSuite('merge-permissions', {
  'merge permissions ' () {
    const dfd = this.async()
    mergePermissions(resource, identity, acl, defaultAcl, groups, dfd.callback((err, perms) => {
      if (err) throw err
      assert.equal(perms.length, 2)
      const [defs, id] = perms
      assert.equal(Object.keys(defs).length, 11)
      assert.equal(Object.keys(id).length, 3)
    }))
  }
})
