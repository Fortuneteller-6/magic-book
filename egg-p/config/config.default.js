var config = {}
config.keys = "123456"
config.view = {
    defaultViewEngine: 'nunjucks', //多个引擎默认选择
    mapping: {
        '.html': 'nunjucks'
    }
}
config.security = {
        csrf: {
            queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
            bodyName: '_csrf', // 通过 body 传递 CSRF token 的默认字段为 _csrf
        },
    },
    config.mongoose = {
        client: {
            url: "mongodb://testAdmin:123@localhost:27017/test",
            options: {},
        }
    }
config.session = {
    key: 'EGG_SESS',
    maxAge: 24 * 3600 * 1000, // 1 day
    httpOnly: true,
    encrypt: true
};
config.middleware = ['adminAuth']
config.adminAuth = {
    enable: true,
    match: '/admin'

}
module.exports = config