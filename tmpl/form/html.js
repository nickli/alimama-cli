module.exports = function(name) {
    return `
<div class="main-wrap">
    <h3 class="mb20">标题</h3>
    <div class="form">
        <div class="form-field">
            <label class="lb">姓名：</label>
            <input type="text" class="input">
        </div>
        <div class="form-field">
            <label class="lb">年龄：</label>
            <input type="text" class="input">
        </div>
        <div class="form-field">
            <label class="lb">性别：</label>
            <input type="text" class="input">
        </div>
        <div class="form-field">
            <b class="btn btn-brand">提交</b>
        </div>
    </div>
</div>

    `
}