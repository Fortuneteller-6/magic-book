const { Service } = require('egg')
class StaffService extends Service {
    async find(login_name, login_pwd) {
            try {
                var staff = await this.ctx.model.Staff.findOne({ login_name: login_name, login_pwd: login_pwd })


                if (staff) {
                    return { flag: true, data: staff }
                } else {
                    return { flag: false }
                }

            } catch (error) {
                return { flag: false }
            }

        }
        // 向数据库添加用户
    async insert(body) {
            try {
                var staffModel = new this.ctx.model.Staff(body)
                var doc = await staffModel.save()

                return { flag: true }

            } catch (error) {
                console.log(error);

                return { flag: false }

            }
        }
        //检验添加账号是否已经存在
    async findByLoginName(loginName) {

            try {
                var doc = await this.ctx.model.Staff.findOne({ login_name: loginName })
                if (doc) {
                    return { flag: false, msg: "用户名已经存在" }
                } else {
                    return { flag: true }
                }
            } catch (error) {
                console.log(error);
                return { flag: false, msg: "数据异常" }

            }


        }
        // 联表查询 确定用户所属的角色
    async aggregate() {
            try {
                var doc = await this.ctx.model.Staff.aggregate([{
                        $lookup: {
                            from: 'roles',
                            localField: "id",
                            foreignField: "_id",
                            as: "role"
                        }
                    }, { $match: { data_status: 1 } }])
                    // console.log(doc);
                if (doc) {
                    return { flag: true, data: doc }
                } else {
                    return { flag: false, msg: "数据不存在" }
                }
            } catch (error) {
                console.log(error);
                return { flag: false, msg: "数据异常" }

            }


        }
        // 修改时 通过Id查询要修改项数据
    async findById(id) {
            try {
                var staffs = await this.ctx.model.Staff.findById(id)
                if (staffs) {
                    return { flag: true, data: staffs }
                } else {
                    return { flag: false, msg: "数据错误" }

                }
            } catch (error) {
                console.log(error);
                return { flag: false, msg: "程序错误" }

            }

        }
        // 提交修改 携带id 考虑用户名是否存在和信息是否有改动
        // 如果用户名与数据库相同id用户信息的用户名相等  判断信息是否有改动
        // 如果用户名与数据库相同id用户信息用户名不相等  判断用户名在数据库内是否存在
    async doedit(id, body) {
            try {
                var staff = await this.ctx.model.Staff.findById(id)
                if (staff.login_name != body.login_name) {
                    var doc = await this.findByLoginName(body.login_name)
                    if (!doc.flag) {
                        return { flag: false, msg: "用户名已经存在" }
                    }

                }
                var doc = await this.ctx.model.Staff.updateOne({ _id: id }, { $set: body })
                    // console.log(doc);
                if (doc.nModified > 0 && doc.n > 0) {
                    return { flag: true, msg: "修改成功" }
                } else if (doc.nModified == 0 && doc.n > 0) {
                    return { flag: true, msg: "请确认修改信息" }
                } else {
                    return { flag: false, msg: "没有查询到修改用户信息" }
                }
            } catch (error) {
                console.log(error);
                return { flag: false, msg: "程序错误" }
            }

        }
        // 删除用户  携带id验证
    async deleteOne(id) {
            try {
                var doc = await this.ctx.model.Staff.updateOne({ _id: id }, { data_status: 0 })
                if (doc.nModified > 0) {
                    return { flag: true, msg: "删除信息成功" }
                } else {
                    return { flag: false, msg: "删除信息失败" }
                }

            } catch (error) {
                console.log(error);
                return { flag: false, msg: "程序错误" }
            }
        }
        // 添加用户最后一次登录的时间和ip
        // 不做日志不用设置返回数据 ip和最后登录的时间有没有都可以
        // 不严谨
    async updateTimeandIp(id, ip, time_last) {
            // console.log(1);
            await this.ctx.model.Staff.updateOne({ _id: id }, { time_last: time_last, ip_last: ip })
        }
        // 验证权限访问
    async authChecked(role_id, path) {
        var ignorePath = ['/admin', "/admin/staff/doadd", "/admin/role/doadd", "/admin/staff/doedit", "/admin/role/doauth", "/admin/role/doedit", "/admin/access/doedit", "/admin/access/doadd", '/admin/login', '/admin/dologin', '/admin/verify', '/admin/logout', '/admin/welcome']
        if (ignorePath.indexOf(path) !== -1 || this.ctx.session.userinfo.is_super == 1) {
            return { flag: true, msg: "权限验证成功" }
        }
        // console.log(path);
        var result1 = await this.ctx.service.access.findAccessByRoleId(role_id)
        var result2 = await this.ctx.service.access.findAccessByUrl(path)
        if (result1.flag && result2.flag) {
            var access_arr = result1.data
            var access_id = result2.data
            if (access_arr.toString().indexOf(access_id).toString() !== -1) {
                return { flag: true, msg: "权限验证成功" }
            } else {
                return { flag: false, msg: "没有访问权限" }
            }
        } else {
            if (!result1.flag) {
                return { flag: false, msg: result1.msg }
            }
            if (!result2.flag) {
                return { flag: false, msg: result2.msg }
            }
        }
    }

}

module.exports = StaffService