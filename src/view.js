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
  rl.question('【请输入完整viewName】：'.yellow, function(name) {
    var splits = name.split('/')
    var fileName = splits[splits.length - 1]
    var jsFile = 'tmpl/' + name + '.js'
    var htmlFile = 'tmpl/' + name + '.html'

    fse.outputFile(jsFile, jsTplFn(fileName), 'utf8', function(err) {
      if (err) {
        return console.log(err)
      }
      console.log('[File created] '.green + jsFile)

      fse.outputFile(htmlFile, htmlTplFn(fileName), 'utf8', function(_err) {
        if (_err) {
          return console.log(_err)
        }
        console.log('[File created] '.green + htmlFile)
      })
    })

    rl.close()
  })
}