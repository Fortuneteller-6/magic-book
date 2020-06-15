const { Controller } = require('egg');


class BaseController extends Controller {
    // 请求失败的提示页面
    async fail(msg, url) {
            var msg = msg || '请求失败'
            await this.ctx.render('admin/common/fail.html', { msg, url })
        }
        // 请求成功的提示页面
    async success(msg, url) {
        var msg = msg || '请求成功'
        await this.ctx.render('admin/common/success.html', { msg, url })
    }

}
module.exports = BaseController