import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { stat } from 'fs'
var axios = require('axios')

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        catedata: [],
        goodsdata: [],
        goodsdefail: {},
        // 购物车信息库
        cartPanelData: [],
        // 地址信息库
        checkoutdata: [],
        // 购物车添加时购物车的显示
        isshow: false,
        // 购物车内有没有东西的不同显示
        isMax: false,
        // 新地址提交按钮
        isbtn: true,
        // 添加新地址显示
        isAddress: false,
        // isfocus: true,
        //购物车添加内的定时器
        timer: null,
        // 优惠券
        Coupon: 5,
        // 后台返回的添加地址的选择框的城市信息
        ProvinceData: [],
        // 判断是添加还是修改
        isAddressUpdata: false,
        // 支付前提交上去的地址
        commitAddress: {},
        // 提交支付订单的信息
        orders: [],


        newAddress: {
            id: '0',
            name: '',
            phone: '',
            areaCode: '',
            landLine: '',
            provinceId: '0',
            province: ' ',
            cityId: '0',
            city: '',
            countyId: '0',
            county: '',
            add: '',
            default: true,
            checked: false
        }

    },
    getters: {

        filterChecked: function(state) {
            var filterChecked = []
            state.cartPanelData.forEach(item => {
                if (item.checked == true) {
                    filterChecked.push(item)
                }
            })
            return filterChecked
        },
        totalNum: function(state) {
            var totalNum = 0
            state.cartPanelData.forEach(item => {
                totalNum += item.count
            })
            return totalNum
        },
        totalPrice: function(state) {
            var totalPrice = 0
            state.cartPanelData.forEach(item => {
                totalPrice += item.price * item.count
            })
            return totalPrice
        },
        cartAllChecked: function(state) {
            var cartAllChecked = true
            state.cartPanelData.forEach(item => {
                if (item.checked == false) {
                    cartAllChecked = false
                }
            })
            return cartAllChecked
        },
        // 被选中的商品有几种
        allCheckKind: function(state) {
            // var checkedNum = 0
            // state.cartPanelData.forEach(item => {
            //     if (item.checked == true) {
            //         checkedNum++
            //     }
            // })
            // return checkedNum
            return state.cartPanelData.filter(item => {
                return item.checked
            }).length
        },
        // 选中商品总数
        allKindNum: function(state) {
            var allKind = 0
            state.cartPanelData.forEach(item => {
                if (item.checked == true) {
                    allKind += item.count
                }
            })
            return allKind
        },
        // 选中商品总价
        checkedAllprice: function(state) {
            var allPrice = 0
            state.cartPanelData.forEach(item => {
                if (item.checked == true) {
                    allPrice += item.count * item.price
                }
            })
            return allPrice
        },
        // 邮费
        freightPrice: function(state, getter) {
            console.log(1);

            if (getter.checkedAllprice > 200) {
                return 0
            } else {
                return 16
            }

        },

    },

    mutations: {
        // 订单信息入库
        getCheckoutdata: function(state, data) {
            state.checkoutdata = data
        },
        getCatedata: function(state, data) {
            state.catedata = data
        },
        getGoodsdata: function(state, data) {
            state.goodsdata = data
        },
        getGoodsDefail: function(state, data) {
            state.goodsdefail = data
        },
        // 向购物车添加内容信息
        addCartPanelItem: function(state, data) {

            clearTimeout(state.timer);
            state.isshow = true;
            state.timer = setTimeout(() => {
                state.isshow = false;
            }, 2000)

            var flag = true;
            state.cartPanelData.forEach(item => {
                if (item.id == data.goods.id) {
                    item.count += data.count
                    flag = false;
                    if (item.count > item.limit_num) {
                        item.count -= data.count
                        state.isMax = true
                    }
                    return
                }
            });
            if (flag) {
                var carItem = data.goods
                Vue.set(carItem, 'count', data.count)
                Vue.set(carItem, 'checked', true)
                state.cartPanelData.push(carItem)
            }


        },
        deleteCartPanelItem: function(state, data) {
            // console.log(state.cartPanelData);
            state.cartPanelData.forEach((item, index) => {
                if (item.id == data) {
                    state.cartPanelData.splice(index, 1)
                }
            })
        },
        closeTips: function(state) {
            state.isMax = false
        },
        showCartPanel: function(state) {
            state.isshow = true
        },
        hiddenCartPanel: function(state) {
            state.isshow = false
        },
        // 购物车加减
        cartHandleDown: function(state, down_id) {
            state.cartPanelData.forEach(item => {
                if (item.id == down_id) {
                    if (item.count > 1) {
                        item.count--
                            return
                    }
                }
            })
        },
        cartHandleUp: function(state, up_id) {
            state.cartPanelData.forEach(item => {
                if (item.id == up_id) {
                    if (item.count < item.limit_num) {
                        item.count++
                            return
                    }

                }
            })
        },
        // 购物车蓝色选择块
        changeChecked: function(state, checked_id) {
            state.cartPanelData.forEach(item => {
                if (item.id == checked_id) {
                    item.checked = !item.checked
                    return
                }
            })
        },
        // 购物车商品删除
        deleteCart: function(state, delete_id) {


            state.cartPanelData.forEach((item, index) => {
                if (item.id == delete_id) {

                    state.cartPanelData.splice(index, 1)

                }
            })
        },
        // 全选点击
        allChecked: function(state, ischecked) {
            state.cartPanelData.forEach(item => {
                item.checked = !ischecked
            })

        },
        // 删除购物车选中的选项
        deleteAllCheck: function(state) {
            for (var i = 0; i < state.cartPanelData.length; i++) {
                if (state.cartPanelData[i].checked == true) {
                    state.cartPanelData.splice(i, 1)
                    i = i - 1
                }
            }
        },
        //添加新的地址的显示与隐藏
        showAddAddress: function(state) {
            state.isAddress = true

        },
        hiddenAddAddress: function(state) {
            state.isAddress = false
            state.newAddress = {
                id: '0',
                name: '',
                phone: '',
                areaCode: '',
                landLine: '',
                provinceId: '0',
                province: ' ',
                cityId: '0',
                city: '',
                countyId: '0',
                county: '',
                add: '',
                default: true,
                checked: false

            }

        },
        //向库内导入城市信息
        getAddProvince: function(state, data) {
            state.ProvinceData = data
        },
        //默认地址选中
        checkPrevent: function(state, id) {
            state.checkoutdata.forEach(item => {
                item.default = false
                if (item.id == id) {
                    item.default = true
                    state.commitAddress = item
                    return
                }
            })
        },
        //添加新的地址信息 
        addCommit: function(state, data) {
            if (data.default) {
                state.checkoutdata.forEach(item => {
                    item.default = false
                })
            }

            if (state.isAddressUpdata == false) {
                data.id = Date.now()
                state.checkoutdata.push(data)
            } else {
                state.checkoutdata.forEach(item => {
                    if (data.default) {
                        item.default = false
                    }
                })
                state.checkoutdata = state.checkoutdata.map(item => {
                    item.id == data ? data : item

                })
            }
            state.isAddressUpdata = false
            state.isAddress = true
            state.newAddress = {
                id: '0',
                name: '',
                phone: '',
                areaCode: '',
                landLine: '',
                provinceId: '0',
                province: ' ',
                cityId: '0',
                city: '',
                countyId: '0',
                county: '',
                add: '',
                default: true,
                checked: false
            }
        },
        // 删除地址信息
        deleteAddress: function(state, id) {

            for (var i = 0; i < state.checkoutdata.length; i++) {
                if (state.checkoutdata[i].id == id) {
                    if (state.checkoutdata[i].default == true && state.checkoutdata.length != 1) {
                        state.checkoutdata[0].default = true
                    }
                    state.checkoutdata.splice(i, 1)
                }

            }
        },
        // 修改地址信息
        changeAddress: function(state, id) {
            state.checkoutdata.forEach(item => {
                if (item.id == id) {
                    state.isAddress = true
                    state.newAddress = item
                    state.isAddressUpdata = true
                    state.newAddress = JSON.parse(JSON.stringify(item))
                }
            })

        },
        // 提交支付订单
        submitOrder: function(state, orderdata) {
            // console.log(orderdata);
            state.orders.unshift(orderdata);


            for (var i = 0; i < state.cartPanelData.length; i++) {
                if (state.cartPanelData[i].checked == true) {
                    state.cartPanelData.splice(i, 1)
                    i = i - 1
                }
            }

        },
        // 订单支付
        payOrder: function(state, orderId) {
            state.orders.forEach(item => {
                if (item.orderId == orderId) {
                    item.isPay = true
                }
            })
        }

    },

    actions: {
        getCateDataAsync: function(context) {
            setTimeout(() => {

                axios.get('http://localhost:3000/goodscate').then(function(result) {

                    context.commit('getCatedata', result.data)
                }).catch(function(err) {
                    console.log(err);

                })

            }, 500)

        },
        getGoodsListAsync: function(context, cate_id) {
            // console.log(cate_id);

            setTimeout(() => {
                axios.get('http://localhost:3000/goodslist/' + cate_id).then(function(result) {
                    // console.log(result.data);

                    context.commit('getGoodsdata', result.data)
                }).catch(function(err) {
                    console.log(err);

                })

            }, 500)

        },
        getGoodsAsync: function(context, goods_id) {


            setTimeout(() => {
                axios.get('http://localhost:3000/goods/' + goods_id).then(function(result) {
                    // console.log(result.data);

                    context.commit('getGoodsDefail', result.data)
                }).catch(function(err) {
                    console.log(err);

                })

            }, 500)

        },
        // 订单信息填写
        CheckoutAsync: function(context, user_id) {
            // console.log(1);

            setTimeout(() => {
                axios.get('http://localhost:3000/checkout/' + user_id).then(function(result) {
                    // console.log(result.data);
                    context.commit('getCheckoutdata', result.data)
                }).catch(function(err) {
                    console.log(err);

                })
            }, 500)
        },
        // 城市地址信息获取
        provinceAsync: function(context) {
            setTimeout(() => {
                axios.get('http://localhost:3000/province').then(function(result) {
                    // console.log(result.data);

                    context.commit('getAddProvince', result.data)
                }).catch(function(err) {
                    console.log(err);

                })
            })
        }

    },
    modules: {},
    plugins: [createPersistedState({
        storage: window.sessionStorage
    })]
})