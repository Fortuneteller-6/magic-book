module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const StaffSchema = new Schema({
        id: { type: mongoose.ObjectId, required: true },
        login_name: { type: String, required: true }, //登陆账户
        login_pwd: { type: String, required: true }, //密码登录
        staff_name: { type: String, required: true }, //员工名称
        staff_no: { type: String, default: "" }, //员工编号
        staff_phone: { type: String, default: '' }, //员工电话
        staff_status: { type: Number, default: 1 }, //员工状态 1正常 0异常
        is_super: { type: Number, default: 0 }, // 1超级 0普通
        data_status: { type: Number, default: 1 }, //数据状态 1正常 0删除（软删除）
        time_create: { type: Number, default: '' }, //创建时间
        time_last: { type: Number, default: '' }, //最后登录时间
        ip_last: { type: String, default: '' }, //最后登录ip

    })
    return mongoose.model('Staff', StaffSchema, 'staff')
}