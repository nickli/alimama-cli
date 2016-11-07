'use strict'
/**
 * 生成最基础的Magix view, 包含html, js 文件
 * @type {[type]}
 */
let exec = require('child_process').exec
let fs = require('fs')
let colors = require('colors')
let readline = require('readline')
let util = require('../util/util')
let params = util.parseParams(process.argv)
let fse = require('fs-extra')
let htmlTplFn = require('../tmpl/html.js') //基础模板
let jsTplFn = require('../tmpl/js.js') //基础js
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


// if (params.t) {
//   htmlTplFn = require('../tmpl/'+ params.t +'/html.js') //基础模板
//   jsTplFn = require('../tmpl/'+ params.t +'/js.js') //基础js
// }

module.exports = function() {

  //如果传入--t=table，则加载table的模板
  for (let k in params) {
    try {
      htmlTplFn = require('../tmpl/' + k + '/html.js') //基础模板
      jsTplFn = require('../tmpl/' + k + '/js.js') //基础js
    } catch (err) {
      console.log('不存在该模板，请确认模板名是否正确'.red)
      return rl.close()
    }
    break;
  }

  rl.question('【请输入完整viewName】：'.yellow, function(name) {
    let splits = name.split('/')
    let fileName = splits[splits.length - 1]
    let jsFile = 'tmpl/' + name + '.js'
    let htmlFile = 'tmpl/' + name + '.html'

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