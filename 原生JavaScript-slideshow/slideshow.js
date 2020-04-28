var btnL = document.getElementsByClassName("btnL")[0];
var btnR = document.getElementsByClassName("btnR")[0];
var box = document.getElementsByClassName("box")[0];
var ul = document.getElementsByTagName("ul")[0];
var liArr = document.getElementsByTagName("li");
// bool为节流设置开关
var bool = true;
// 将ul的width设置为显示窗口的width*li的数量
ul.style.width = liArr.length * box.offsetWidth + "px"
    // 为显示窗口设置溢出隐藏
box.style.overflow = "hidden"
    // 合理的显示或隐藏按钮
box.onmouseenter = function() {
    btnL.style.display = "block"
    btnR.style.display = "block"
};
box.onmouseleave = function() {
    btnL.style.display = "none"
    btnR.style.display = "none"
};
// 为了整体美观将li限制为显示区域的大小
for (var i; i < liArr.length; i++) {
    liArr[i].style.width = box.offsetWidth + "px"
}
btnL.onclick = function() {
    if (ul.offsetLeft < 0) {
        // 节流的关键在于一个函数只有在大于等于执行周期时才执行，周期内调用不执行.
        // 利用开关 在函数执行时关闭再次执行的开关,在函数执行结束的回调中再次开启开关
        if (bool) {
            bool = false
            move(ul, ul.offsetLeft + 200, function fn() {
                    bool = true
                })
                // move 是封装的简易缓动框架
        }
    }
};
btnR.onclick = function() {
    if (ul.offsetLeft < ul.offsetWidth)
        if (bool) {
            bool = false
            move(ul, ul.offsetLeft - 200, function fn() {
                bool = true
            })
        }

}

// 简易缓动框架
function move(dom, left, fn) {
    // 优化写法先清除dom身上的定时器
    // 在有节流的情况下可以不写
    clearInterval(dom.timer);
    dom.timer = setInterval(function() {
        // 获取dom此时所处的位置信息
        var css = parseInt(window.getComputedStyle(dom, null).left)
            // 设置步长
        var need = (left - css) / 10;
        need = need > 0 ? Math.ceil(need) : Math.floor(need);
        // 判断是继续执行还是结束定时器
        if (Math.abs(left - css) <= Math.abs(need)) {
            // 闪现到目标位置
            dom.style.left = left + "px"
            clearInterval(dom.timer);
            if (fn) {
                fn()
            }
        } else {
            //  缓动中
            dom.style.left = css + need + "px"
        }
    }, 100)

}