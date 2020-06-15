const BaseController = require('./base');


class AccessController extends BaseController {
    async add() {
        var modules = await this.ctx.service.access.modules()
            // console.log(modules);

        if (modules.flag) {
            var accessModules = modules.data
            await this.ctx.render("admin/access/add", { accessModules }) //
        } else {
            await this.fail(modules.msg, "/admin")
        }

    }
    async doadd() {
        var body = this.ctx.request.body
        if (body.access_module_id != "0") {
            body.access_module_id = this.app.mongoose.Types.ObjectId(body.access_module_id)
        }
        body.time_create = Date.now()
            // console.log(body);

        var result = await this.ctx.service.access.doadd(body)
        if (result.flag) {
            await this.success("权限添加成功", "/admin/access/list")
        } else {
            await this.fail("权限添加失败", '/admin/welcome')
        }
    }
    async list() {
        var result = await this.ctx.service.access.findAll()
            // console.log(result.data);

        if (result.flag) {


            await this.ctx.render("admin/access/list", { accessArr: result.data })

        } else {
            await this.fail(result.msg, '/admin/welcome')
        }

    }
    async edit() {
        var id = this.ctx.query.id
            // console.log(id);
        var result1 = await this.ctx.service.access.findById(id)
        var result2 = await this.ctx.service.access.modules()
            // console.log(result1.data);
            // console.log("----------------");
            // console.log(result2.data);

        if (result1.flag && result2.flag) {
            await this.ctx.render("admin/access/edit", { access: result1.data, accessModules: result2.data })
        } else {
            if (!result1.flag) {
                await this.fail(result1.msg, "/admin/access/list")
            }
            if (!result2.flag) {
                await this.fail(result2.msg, "/admin/access/list")
            }


        }
    }
    async doedit() {
        var body = this.ctx.request.body
        if (body.access_module_id != "0") {
            body.access_module_id = this.app.mongoose.Types.ObjectId(body.access_module_id)
        }
        var id = body._id
        var result = await this.ctx.service.access.updateOne(id, body)
        if (result.flag) {
            await this.success(result.msg, '/admin/access/list')
        } else {
            await this.fail(result.msg, '/admin/access/edit/' + id)
        }
    }
    async delete() {
        var id = this.ctx.query.id
        console.log(id);
        var result = await this.ctx.service.access.delete(id)
        if (result.flag) {
            await this.success(result.msg, "/admin/access/list")
        } else {
            await this.fail(result.msg, "/admin/access/list")
        }
    }

}

module.exports = AccessController