<template>
 <div id="main">
        <div class="content page-order-payment">
            <div class="gray-box clear">
                <div class="title">
                    <h2>Payment Order</h2>
                </div>
                <div class="box-inner order-info">
                    <h3>Order submitted success</h3>
                    <p class="payment-detail">Please complete the payment within<span>24 hours</span> the overtime order
                        will be cancelled automatically。</p>
                    <p class="payment-detail">We will deliver the goods within 72 hours after you complete the payment
                    </p>
                </div>
                <div class="box-inner payment-checkout-panel clear"><span
                        class="jianguo-blue-main-btn big-main-btn js-payment-order" @click="handlePay"><a>Pay Now</a></span><span
                        class="prices"> Sum Payable;： <em><span>$ </span>8.00</em></span></div>
            </div>
            <div class="confirm-detail">
                <div class="info-title">Order NO</div>
                <p class="info-detail">{{order.orderId}}</p>
            </div>
            <div class="confirm-detail">
                <div class="info-title">Receipt information</div>
                <p class="info-detail">Name：{{order.address.name}}</p>
                <p class="info-detail">Phone：{{order.address.phone}}</p>
                <p class="info-detail">{{order.address.province}}{{order.address.city}}{{order.address.county}}{{order.address.add}}
                </p>
            </div>
            <div class="confirm-detail">
                <div class="info-title">Invoice</div>
                <p class="info-detail">Invoice type: electronic invoice</p>
                <p class="info-detail">Invoice Title：{{order.Invoice}}</p>
                <p class="info-detail">Invoice Content:Goods Detail</p>
            </div>
            <div class="confirm-table-title clear"><span class="name fn-left">Goods Information</span><span
                    class="subtotal fn-right">Subtotal</span><span class="num fn-right">Quantity</span><span
                    class="price fn-right">Price</span><span>ddd</span></div>
            <div class="confirm-goods-table">
             <div class="cart-items clear" :key='goods.id' v-for='goods in order.goods'>
                    <div class="name fn-left hide-row">
                        <div class="name-cell"> 
                            <a href=" " title="" target="_blank">{{goods.name}}</a><br>
                        </div>
                    </div>
                    <div class="subtotal fn-right">
                        <div class="subtotal-cell">${{goods.count*goods.price}}.00</div>
                    </div>
                    <div class="goods-num fn-right">{{goods.count}}</div>
                    <div class="price fn-right">$ {{goods.price}}.00</div> 
                </div>
            </div>
                <div class="order-discount-line">
                <p> Total： <span>{{order.price}}.00</span></p>
                <p> Freight： <span>{{order.freight}}.00</span></p>
                <p> Coupon： <span>{{order.coupon}}.00</span></p>
            </div>
        </div>
    </div>


</template>

<script>


export default {
 methods:{
     handlePay:function(){
         this.$store.commit('payOrder',this.order.orderId)
         alert('Pay Success')
         this.$router.push({name:'account'})
     }
 }  , 


computed:{
    order:function(){
        var orderId=this.$route.query.orderId
        // console.log(orderId);
        
        var orderDetail=this.$store.state.orders.filter(item=>{
            //  console.log(this.$store.state.orders);
             
            
             return  item.orderId=orderId
        })[0]
        console.log(orderDetail);
        
   
       
        return orderDetail;
   
        
    }
}
}
</script>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
<style>
.header-desktop{
    display: none;
}
.content{
    clear: both;
    width: 1220px;
    min-height: 600px;
    padding: 0 0 25px;
    margin: 0 auto;
}
.page-order-payment{
    padding-top: 39px;
}
.gray-box{
    overflow: hidden;
    border: 1px solid #D1D1D1;
    border-color: rgba(0,0,0,.14);
    border-radius: 8px;
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
    background: #fff;
}
.page-order-payment .gray-box{
    margin: 0 auto 60px;
}
.gray-box .title{
    height: 60px;
    padding: 0 10px 0 28px;
    background: linear-gradient(#FFF,#F5F5F5);
    border-bottom: 1px solid #DCDCDC;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 1px 7px rgba(0,0,0,.06);
    line-height: 60px;
    color: #646464;
}
.gray-box .title h2{
    font-size: 18px;
    font-weight: 400;
    color: #626262;
}
.page-order-payment .order-info{
    padding: 60px 0 55px;
    color: #333;
}
.page-order-payment .order-info h3{
    padding-bottom: 14px;
    line-height: 36px;
    text-align: center;
    font-size: 36px;
    color: #212121;
}
.page-order-payment .order-info .payment-detail{
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: #999;
}
.page-order-payment .order-info .payment-detail span{
    font-weight: bolder;
    color: #DE4037;
}
.page-order-payment .order-info .payment-detail{
    text-align: center;
    line-height: 24px;
    font-size: 14px;
    color: #999;
}
.page-order-payment .payment-checkout-panel{
    padding: 10px 10px 10px 0;
    line-height: 60px;
    background: #f9f9f9;
    border-top: 1px solid #e5e5e5;
    box-sizing: border-box;
}
.jianguo-blue-main-btn{
    background: linear-gradient(#6383C6,#4262AF);
    box-shadow: none;
}
.blue-main-btn, .gray-main-btn, .jianguo-blue-main-btn{
    display: block;
    padding: 1px;
    margin: 0 auto;
    border-radius: 6px;
    background: linear-gradient(#5598c9,#2a6da2);
    text-align: center;
    text-shadow: rgba(255,255,255,.496094) 0 1px 0;
    font-family: 'Microsoft Yahei','微软雅黑','PingFang SC',sans-serif;
    cursor: pointer;
    user-select: none;
}
.page-order-payment .big-main-btn{
    float: right;
    width: 120px;
    height: 40px;
    line-height: 40px;
    margin: 0 0 0 10px;
}
.jianguo-blue-main-btn a{
    display: block;
    border-radius: 6px;
    cursor: pointer;
    background: linear-gradient(#6F97E5,#527ED9);
    box-shadow: inset 0 1px 2px #7EA1E8;
    text-shadow: 0 -1px 0 #4F70B3;
    color: #FFF;
    transition: all .3s ease;
}
.page-order-payment .big-main-btn a{
    height: 40px;
    padding: 0;
    line-height: 40px;
    font-size: 16px;
}
.jianguo-blue-main-btn:hover a{
    box-shadow: inset 0 1px 1px #7696DE, inset 0 0 2px #627DCA, inset 0 -2px 3px #5A77C7, inset 0 0 100px rgba(48,77,147,.4);
}
.page-order-payment .prices{
    float: right;
    line-height: 24px;
    padding: 6px 20px 6px 0;
    font-size: 14px;
}
.page-order-payment .prices em{
    margin-left: 5px;
    font-size: 24px;
    color: #D44D44;
}
.page-order-payment .confirm-detail{
    padding: 0 30px 25px;
    border-top: 1px solid #d5d5d5;
}
.page-order-payment .confirm-detail .info-title{
    height: 14px;
    padding: 30px 0 17px;
    line-height: 14px;
    font-weight: bolder;
    color: #333;
}
.page-order-payment .confirm-detail .info-detail{
    line-height: 24px;
    color: #666;
}
.page-order-payment .confirm-table-title{
    padding: 3px 0 0 30px;
    border-top: 1px solid #D5D5D5;
    line-height: 54px;
    font-weight: bolder;
    color: #000;
}
.page-order-payment .confirm-table-title .num, .page-order-payment .confirm-table-title .price, .page-order-payment .confirm-table-title .subtotal{
    width: 175px;
    padding-right: 29px;
    text-align: right;
}
.page-order-payment .confirm-goods-table{
    padding-left: 30px;
    border-top: 1px solid #D5D5D5;
}
.page-order-payment .cart-items{
    height: 80px;
    border-top: 1px solid #D5D5D5;
}
.page-order-payment .cart-items:first-child{
    border-top: none;
}
.hide-row{
    overflow: hidden;
    word-break: keep-all;
}
.page-order-payment .cart-items .name{
    display: table;
    width: 540px;
    height: 100%;
}
.page-order-payment .cart-items .name-cell{
    display: table-cell;
    line-height: 22px;
    vertical-align: middle;
    color: #333;
}
.page-order-payment .cart-items .name-cell a{
    color: #333;
}
.page-order-payment .cart-items .goods-num, .page-order-payment .cart-items .price, .page-order-payment .cart-items .subtotal{
    width: 175px;
    padding-right: 29px;
    line-height: 80px;
    text-align: right;
}
.page-order-payment .cart-items .goods-num{
    width: 28px;
    padding-left: 147px;
    text-align: center;
}
.page-order-payment .order-discount-line{
    padding: 22px 30px 53px;
    border-top: 1px solid #D5D5D5;
    line-height: 24px;
    text-align: right;
    font-size: 12px;
}
.page-order-payment .order-discount-line p:first-child{
    line-height: 32px;
    text-align: right;
    font-size: 14px;
    font-weight: bolder;
}
.is-pay{
  float: right;
  width: 120px;
  height: 40px;
  line-height: 40px;
  margin: 0 0 0 10px;
  display: block;
  padding: 1px;
  text-align: center;
  font-size: 16px;
}

</style>