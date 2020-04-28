// promise支持多重链式调用，避免了层层嵌套
// Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件——更合理和更强大
// Promise的三种状态分为 初始状态pending reslove可以理解为成功 reject可以理解为失败
基本操作
let PromiseDemo = new Promise(function(reslove, reject) {
    if ("true/false") { //reslove,reject都是函数
        reslove("success")
    } else {
        reject("failed")
    }
})
Promise.prototype.then()
    // then方法是为 Promise 实例添加状态改变时的回调函数
    // 第一个参数是reslove返回的回调函数 第二参数是reject返回的回调函数
PromiseDemo.then(function(data) {
    console.log(data); //成功的信息
}).then(function(err) {
    console.log(err) //失败的信息
})
Promise.prototype.catch()
    // catch方法的函数会捕获错误 用catch代替then的好处是函数执行过程中
    // then()方法指定的回调函数，如果运行中抛出错误，也会被catch()方法捕获
    // 第一个then()后最好接catch
PromiseDemo.then(function(data) {
    console.log(data); //成功的信息
}).catch(function(err) {
    console.log(err) //失败的信息
})
Promise.prototype.finally()
    // 到最后不管Promise状态为何都会执行
PromiseDemo.then(function(data) {
    console.log(data); //成功的信息
}).catch(function(err) {
    console.log(err) //失败的信息
}).finally(function() {
    console.log("finally");
})
Promise.resolve()
    // Promise.resolve('fun')等价于new Promise(resolve=>{resolve("fun")})
Promise.reject()
    // Promise.resolve('fun')等价于new Promise((resolve,reject)=>{reject("fun")})
Promise.all()
Promise.all([p1, p2, p3]).then(function(data) {
        console.log(data);
    })
    // 返回一组数据 输出的数组与原数组对应
Promise.race()
Promise.race([p1, p2, p3]).then(function(data) {
        console.log(data);
    })
    // 返回一个运行速度最快的返回值
利用class函数构建一个Promise
class Promiose {
    constructor(executer) { //执行器executer
        this.status = 'pending'; //默认状态 pending
        this.success = undefined; //成功值默认undefind
        this.failed = undefined; //失败默认值undefind
        // 状态只有在pending时才能改变
        let resloveFun = success => {
            if (this.status == pending) {
                this.status = "resolve"
                this.success = success
            }
        }
        let rejectFun = success => {
            if (this.status == pending) {
                this.status = "reject"
                this.failed = failed
            }
        }
        try {
            executer(resloveFun, rejectFun)
                // 把两个函数给执行器执行
        } catch (error) {
            reject(error)
        }
    }
    then(onResolve, onReject) {
        if (this.status = "resolve") {
            onResolve(this.success);
        }
        if (this.status = "reject") {
            onReject(this.failed);
        }
    }
}
// Promise可以顺序嵌套执行
// return 返回的是一个全新的Promise
function ajaxPromise(url) {
    var obj = new Promise(function(resolve, reject) {
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState != 4) {
                return
            };
            if (ajax.readyState == 4) {
                resolve(ajax.responseText)
            } else {
                reject(err)
            }
        }
        ajax.open("get", url);
        ajax.send()
    })
    return obj
}
ajaxPromise("http://localhost:3000/ajaxdemo1")
    .then(function(data) {
        console.log(data)
        return ajaxPromise("http://localhost:3000/ajaxdemo2")
    }).then(function(data) {
        console.log(data);
        return ajaxPromise("http://localhost:3000/ajaxdemo3")
    }).then(function(data) {
        console.log(data);
    })