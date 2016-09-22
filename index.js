#!/usr/bin/env node

var program = require('commander')

var param = process.argv[2]
param = param || 'init' //默认为init命令
var command = require('./src/' + param)


command()