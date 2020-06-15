const BaseController = require('./base');


class HomeController extends BaseController {
    // 主页面的骨架
    async index() {
        // this.ctx.app.cache.time = 12
        // console.log(this.ctx.app.cache);
        var staff_name = this.ctx.session.userinfo.staff_name
        await this.ctx.render('admin/home/index.html', { staff_name: staff_name })
    }
    async welcome() {
        await this.ctx.render('admin/home/welcome.html')
    }
}
module.exports = HomeController