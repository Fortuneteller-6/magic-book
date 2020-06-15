const { Service } = require('egg')
class AccessService extends Service {
    //添加页面的所属模块
    async modules() {
            try {
                var accessModules = await this.ctx.model.Access.find({ access_module_id: '0' })
                    // console.log(accessModules);

                if (accessModules) {
                    return { flag: true, data: accessModules }
                } else {
                    return { flag: false, msg: "查询失败" }
                }
            } catch (error) {
                console.log(error);
                return { flag: false, msg: "程序错误" }

            }

        }
        //权限添加
    async doadd(body) {
            try {
                var accessModel = new this.ctx.model.Access(body)
                    // console.log(accessModel);

                var doc = await accessModel.save()

                return { flag: true }

            } catch (error) {
                console.log(error);

                return { flag: false }

            }

        }
        // 权限列表
    async findAll() {
        try {
            // 方法一 通过页面模板进行分层
            // var doc = await this.ctx.model.Access.find({}).sort({ access_sort: 1 })
            // 方法二 通过联表进行分层
            var doc = await this.ctx.model.Access.aggregate([

                {
                    $lookup: {
                        from: 'access',
                        localField: "_id",
                        foreignField: "access_module_id",
                        as: "subAccess"
                    }
                },
                { $match: { access_module_id: "0" } },
                { $sort: { access_sort: 1 } }
            ])
            if (doc) {
                doc = doc.map((item) => {
                    item.subAccess.sort(function(a, b) {
                        return a.access_sort - b.access_sort
                    })
                    return item
                })
            }
            // if (doc) {
            //     doc = doc.map((item) => {
            //         // console.log(item);

            //         item.subAccess.filter((a) => {
            //             // console.log(a);

            //             return a.data_status == 1
            //         })
            //         return item
            //     })
            // }

            if (doc) {
                return { flag: true, data: doc }
            } else {
                return { flag: false, msg: "信息查询失败" }
            }
        } catch (error) {
            console.log(error);
            return { flag: false, msg: "程序错误" }

        }

    }
    async findAllOpen() {
            try {
                var doc = await this.ctx.model.Access.aggregate([

                    {
                        $lookup: {
                            from: 'access',
                            localField: "_id",
                            foreignField: "access_module_id",
                            as: "subAccess"
                        }
                    },
                    { $match: { access_module_id: "0", data_status: 1 } },
                    {
                        $project: {
                            "_id": 1,
                            "access_module": 1,
                            "access_action": 1,
                            "access_type": 1,
                            // "is_super": 1,
                            subAccess: {
                                $filter: {
                                    input: "$subAccess",
                                    as: "item",
                                    cond: {
                                        $eq: ['$$item.data_status', 1]
                                    }
                                }
                            }
                        },
                    },
                    { $sort: { access_sort: 1 } },
                ])
                if (doc) {
                    doc = doc.map((item) => {
                        item.subAccess.sort(function(a, b) {
                            return a.access_sort - b.access_sort
                        })
                        return item
                    })
                }
                if (doc) {
                    return { flag: true, data: doc }
                } else {
                    return { flag: false, msg: "信息查询失败" }
                }
            } catch (error) {
                console.log(error);
                return { flag: false, msg: "程序错误" }

            }
        }
        // 根据地址查询权限信息
    async findAccessByUrl(path) {
            try {
                // console.log(path);

                var doc = await this.ctx.model.Access.findOne({ access_url: path })
                    // console.log(doc);
                if (doc) {
                    return { flag: true, data: doc, msg: "依据url查询权限成功" }
                } else {
                    return { flag: false, msg: "依据url查询权限失败" }
                }
            } catch (error) {
                console.log(error);
                return { flag: false, msg: "程序错误" }
            }

        }
        //根据用户id查询权限信息
    async findAccessByRoleId(role_id) {
        try {
            var doc = await this.ctx.model.RoleAccess.find({ role_id: role_id })
                // console.log(doc);  

            if (doc) {
                return { flag: true, data: doc, msg: "依据角色id查询权限成功" }
            } else {
                return { flag: false, msg: "依据角色id查询权限失败" }
            }
        } catch (error) {
            console.log(error);
            return { flag: false, msg: "程序错误" }
        }

    }
    async findAllWithChecked(role_id) {
            var result1 = await this.findAllOpen()
            var result2 = await this.findAccessByRoleId(role_id)
            if (result1.flag && result2.flag) {
                var accessArr = result1.data
                var RoleAccessArr = result2.data
                    // console.log(RoleAccessArr);
                var accessChecked = []
                RoleAccessArr.forEach(item => {
                    accessChecked.push(item.access_id.toString())
                });

                for (const access of accessArr) {
                    if (accessChecked.indexOf(access._id.toString()) != -1) {
                        access.checked = true
                    }
                    for (const subaccess of access.subAccess) {
                        if (accessChecked.indexOf(subaccess._id.toString()) != -1) {
                            subaccess.checked = true
                        }
                    }
                }

                return { flag: true, data: accessArr }

            } else {
                if (!result1.flag) {
                    return { flag: false, msg: result1.msg }
                }
                if (!result2.flag) {
                    return { flag: false, msg: result2.msg }
                }
            }
        }
        // 
    async findById(id) {
        try {
            var doc = await this.ctx.model.Access.findById(id)
                //findById 返回对象 find返回数组
                // console.dir(doc);

            if (doc) {
                return { flag: true, data: doc }
            } else {
                return { flag: false, msg: "修改信息失败" }
            }
        } catch (error) {

        }

    }
    async updateOne(id, body) {
        try {
            console.log(body);

            var doc = await this.ctx.model.Access.updateOne({ _id: id }, body)
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
    async delete(id) {
        try {
            var access = await this.ctx.model.Access.findById(id)
            if (access.access_module_id == '0') {
                var model_id = access._id
                var doc = await this.ctx.model.Access.deleteMany({ access_module_id: model_id })
                if (doc.deletedCount > 0 && doc.n > 0) {
                    var doc = await this.ctx.model.Access.deleteOne({ _id: id })
                    if (doc.deletedCount > 0 && doc.n > 0) {
                        return { flag: true, msg: "删除成功" }
                    } else if (doc.deletedCount == 0 && doc.n > 0) {
                        return { flag: true, msg: "请确认删除信息" }
                    } else {
                        return { flag: false, msg: "没有查询到删除用户信息" }
                    }
                } else if (doc.n == 0) {
                    var doc = await this.ctx.model.Access.deleteOne({ _id: id })
                    if (doc.deletedCount > 0 && doc.n > 0) {
                        return { flag: true, msg: "删除成功" }
                    } else if (doc.deletedCount == 0 && doc.n > 0) {
                        return { flag: true, msg: "请确认删除信息" }
                    } else {
                        return { flag: false, msg: "没有查询到删除用户信息" }
                    }
                } else {
                    return { flag: false, msg: "没有查询到删除用户信息" }
                }
            } else {
                var doc = await this.ctx.model.Access.deleteOne({ _id: id })
                if (doc.deletedCount > 0 && doc.n > 0) {
                    return { flag: true, msg: "删除成功" }
                } else if (doc.deletedCount == 0 && doc.n > 0) {
                    return { flag: true, msg: "请确认删除信息" }
                } else {
                    return { flag: false, msg: "没有查询到删除用户信息" }
                }
            }
        } catch (error) {
            console.log(error);
            return { flag: false, msg: "程序错误" }

        }
    }

}

module.exports = AccessService