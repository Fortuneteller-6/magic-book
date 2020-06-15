module.exports = (option, app) => {
    return async function(ctx, next) {
        var path = ctx.request.path
        var userinfo = ctx.session.userinfo

        // console.log(staff_name);


        if (userinfo) {
            var result = await ctx.service.staff.authChecked(userinfo.id, path)
            if (result.flag) {
                // console.log(userinfo.id);
                var result = await ctx.service.access.findAllWithChecked(userinfo.id)
                if (result.flag) {
                    ctx.locals.authList = result.data
                    ctx.locals.userinfo = userinfo
                        // console.log(ctx.locals.authList);
                        // console.log(userinfo);
                } else {
                    console.log(result.msg);
                }
                await next()
            } else {
                ctx.body = "没有访问权限"
            }

            ///////////////////////
            // var staff = await ctx.model.Staff.findOne({ staff_name: userinfo.staff_name })
            // var access_id_arr = await ctx.model.RoleAccess.find({ role_id: staff.id })
            // var access = await ctx.model.Access.findOne({ access_url: path })
            // var result = await ctx.service.access.findAllWithChecked(staff.id)
            // ctx.locals.authlist = result.date
            // console.log(result);
            // if (access != null) {
            //     if (access_id_arr.toString().indexOf(access._id.toString()) != -1) {
            //         await next();
            //     } else {
            //         ctx.body = "没有访问权限"
            //     }
            // } else {
            // await next();
            // }
        } else {
            if (path == '/admin/login' || path == '/admin/verify' || path == '/admin/dologin' || path == '/admin/addStaff') {
                await next();
            } else {
                ctx.redirect('/admin/login')
            }

        }
    }
}