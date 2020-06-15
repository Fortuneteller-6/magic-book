var app = (app) => {
    app.cache = { name: "haha" }
    app.once("server", server => {

        console.log("server is running...");

    })
    app.on("error", (error, ctx) => {
            console.log("error is" + error);

        })
        // app.on("request", ctx => {
        //     console.log('request is comming')

    // })
    // app.on("response", ctx => {
    //     console.log('response');
    //     console.log(Date.now() - ctx.starttime);


    // })
}
module.exports = app