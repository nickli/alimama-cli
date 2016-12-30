#!/usr/bin/env node
var colors = require('colors')
var param = process.argv[2]
var jsonfile = require('jsonfile')

//所有命令集合
var commands = [
  'init', //项目初始化
  'dev', //运行本地服务器，并在浏览器打开
  'daily', //daily发布
  'publish', //cdn发布
  'view', //生成最基础的Magix view, 包含html, js 文件
  'spmlog', //spm埋点
  'models' //从rap同步接口到本地manager.js
]

//打印版本号
if (param === '-v' || param === '--version') {
  jsonfile.readFile('./package.json', function(err, obj) {
    console.log(obj.version)
  })
  return
}

//
if (!param || commands.indexOf(param) === -1) {
  console.error('请输入正确的命令（mama init等）'.red)
  return
}

var command = require('./commands/' + param)
command()