<template>
 <div class="item" >
                          <div>
                              <div class="item-img">
                                  <img alt="图片加载失败" :src="item.goods_image" style="opacity: 1;">
                              </div>
                              <h6>{{item.name}}</h6>
                              <h3 >{{item.name_title}}</h3>
                              <div class="item-btns clearfix">
                                  <router-link :to="'/Goods/'+item.id">
                                    <span class="item-gray-btn">Detail  </span>
                                  </router-link>
                                 <span class="item-blue-btn" @click="handleAddCart" >Add Cart </span>
                              </div>
                              <div class="item-price clearfix">
                                  <i>$</i><span>{{item.price}}</span>
                              </div>
                              <div class="discount-icon">false</div>
                              <div class="item-cover"> 
                              </div>
                          </div>
                      </div>
</template>
<script>

export default {
    props:['item'],
  
 methods:{
    handleAddCart:function(){
      var goodsItem={goods:this.item,count:1}
     
    this.$store.commit('addCartPanelItem',goodsItem)
   }
   }
    
    
    
    
}
</script>