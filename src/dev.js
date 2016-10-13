
/**
 * 项目运行命令，包含启动服务器，watch [tpl-->src]
 * @type {[type]}
 */
var exec = require('child_process').exec
var fs = require('fs')
var colors = require('colors')
var readline = require('readline')
var util = require('../util/util')
var params = util.parseParams(process.argv)

module.exports = function() {
  var commandSplit = util.getCommandSplit()
  var commands = [
    'gulp dev'
  ]

  //
  var child = exec(commands.join(commandSplit))
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