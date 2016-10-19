/**
 * 项目初始化命令
 * @params
 */
var exec = require('child_process').exec
var fs = require('fs')
var colors = require('colors')
var readline = require('readline')
var util = require('../util/util')
var params = util.parseParams(process.argv)

module.exports = function() {
  var commandSplit = util.getCommandSplit()

  var execute = function() {
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    /*
      根据项目名称创建项目目录，并clone脚手架代码到本地，然后更改git remote为项目git地址
     */
    rl.question('【请输入项目名称】：'.grey, function(name) {
      rl.question('【请输入gitlab上创建好的仓库git地址】：'.grey, function(gitUrl) {

        if (!gitUrl) {
          console.error('项目地址不能为空'.red)
          rl.close()
          return
        }

        if (!name) {
          console.error('项目名称不能为空'.red)
          rl.close()
          return
        }

        var commands = [
          'mkdir ' + name,
          'cd ' + name,
          'git init',
          'git remote add origin git@gitlab.alibaba-inc.com:thx/scaffold.git',
          'git pull origin master',
          'git remote set-url origin ' + gitUrl,
          'git push origin master',
          'echo 【开始安装项目相关的npm包，请稍等...】'
        ]

        //默认用npm install安装包，可以配置mama init --n=cnpm 来选择cnpm install
        var npmInstallCommand = 'npm install'
        if (params.n) {
          npmInstallCommand = params.n + ' install'
        }
        commands.push(npmInstallCommand)

        //
        var child = exec(commands.join(commandSplit))
        child.stdout.on('data', function(data) {
          console.log(data)
        })
        child.stderr.on('data', function(data) {
          console.log(data)
        })
        child.on('close', function() {
          console.log('【项目初始化完成】'.green)
        })
        child.on('error', function(err) {
          console.log(err)
        })

        rl.close()

      })
    })
  }

  execute()

}