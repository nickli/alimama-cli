/**
 * 生成最基础的Magix view, 包含html, js 文件
 * @type {[type]}
 */
var exec = require('child_process').exec
var fs = require('fs')
var colors = require('colors')
var readline = require('readline')
var util = require('../util/util')
var params = util.parseParams(process.argv)

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = function() {
  rl.question('【请输入完整viewName】：'.grey, function(name) {
    var splits = name.split('/')
    var fileName = splits[splits.length - 1]

    fs.writeFile('tmpl/' + name + '.js', name, 'utf8', function() {
      fs.writeFile('tmpl/' + name + '.html', name, 'utf8', function() {
        console.log('【文件创建完毕】'.green)
      })
    })

    rl.close()
  })
}