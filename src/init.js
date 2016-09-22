/**
 * 项目初始化命令
 * @params
 */
var exec = require('child_process').exec
var prompt = require('prompt')
var colors = require('colors')

module.exports = function() {
  var commandSplit = ';'

  //
  prompt.start()
  prompt.get(['projectGit'], function(err, result) {

    var commands = [
      'git init',
      'git remote add origin git@gitlab.alibaba-inc.com:thx/scaffold.git',
      'git pull origin master',
      'git remote set-url origin ' + result.projectGit,
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
      console.log('项目初始化完成'.green)
    })

  })
}