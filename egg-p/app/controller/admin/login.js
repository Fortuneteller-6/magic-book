const BaseController = require('./base');


class LoginController extends BaseController {
    // 登录页面
    async login() {
            await this.ctx.render('admin/login.html')
        }
        // 清楚缓存并重新定向
    async logout() {
            this.ctx.session = null
            this.ctx.redirect('/admin/login')
        }
        // 请求登录
    async dologin() {
            var body = this.ctx.request.body
            var username = body.username
            var codeB = body.code
            var password = this.ctx.service.tools.md5(body.password)
            var result = await this.ctx.service.login.find(username, password, codeB)
                // console.log(result);
            if (result.data) {
                var ip = this.ctx.request.ip
                if (ip.indexOf('::fff:') != -1) {
                    ip.substring(7)
                }
                var time_last = Date.now()
                var id = result.data._id
                    // console.log(ip, time_last, id);
                await this.ctx.service.staff.updateTimeandIp(id, ip, time_last)
            }
            if (result.flag) {
                this.ctx.session.userinfo = result.data
                    // this.ctx.session.is_super = result.data.is_super
                await this.success("成功", "/admin")
            } else {
                await this.fail(result.msg, "/admin/login")
            }


        }
        //    验证码请求
    async verify() {
        var data = await this.ctx.service.tools.getCaptcha()
        this.ctx.response.type = 'image/svg+xml'
        this.ctx.body = data
    }
}
module.exports = LoginController