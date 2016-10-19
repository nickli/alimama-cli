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
var fse = require('fs-extra')
var htmlTplFn = require('../tmpl/html.js')
var jsTplFn = require('../tmpl/js.js')
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

module.exports = function() {
  rl.question('【请输入完整viewName】：'.grey, function(name) {
    var splits = name.split('/')
    var fileName = splits[splits.length - 1]

    fse.outputFile('tmpl/' + name + '.js', jsTplFn(fileName), 'utf8', function() {
      fse.outputFile('tmpl/' + name + '.html', htmlTplFn(fileName), 'utf8', function() {
        console.log('【文件创建完毕】'.green)
      })
    })

    rl.close()
  })
}