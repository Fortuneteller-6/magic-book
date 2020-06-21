const koa = require("koa");
const cors = require("koa2-cors");
const app = new koa();
const Router = require("koa-router")
const router = new Router();
app.use(cors())
var mainmiddleware = async(ctx, next) => {
    ctx.response.status = 200;
    ctx.response.body = [
        {
        id:"001",
        content:"learn react",
        isComplete:false
    },
    {
        id:"002",
        content:"learn vue",
        isComplete:false
    },
    {
        id:"003",
        content:"learn egg",
        isComplete:false
    }
    ];
}

router.get("/datas", mainmiddleware);

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen("3001", function(err) {
    if (err) {
        console.log(err);
    }
    console.log("running...");
})