<template>
  <div class="CateItem">
 <div class="products-catagory">
            <div class="single-products-catagory clearfix">
                    <router-link :to="'/shop/'+item.id"> 
                    <!-- to前加:绑定才好使 -->
                    <img :src="item.cate_img" alt="">
                            <div class="hover-content">
                                <div class="line"></div>
                                <p>From ${{item.cate_price}}</p>
                                <h4>{{item.cate_name}}</h4>
                            </div>
                    </router-link>
                        </div>
        
                
               
            
    </div>
  </div>
</template>
<script>
export default {
    props:{item:Object},
    name:'CateItem',
}
</script>
<style>

</style>