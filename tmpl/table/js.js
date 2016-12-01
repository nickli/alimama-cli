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
            value: 1,
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
    },

    //分页组件事件
    changePager: function(e) {
        console.log('pagination')
    },

    //下拉组件事件
    dropdownChange: function(e) {
        console.log('dropdown')
    },

    //列表搜索柜
    search: function(e) {
        console.log('search')
    }
});
    `
}