module.exports = (app) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const RoleAccessSchema = new Schema({
        role_id: { type: mongoose.ObjectId }, //角色id
        access_id: { type: mongoose.ObjectId } //授权id

    })
    return mongoose.model('RoleAccess', RoleAccessSchema, 'role_access')
}