#!/usr/bin/env node
var colors = require('colors')
var program = require('commander')
var param = process.argv[2]
var commands = ['init'] //所有命令集合

if (!param || commands.indexOf(param) === -1) {
  console.log('请输入正确的命令（mama init等）'.red)
  return
}
// param = param || 'init' //默认为init命令
var command = require('./src/' + param)
command()