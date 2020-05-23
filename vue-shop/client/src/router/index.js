import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Shop from '../views/Shop.vue'
import Goods from '../views/Goods.vue'
import Cart from '../views/Cart.vue'
import Checkout from '../views/Checkout.vue'
import Payment from '../views/Payment.vue'
import Order from '../components/Order.vue'
import Address from '../components/Address.vue'
import Account from '../views/Account.vue'
import '../assets/reset.css'


Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/shop/:cate_id',
        name: 'shop',
        component: Shop,
        props: true
    },
    {
        path: '/Goods/:goods_id',
        name: 'Goods',
        component: Goods,
        props: true
    },
    {
        path: '/cart',
        name: 'cart',
        component: Cart,
        props: true
    },
    {
        path: '/checkout/:user_id',
        name: 'checkout',
        component: Checkout,
        props: true
    },
    {
        path: '/payment',
        name: 'payment',
        component: Payment,
        props: true
    },
    // {
    //     path: '/account/order',
    //     name: 'order',
    //     component: Order,
    //     props: true
    // },
    // {
    //     path: '/account/address',
    //     name: 'address',
    //     component: Address,
    //     props: true
    // },
    {
        path: '/account',
        name: 'account',
        component: Account,
        children: [{
            path: '/account/address',
            component: Address,
        }, {
            path: '/account/order',
            component: Order
        }],
        // props: true
    },


]

const router = new VueRouter({
    mode: "history",

    routes
})

export default router