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
  }
}

module.exports = util