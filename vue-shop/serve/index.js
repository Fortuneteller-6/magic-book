const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const router = new Router();
const staticServe = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');
const getCateList = require('./service/catelist')
const getGoodsList = require('./service/goodslist')
const getGoodsData = require('./service/goodsdata')
const getCheckList = require('./service/addressdata')
const provinceList = require('./service/province.js')
app.use(staticServe(path.join(__dirname, './static')));
app.use(cors())


router.get('/goodscate', function(ctx) {
    ctx.response.status = 200;
    ctx.body = getCateList()
});
router.get('/goodslist/:cate_id', function(ctx) {
    var cate_id = ctx.params.cate_id
    ctx.body = getGoodsList(cate_id)
})
router.get('/goods/:goods_id', function(ctx) {
    var goods_id = ctx.params.goods_id
    var getGood = getGoodsData();
    for (let i = 0; i < getGood.length; i++) {
        if (getGood[i].id == goods_id) {
            ctx.body = getGood[i]
            return
        }

    }
})
router.get('/checkout/:user_id', function(ctx) {
    var user_id = ctx.params.user_id
    ctx.body = getCheckList(user_id)
})
router.get('/province', function(ctx) {
    ctx.body = provinceList

})
app.use(router.routes());
app.use(router.allowedMethods);

app.listen(3000, function(err) {
    if (err) {
        console.log(err);

    }
    console.log('serve running on 3000');

})