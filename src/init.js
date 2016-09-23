/**
 * 项目初始化命令
 * @params
 */
var exec = require('child_process').exec
var fs = require('fs')
  // var prompt = require('prompt')
var colors = require('colors')
var readline = require('readline')
var util = require('../util/util')

module.exports = function() {
  var commandSplit = util.getCommandSplit()

  // fs.stat('./.git', function(err, stats) {
  //   if (stats && stats.isDirectory()) { //已经存在 .git文件夹，说明已经初始化过
  //     console.error('项目已经初始化过，请不要重复初始化'.red)
  //   } else {
  //     execute()
  //   }
  // })

  var execute = function() {
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    rl.question('['+ '请输入项目名称'.grey +']: ', function(name) {
      rl.question('['+ '请输入gitlab上创建好的仓库git地址'.grey +']: ', function(gitUrl) {

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
          'git push origin master'
        ]
        var child = exec(commands.join(commandSplit))

        child.stdout.on('data', function(data) {
          console.log(data)
        })
        child.stderr.on('data', function(data) {
          console.log(data)
        })
        child.on('close', function() {
          console.log('['+ '项目初始化完成'.green +']')
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