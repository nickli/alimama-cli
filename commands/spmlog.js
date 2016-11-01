
/**
 * 埋点
 * @type {[type]}
 */
let exec = require('child_process').exec
let fs = require('fs')
let colors = require('colors')
let readline = require('readline')
let util = require('../util/util')
let params = util.parseParams(process.argv)

module.exports = function() {
  let commands = [
    'gulp spmlog'
  ]

  util.execCommand(commands)
}