let exec = require('child_process').exec

let util = {
  /**
   * 多行命令行的间隔符号，win用'&'，mac用';'
   * @return {[string]}
   */
  getCommandSplit: function() {
    let split = ';'
    if (process.platform === 'win32') {
      split = "&"
    }

    return split
  },

  /**
   * 解析 mama init --n=cnpm这种参数为 { n: 'cnpm'}
   */
  parseParams: function(argv) {
    let params = {}
    argv.forEach(function(item, i) {
      if (i >= 3) {
        item = item.replace('--', '')
        let arg = item.split('=')
        params[arg[0]] = arg[1] || true
      }
    })

    return params
  },

  /**
   * 执行commandline
   * @return {[type]} [description]
   */
  execCommand: function(commands) {
    let commandSplit = this.getCommandSplit()
    let child = exec(commands.join(commandSplit))

    return new Promise(function(resolve, reject) {
      child.stdout.on('data', function(data) {
        console.log(data)
      })
      child.stderr.on('data', function(data) {
        console.log(data)
      })

      child.on('close', function() {
        resolve()
      })
      child.on('error', function(err) {
        console.log(err)
        reject(err)
      })
    })

  }
}

module.exports = util