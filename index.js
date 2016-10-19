#!/usr/bin/env node
var colors = require('colors')
var program = require('commander')
var param = process.argv[2]
var commands = [
  'init', //项目初始化
  'dev', //运行本地服务器，并在浏览器打开
  'daily', //daily发布
  'publish', //cdn发布
  'view' //生成最基础的Magix view, 包含html, js 文件
] //所有命令集合
var readline = require('readline')

if (!param || commands.indexOf(param) === -1) {
  console.error('请输入正确的命令（mama init等）'.red)
  return
}

var command = require('./src/' + param)
command()