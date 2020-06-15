module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const StaffSchema = new Schema({

        role_name: { type: String, required: true }, //登陆账户
        role_desc: { type: String, default: "" }, //密码登录
        time_create: { type: Number, default: Date.now() },
        data_status: { type: Number, default: 1 },


    })
    return mongoose.model('Role', StaffSchema, 'roles')
}