'use strict'
/**
 * 项目初始化命令
 * @params
 */
let exec = require('child_process').exec
let fs = require('fs')
let colors = require('colors')
  // let readline = require('readline')
let util = require('../util/util')
let params = util.parseParams(process.argv)
let syncModels = require('./models')
const inquirer = require('inquirer')

module.exports = function() {

  let questions = [{
    type: 'list',
    name: 'scaffoldGitUrl',
    message: '【请选择脚手架类型】:',
    choices: [{
      name: 'scaffold : 适用于bp后台管理系统类型的脚手架',
      value: 'git@gitlab.alibaba-inc.com:thx/scaffold.git'
    }, {
      name: 'minisite : 适用于bp前台minisite类型的脚手架',
      value: 'git@gitlab.alibaba-inc.com:mm/minisite-scaffold.git'
    }]
  }, {
    type: 'input',
    name: 'gitUrl',
    message: '【请输入项目的git仓库地址】:',
    validate: function(value) {
      if (!value.trim()) {
        return '请输入项目git仓库地址'
      }

      let gitUrl = parseGitUrl(value)
      let name = gitUrl.name
      let group = gitUrl.group

      if (!name || !group) {
        return '地址不合法，请重新输入';
      }
      return true
    }
  }, {
    type: 'input',
    name: 'projectId',
    message: '【请输入RAP的projectId，选填】:'
  }, {
    type: 'input',
    name: 'logkey',
    message: '【请输入黄金令箭logkey，选填】:'
  }]

  //读取matfile.js，写入rap的projectId
  let setRapProjectId = function(projectId, name) {
    let fileName = name + '/matfile.js'
    let data = fs.readFileSync(fileName, 'utf8')
    let result = data.replace(/projectId\s*\:\s*\'\d+\'/, "projectId: '" + projectId + "'")

    fs.writeFileSync(fileName, result, 'utf8')
  }

  //设置项目名称
  let setNameConfig = function(group, name) {
    let indexFile = name + '/index.html'
    let data = fs.readFileSync(indexFile, 'utf8')
    let result = data.replace(/thx\/scaffold/g, group + '/' + name)
    result = result.replace(/\<title\>.*\<\/title\>/, '<title>' + name + '</title>') //更改title
    fs.writeFileSync(indexFile, result, 'utf8')

    let packageFile = name + '/package.json'
    let packageData = fs.readFileSync(packageFile, 'utf8')
    let packageResult = packageData.replace(/\"name\"\s*\:\s*\".*\"/, '"name": "' + name + '"')
    fs.writeFileSync(packageFile, packageResult, 'utf8')
  }


  //读取gulpfile.js更改spmlog的logkey
  let setSpmLogkey = function(logkey, name) {
    let fileName = name + '/gulpfile.js'
    let data = fs.readFileSync(fileName, 'utf8')
    let result = data.replace(/logkey\s*\:\s*\'.*\'/, "logkey: '" + logkey + "'")

    fs.writeFileSync(fileName, result, 'utf8')
  }

  //解析giturl提取项目名及分组名
  let parseGitUrl = function(gitUrl) {
    gitUrl = gitUrl.trim()
    let gitUrlMatchResult = gitUrl.match(/^.+[\:\/](.+)\/(.+)\.git\s*$/)
    let name = gitUrlMatchResult && gitUrlMatchResult[2] || ''
    let group = gitUrlMatchResult && gitUrlMatchResult[1] || ''
    return {
      name: name,
      group: group
    }
  }

  //判断下是否是已经init过的项目，根据是看下有没有combine-tool-config.js文件
  util.getConfigFile('combine-tool-config.js').then(function() {
    console.log('该项目已经初始化过，无须再init，请执行mama dev进行开发'.red)
  }, function(err) {
    // 根据项目名称创建项目目录，并clone脚手架代码到本地，然后更改git remote为项目git地址
    inquirer.prompt(questions).then(function(answers) {
      let gitUrl = answers.gitUrl.trim()
      let name = parseGitUrl(gitUrl).name
      let group = parseGitUrl(gitUrl).group
      let commands = [
        'mkdir ' + name,
        'cd ' + name,
        'git init',
        'git remote add origin ' + answers.scaffoldGitUrl,
        'git pull origin master',
        'git remote set-url origin ' + gitUrl
      ]

      //执行clone scaffold脚手架仓库命令
      util.execCommand(commands).then(function() {
        setNameConfig(group, name)

        if (answers.projectId) {
          setRapProjectId(answers.projectId, name)
        }
        if (answers.logkey) {
          setSpmLogkey(answers.logkey, name)
        }

        //设置完projectId，logkey之后，提交代码并开始安装npm包
        let lastCommands = [
          'cd ' + name, //要进入目录才行
          'git add . -A',
          'git commit -m "first commit by alimama-cli"',
          'git push origin master',
          'echo 【开始安装项目相关的npm包，请稍候...】'
        ]

        //默认用npm install安装包，可以配置mama init --n=tnpm 来选择tnpm install
        let npmInstallCommand = 'npm install'
        if (params.n) {
          npmInstallCommand = params.n + ' install'
        }

        lastCommands.push(npmInstallCommand)

        if (answers.projectId) {
          //同步rap上的接口到本地manager.js
          syncModels(name).then(function() {
            util.execCommand(lastCommands).then(function() {
              console.log('【项目初始化完成】'.green)
            })
          }, function(err) {
            console.log('同步rap接口失败，可能您的projectId没有设置正确，亦或您的rap接口url格式有误'.red)
          })
        } else { //没填projectId，则不执行同步rap的models
          util.execCommand(lastCommands).then(function() {
            console.log('【项目初始化完成】'.green)
          })
        }

      })
    })
  })

}