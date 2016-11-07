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
let matFile = 'matfile.js'

module.exports = function() {
  let command = 'npm run mat-rap'

  //设置端口，把matfile.js里的port改了
  if (params.port && params.port !== true) {
    let data = fs.readFileSync(matFile, 'utf8')
    let result = data.replace(/port\s*\:\s*\'\d+\'/, "port: '" + params.port + "'")

    fs.writeFileSync(matFile, result, 'utf8')
  }

  //切换至daily环境
  if (params.daily) {
    command = 'npm run mat-daily'

    //mama dev --daily=123.32.43.55 ，把matfile.js里的proxyPass改了
    if (params.daily !== true) {
      let data = fs.readFileSync(matFile, 'utf8')
      let result = data.replace(/proxyPass\s*\:\s*\'.+\'/, "proxyPass: '" + params.daily + "'")

      fs.writeFileSync(matFile, result, 'utf8')
    }
  }

  util.execCommand([command])
}