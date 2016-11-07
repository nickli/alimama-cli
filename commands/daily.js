'use strict'
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
    'npm run daily' // npm run xxx 可以在不安装全局命令的情况下执行gulp daily之类，配置在package.json的scripts里
  ]

  util.execCommand(commands)
}