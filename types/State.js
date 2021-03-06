const pipe = require('value-pipe')
const State = require('inu/state')

const pathModule = require('../lib/pathModule')
const normalizeNeeds = require('../lib/normalizeNeeds')
const scopeModule = require('../lib/scopeModule')

module.exports = {
  transform: pipe(
    pathModule,
    normalizeNeeds,
    scopeModule,
    State
  ),
  glob: '**/state.js'
}
