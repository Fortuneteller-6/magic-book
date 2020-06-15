const BaseController = require('./base');


class RoleController extends BaseController {
    // 角色添加页面渲染
    async add() {
            await this.ctx.render('admin/role/add')
        }
        // 角色添加
    async doadd() {
            var body = this.ctx.request.body
                // console.log(body);
            var result = await this.ctx.service.role.insert(body)
                // console.log(result);
            if (result.flag) {
                await this.success("添加角色成功", '/admin/role/list')
            } else {
                await this.fail("添加角色失败", '/admin/role/add')
            }

        }
        // 角色列表
    async list() {
            var result = await this.ctx.service.role.findAll()
            if (result.flag) {
                await this.ctx.render('admin/role/list', { roles: result.data })
            } else {
                await this.fail(result.msg, '/admin/role/list')
            }
        }
        // 角色修改页面渲染 携带ID
    async edit() {
            var id = this.ctx.query._id
            console.log(id);

            // var id = this.ctx.query.id
            var result = await this.ctx.service.role.findById(id)
            if (result.flag) {
                await this.ctx.render('admin/role/edit', { roles: result.data })
            } else {
                await this.fail(result.msg, '/admin/role/list')
            }
        }
        // 角色修改后提交 
    async doedit() {
            var body = this.ctx.request.body
            var id = body._id
            if (body.data_status == "on") {
                body.data_status = 1
            } else {
                body.data_status = 0
            }
            var result = await this.ctx.service.role.doedit(id, body)
            if (result.flag) {
                await this.success('修改成功', '/admin/role/list')
            } else {
                await this.fail(result.msg, '/admin/role/list')
            }
        }
        // 角色删除 携带ID
    async delete() {
        var id = this.ctx.query._id
        var result = await this.ctx.service.role.deleteOne(id)
        if (result.flag) {
            await this.success(result.msg, '/admin/role/list')
        } else {
            await this.fail(result.msg, '/admin/role/list')
        }
    }
    async auth() {
        // var role_id = this.ctx.params.id
        var role_id = this.ctx.query._id
            // console.log(role_id);
        var result = await this.ctx.service.access.findAllWithChecked(role_id)
            // var result = await this.ctx.service.access.findAllOpen()
        if (result.flag) {
            var accessArr = result.data
                // console.log(accessArr);

            await this.ctx.render("admin/role/auth", { role_id, accessArr })
        } else(
            await this.fail(result.msg, '/admin/role/list')
        )
    }
    async doauth() {
        var body = this.ctx.request.body
            // console.log(body.role_id);
            // body.role_id = this.app.mongoose.Types.ObjectId(body.role_id)
        var role_id = body.role_id
        var access_checked = body.access_checked
        var role_access_array = []
        if (access_checked) {
            access_checked.forEach(item => {
                var role_access = {
                    role_id: role_id,
                    access_id: item
                }
                role_access_array.push(role_access)
            });
        }
        // console.log(role_access_array);

        var result = await this.ctx.service.role.insertMany(role_id, role_access_array)
        if (result.flag) {
            await this.success(result.msg, "/admin/role/list")
        } else {
            await this.fail(result.msg, "/admin/role/auth/" + role_id)
        }

    }


}

module.exports = RoleController