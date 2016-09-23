#!/usr/bin/env node
var colors = require('colors')
var program = require('commander')
var param = process.argv[2]
var commands = ['init'] //所有命令集合
var readline = require('readline')


if (!param || commands.indexOf(param) === -1) {
  console.error('请输入正确的命令（mama init等）'.red)
  return
}

var command = require('./src/' + param)
command()