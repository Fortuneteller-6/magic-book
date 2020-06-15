const BaseController = require('./base');


class UserController extends BaseController {
    // 用户的添加页面
    async add() {
            var result = await this.ctx.service.role.findAll()

            if (result.flag) {
                await this.ctx.render('admin/staff/add', { roles: result.data })
            } else {
                await this.fail("程序错误", '/admin/staff/add')
            }
        }
        // 请求添加用户
    async doadd() {
            var body = this.ctx.request.body
                // 密码加密
            body.login_pwd = await this.ctx.service.tools.md5(body.login_pwd)
            body.time_create = Date.now()
                // 判断用户名是否存在
            var loginName = body.login_name
            var doc = await this.ctx.service.staff.findByLoginName(loginName)
            if (doc.flag) {
                var result = await this.ctx.service.staff.insert(body)
                if (result.flag) {
                    await this.success("添加成功", '/admin/staff/list')
                } else {
                    await this.fail("添加失败", '/admin/staff/add')
                }
            } else {
                await this.fail(doc.msg, '/admin/staff/add')
            }

        }
        // 用户列表
    async list() {
            var result = await this.ctx.service.staff.aggregate()
            if (result.flag) {
                await this.ctx.render('admin/staff/list', { staffs: result.data })
            } else {
                await this.fail(result.msg, "/admin")
            }
        }
        // 修改用户 携带id
    async edit() {
            var id = this.ctx.query._id
            var result1 = await this.ctx.service.staff.findById(id)
            var result2 = await this.ctx.service.role.findAll(id)
            if (result1.flag && result2.flag) {
                await this.ctx.render('admin/staff/edit', { staffs: result1.data, roles: result2.data })
            } else {
                if (!result1.flag) {
                    await this.fail(result1.msg, "admin/staff/list")
                }
                if (!result2.flag) {
                    await this.fail(result1.msg, "admin/staff/list")
                }
            }
        }
        // 上传修改 携带id
    async doedit() {
            var body = this.ctx.request.body
            var id = body._id
            if (body.login_pwd != '') {
                var staff = {
                    login_name: body.login_name,
                    login_pwd: await this.ctx.service.tools.md5(body.login_pwd),
                    staff_name: body.staff_name,
                    staff_no: body.staff_no,
                    staff_phone: body.staff_phone,
                    staff_status: body.staff_status,
                    data_status: body.data_status,
                    id: body.id
                }

            } else {
                var staff = {
                    login_name: body.login_name,
                    // login_pwd : await this.ctx.service.tools.md5(body.login_pwd),
                    staff_name: body.staff_name,
                    staff_no: body.staff_no,
                    staff_phone: body.staff_phone,
                    staff_status: body.staff_status,
                    data_status: body.data_status,
                    id: body.id
                }
            }
            var result = await this.ctx.service.staff.doedit(id, staff)
            if (result.flag) {
                await this.success(result.msg, '/admin/staff/list')
            } else {
                await this.fail(result.msg, '/admin/staff/edit/' + id)
            }
        }
        // 删除用户 携带id
    async delete() {

        var id = this.ctx.query._id
        var result = await this.ctx.service.staff.deleteOne(id)
        if (result.flag) {
            await this.success(result.msg, '/admin/staff/list')
        } else {
            await this.fail(result.msg, '/admin/staff/list')
        }
    }

}

module.exports = UserController