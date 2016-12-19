'use strict'

let request = require('request')
let fse = require('fs-extra')
let fs = require('fs')
let util = require('../util/util')
  // 获取单条请求的接口 http://rap.alibaba-inc.com/mockjsdata/1453/api/list.json
  // 获取整个项目的RAP接口配置 http://rap.alibaba-inc.com/api/queryRAPModel.do?projectId=1453

const RAP_MODEL_QUERY_URL = 'http://rap.alibaba-inc.com/api/queryRAPModel.do'
const MANAGER_TEMPLATE = `var Magix = require('magix')
var Model = require('app/models/model')
var M = Magix.Manager.create(Model);
M.registerModels(${JSON.stringify(models, null, 2)});
return M;`
const METHOD_MAPS = {
  1: 'GET',
  2: 'POST',
  3: 'PUT',
  4: 'DELETE'
}

module.exports = function() {
  util.getConfigFile('matfile.js').then(function(path) {
    let matFile = path.join('/') + '/matfile.js'
    let data = fs.readFileSync(matFile, 'utf8')
    let projectId = /projectId\s*:\s*["']?(\d+)["']?/.exec(data)[1]

    request(RAP_MODEL_QUERY_URL + '?projectId=' + projectId, function(error, response, body) {
      if (!error && response.statusCode == 200) {

        var modelJSON = function() {
          return eval('(' + JSON.parse(body).modelJSON + ')')
        }()

        var models = []
        modelJSON.moduleList.forEach(function(module, i) {
          module.pageList.forEach(function(page, _i) {
            page.actionList.forEach(function(action, __i) {
              var apiUrl = action.requestUrl
              var urlSplit = action.requestUrl.replace(/\..+?$/, '').split('/')

              for (var i = 0; i < urlSplit.length; i++) {
                if (urlSplit[i] === '') {
                  urlSplit.splice(i, 1)
                  i--
                }
              }

              models.push({
                apiDesc: action.name,
                name: urlSplit.join('_'),
                method: METHOD_MAPS[action.requestType],
                url: action.requestUrl
              })
            })
          })
        })

        util.getConfigFile('gulpfile.js').then(function(path) {
          fse.outputFile(path.join('/') + '/src/app/models/manager.js', MANAGER_TEMPLATE)
          console.log('接口文件manager.js文件创建完毕\n文件目录src/app/models/mamager.js'.green)
        })
      }
    })
  }, function(err) {
    console.log('找不到matfile.js文件'.red)
  })
}