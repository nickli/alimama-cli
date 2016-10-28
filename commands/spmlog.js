
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
  let commandSplit = util.getCommandSplit()
  let commands = [
    'gulp spmlog'
  ]

  //
  let child = exec(commands.join(commandSplit))
  child.stdout.on('data', function(data) {
    console.log(data)
  })
  child.stderr.on('data', function(data) {
    console.log(data)
  })
  child.on('error', function(err) {
    console.log(err)
  })
}