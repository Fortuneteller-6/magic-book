const { Service } = require('egg')
const md5 = require('md5')
const svgCaptcha = require('svg-captcha')
class ToolsService extends Service {
    async getCaptcha() {
        var captcha = svgCaptcha.create({
            size: 4,
            width: 120,
            height: 50,
            fontSize: 50
        })
        this.ctx.session.codeA = captcha.text
        var data = captcha.data
        return data
    }
    md5(context) {
        return md5(context + '123')
    }
}
module.exports = ToolsService