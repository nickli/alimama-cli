var util = {
  /**
   * 多行命令行的间隔符号，win用'&'，mac用';'
   * @return {[string]}
   */
  getCommandSplit: function() {
    var split = ';'
    if (process.platform === 'win32') {
      split = "&"
    }

    return split
  },

  /**
   * 解析 mama init --n=cnpm这种参数为 { n: 'cnpm'}
   */
  parseParams: function(argv) {
    var params = {}
    argv.forEach(function(item, i) {
      if (i >= 3) {
        item = item.replace('--', '')
        var arg = item.split('=')
        params[arg[0]] = arg[1]
      }
    })

    return params
  }

}

module.exports = util