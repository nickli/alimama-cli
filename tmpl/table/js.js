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
        me.data = {
            dropdownlist: [{
                id: 1,
                name: '下拉1'
            }, {
                id: 2,
                name: '下拉2'
            }],
            list: [{
                id: 11,
                name: 'name11',
                value: '22'
            }, {
                id: 22,
                name: 'name22',
                value: '33'
            }],
            count: 100,
            pageNo: 1,
            pageSize: 30
        }
        me.setVueHTML().then(function() {

        })
    }
});
    `
}