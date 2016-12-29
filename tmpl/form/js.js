module.exports = function(name) {
    return `
var Magix = require('magix')

module.exports = Magix.View.extend({
    tmpl: "@${name}.html",
    init: function() {
        var me = this;
        me.initData()
    },
    initData: function() {
        $.extend(true, this.data, {

        })
    },
    getData: function(e) {
        var d = $.Deferred()
        var me = this
        var urlParams = {}

        me.fetchAll([{
            name: '',
            urlParams: urlParams
        }], function(err, model) {
            var data = model.get('data')
            d.resolve(data)
        })

        return d.promise()
    },
    render: function(e) {
        var me = this;
        me.data = {}
        me.setVueHTML().then(function() {

        })
    }
});
    `
}