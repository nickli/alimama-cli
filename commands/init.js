/**
 * 项目初始化命令
 * @params
 */
let exec = require('child_process').exec
let fs = require('fs')
let colors = require('colors')
let readline = require('readline')
let util = require('../util/util')
let params = util.parseParams(process.argv)

module.exports = function() {
  let commandSplit = util.getCommandSplit()

  let execute = function() {
    let rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })

    /*
      根据项目名称创建项目目录，并clone脚手架代码到本地，然后更改git remote为项目git地址
     */
    rl.question('【请输入项目名称】：'.yellow, function(name) {
      rl.question('【请输入gitlab上创建好的仓库git地址】：'.yellow, function(gitUrl) {
        rl.question('【请输入RAP上建好的项目的projectId,非必填】：'.yellow, function(projectId) {
          rl.question('【请输入埋点用的黄金令箭logkey,非必填】：'.yellow, function(logkey) {

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

            let commands = [
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
            let npmInstallCommand = 'npm install'
            if (params.n) {
              npmInstallCommand = params.n + ' install'
            }
            commands.push(npmInstallCommand)

            //
            let child = exec(commands.join(commandSplit))
            child.stdout.on('data', function(data) {
              console.log(data)
            })
            child.stderr.on('data', function(data) {
              console.log(data)
            })
            child.on('close', function() {
              if (projectId) {
                setRapProjectId(projectId, name)
              }
              if (logkey) {
                setSpmLogkey(logkey, name)
              }
              console.log('【项目初始化完成】'.green)
            })
            child.on('error', function(err) {
              console.log(err)
            })

            rl.close()
          })
        })
      })
    })
  }

  //读取index.html，写入rap的projectId
  let setRapProjectId = function(projectId, name) {
    let fileName = name + '/index.html'
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) return console.log(err)

      let result = data.replace(/http\:\/\/rap\.alibaba\-inc\.com\/rap\.plugin\.js\?projectId\=\d+/, 'http://rap.alibaba-inc.com/rap.plugin.js?projectId=' + projectId)

      fs.writeFile(fileName, result, 'utf8', function(_err) {
        if (_err) return console.log(_err)
      })

    })
  }

  //读取gulpfile.js更改spmlog的logkey
  let setSpmLogkey = function(logkey, name) {
    let fileName = name + '/gulpfile.js'
    fs.readFile(fileName, 'utf8', function(err, data) {
      if (err) return console.log(err)

      let result = data.replace(/logkey\s*\:\s*\'.+\'/, "logkey: '" + logkey + "'")

      fs.writeFile(fileName, result, 'utf8', function(_err) {
        if (_err) return console.log(_err)
      })
    })
  }

  execute()
}