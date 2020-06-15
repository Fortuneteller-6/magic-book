const { Service } = require('egg')
class LoginService extends Service {
    async find(login_name, login_pwd, codeB) {
        var codeA = this.ctx.session.codeA
        try {
            if (codeA.toLowerCase() == codeB.toLowerCase()) {
                var staff = await this.ctx.service.staff.find(login_name, login_pwd)

                // console.log(staff);
                if (staff.flag) {
                    return { flag: true, data: staff.data }
                } else {
                    return { flag: false, msg: "用户名或密码错误" }
                }
            } else {
                return { flag: false, msg: "验证码输入错误" }
            }

        } catch (error) {
            return { flag: false, msg: "数据异常" }
        }

    }
}
module.exports = LoginService;