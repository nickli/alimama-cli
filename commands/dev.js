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

  //判断目录下有没有node_modules，如果没有则先执行npm install安装包
  util.getConfigFile('node_modules').then(function() {
    execDev()
  }, function(err) { //不存在 node_modules
    util.getConfigFile('package.json').then(function(path) { //根据package.json来确定npm install的路径
      //默认用npm install安装包，可以配置mama init --n=cnpm 来选择cnpm install
      let npmInstallCommand = 'npm install'
      if (params.n) {
        npmInstallCommand = params.n + ' install'
      }
      execDev(['cd ' + path.join('/'), npmInstallCommand])
    })
  })

  //启动mat反向代理服务器
  let _matfile = 'matfile.js'
  let execDev = function(commands) {
    commands = commands || []
    util.getConfigFile(_matfile).then(function(path) {
      let matFile = path.join('/') + '/' + _matfile
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

      commands.push(command)
      util.execCommand(commands)
    }, function(err) {
      console.log((_matfile + '文件不存在，请在项目文件夹内再执行该命令').red)
    })
  }


}