module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const AccessSchema = new Schema({
        access_type: { type: String, required: true }, //模块类型
        access_module: { type: String, default: "" }, //模块名称
        access_action: { type: String, default: "" }, //权限操作
        access_url: { type: String, default: "" }, //权限资源
        access_module_id: { type: mongoose.Mixed }, //0:顶级模块 ObjectId:所有关联的模块
        access_sort: { type: Number, default: 100 }, //数据排序
        access_desc: { type: String, default: "" }, //权限描述
        data_status: { type: Number, default: 1 }, //数据状态 1正常 0删除（软删除）
        time_create: { type: Number, default: '' }, //创建时间
    })
    return mongoose.model('Access', AccessSchema, 'access')
}