const { Service } = require('egg')
class RoleService extends Service {

    async insert(body) {
        try {
            var model = new this.ctx.model.Role(body)
            var doc = await model.save()

            return { flag: true }

        } catch (error) {


            return { flag: false }

        }
    }
    async findAll() {
        try {
            var roles = await this.ctx.model.Role.find({})
            if (roles) {
                return { flag: true, data: roles }
            } else {
                return { flag: false, msg: "数据为空" }

            }
        } catch (error) {
            console.log(error);
            return { flag: false, msg: "数据错误" }

        }

    }
    async findById(id) {
        try {
            var roles = await this.ctx.model.Role.findById(id)
            if (roles) {
                return { flag: true, data: roles }
            } else {
                return { flag: false, msg: "数据错误" }

            }
        } catch (error) {
            console.log(error);
            return { flag: false, msg: "程序错误" }

        }

    }
    async doedit(id, body) {
        try {
            var doc = await this.ctx.model.Role.updateOne({ _id: id }, { $set: body })
                // console.log(doc);

            if (doc.nModified > 0) {
                return { flag: true, msg: "修改成功" }
            } else {
                return { flag: false, msg: "没有查询到修改角色信息" }
            }
        } catch (error) {
            console.log(error);
            return { flag: false, msg: "程序错误" }
        }

    }
    async deleteOne(id) {
        try {
            var doc = await this.ctx.model.Role.deleteOne({ _id: id })
                // console.log(doc);
                // { n: 1, ok: 1, deletedCount: 1 }

            if (doc.deletedCount > 0) {
                return { flag: true, msg: "删除信息成功" }
            } else {
                return { flag: false, msg: "删除信息失败" }
            }

        } catch (error) {
            console.log(error);
            return { flag: false, msg: "程序错误" }
        }
    }
    async insertMany(id, role_access_array) {
        try {
            // console.log(role_access_array);
            var del = await this.ctx.model.RoleAccess.deleteMany({ role_id: id, })
            var doc = await this.ctx.model.RoleAccess.insertMany(role_access_array)
            if (doc) {
                return { flag: true, msg: "角色授权成功" }
            } else {
                return { flag: false, msg: "角色授权失败" }
            }
        } catch (error) {
            console.log(error);
            return { flag: false, msg: "系统错误" }

        }

    }
}

module.exports = RoleService