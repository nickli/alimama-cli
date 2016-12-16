'use strict'

let request = require('request')
let fse = require('fs-extra')
let util = require('../util/util')
  // 获取单条请求的接口 http://rap.alibaba-inc.com/mockjsdata/1453/api/list.json
  // 获取整个项目的RAP接口配置 http://rap.alibaba-inc.com/api/queryRAPModel.do?projectId=1453

util.getConfigFile('matfile.js').then(function(path) {
  let matFile = path.join('/') + '/matfile.js'
  let data = fs.readFileSync(matFile, 'utf8')
  let projectId = /projectId\s*:\s*["']?(\d+)["']?/.exec(data)[1]

  request('http://rap.alibaba-inc.com/api/queryRAPModel.do?projectId=' + projectId, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      eval('var modelJSON = ' + JSON.parse(body).modelJSON) //JSON.parse太严格报错，改用eval

      var methodMaps = {
        1: 'GET',
        2: 'POST',
        3: 'PUT',
        4: 'DELETE'
      }
      var models = []
      modelJSON.moduleList.forEach(function(module, i) {
        module.pageList.forEach(function(page, _i) {
          page.actionList.forEach(function(action, __i) {
            var apiUrl = action.requestUrl
            models.push({
              apiDesc: action.name,
              name: action.requestUrl.replace(/\..+?$/, '').split('/').join('_'),
              method: methodMaps[action.requestType],
              url: action.requestUrl
            })
          })
        })
      })

      var tmpl = `var Magix = require('magix')
var Model = require('app/models/model')
var M = Magix.Manager.create(Model);
M.registerModels(${JSON.stringify(models, null, 2)});
return M;`

      util.getConfigFile('manager.js').then(function(path) {
        fse.outputFile(path.join('/') + '/manager.js', tmpl)
      })
    }
  })
}, function(err) {

})