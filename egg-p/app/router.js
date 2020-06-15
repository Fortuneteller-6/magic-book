const router = (app) => {
    app.router.get('/admin', app.controller.admin.home.index)
    app.router.get('/admin/welcome', app.controller.admin.home.welcome)

    app.router.get('/admin/login', app.controller.admin.login.login)
    app.router.get('/admin/logout', app.controller.admin.login.logout)
    app.router.get('/admin/verify', app.controller.admin.login.verify)
    app.router.post('/admin/dologin', app.controller.admin.login.dologin)

    app.router.get('/admin/staff/add', app.controller.admin.staff.add)
    app.router.post('/admin/staff/doadd', app.controller.admin.staff.doadd)
    app.router.get('/admin/staff/list', app.controller.admin.staff.list)
    app.router.get('/admin/staff/edit', app.controller.admin.staff.edit)
    app.router.post('/admin/staff/doedit', app.controller.admin.staff.doedit)
    app.router.get('/admin/staff/delete', app.controller.admin.staff.delete)


    app.router.get('/admin/role/add', app.controller.admin.role.add)
    app.router.post('/admin/role/doadd', app.controller.admin.role.doadd)
    app.router.get('/admin/role/list', app.controller.admin.role.list)
        // 修改ID传送方法 resful api
    app.router.get('/admin/role/edit', app.controller.admin.role.edit)
        // 修改ID传送方法 query
        // app.router.get('/admin/role/edit', app.controller.admin.role.edit)
    app.router.post('/admin/role/doedit', app.controller.admin.role.doedit)
    app.router.get('/admin/role/delete', app.controller.admin.role.delete)
    app.router.get('/admin/role/auth', app.controller.admin.role.auth)
    app.router.post('/admin/role/doauth', app.controller.admin.role.doauth)

    app.router.get('/admin/access/add', app.controller.admin.access.add)
    app.router.post('/admin/access/doadd', app.controller.admin.access.doadd)
    app.router.get('/admin/access/list', app.controller.admin.access.list)
    app.router.get('/admin/access/edit', app.controller.admin.access.edit)
    app.router.post('/admin/access/doedit', app.controller.admin.access.doedit)
    app.router.get('/admin/access/delete', app.controller.admin.access.delete)

}
module.exports = router