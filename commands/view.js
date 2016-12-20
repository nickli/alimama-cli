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
const inquirer = require('inquirer')

module.exports = function() {
  let questions = [{
    type: 'list',
    name: 'theme',
    message: '【请选择view的模板类型】:',
    choices: [{
      name: 'blank: 基础空白页',
      value: 'blank'
    }, {
      name: 'table: 包含表格的列表页',
      value: 'table'
    }, {
      name: 'form : 基础表单提交页面',
      value: 'form'
    }]
  }, {
    type: 'input',
    name: 'viewpath',
    message: '【请输入view的生成path，从当前目录算起】:',
    default: function() {
      // return 'Doe';
    },
    validate: function(value) {
      let viewpath = value.trim()

      if (!viewpath) {
        return '请输入正确的path';
      }
      return true
    }
  }]


  inquirer.prompt(questions).then(function(answers) {
    let viewpath = answers.viewpath.trim()
    let htmlTplFn = require('../tmpl/' + answers.theme + '/html.js') //基础模板
    let jsTplFn = require('../tmpl/' + answers.theme + '/js.js') //基础js
    let splits = viewpath.split('/')
    let fileName = splits[splits.length - 1]
    let jsFile = viewpath + '.js'
    let htmlFile = viewpath + '.html'

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

  })

}