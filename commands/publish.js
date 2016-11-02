
/**
 * 项目运行命令，包含启动服务器，watch [tpl-->src]
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
    'npm run publish'
  ]

  util.execCommand(commands)
}