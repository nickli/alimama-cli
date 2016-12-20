module.exports = function(name) {
    return `
var Magix = require('magix')

module.exports = Magix.View.extend({
    tmpl: "@${name}.html",
    init: function() {
        var me = this;
    },
    render: function(e) {
        var me = this;
        me.setVueHTML().then(function() {

        })
    }
});
    `
}