<template>
  <div class="account-content">
        <div class="account-address">
            <div class="gray-box clear">
                <div class="title pre-title">
                    <h2 class="fn-left">Receipt information</h2>
                    <span class="gray-blue-btn js-add-address" ><a class="add" @click="showAddAddress()" >Add Address</a></span>
                   
                </div>
                 <Addnewaddress></Addnewaddress>
                <div class="box-inner clear" :key='item.id' v-for='item in checkoutdata'>
                    <div  >
                        <div class="address-list-item default-item" >
                            <div class="name fn-left">
                                <div class="name-cell">{{item.name}}</div>
                            </div>
                            <div class="detail fn-left">
                                <div class="detail-cell">{{item.province+item.city+item.county+item.add}}</div>
                            </div>
                            <div class="operation fn-right">
                                <div class="operation-cell">
                                    <a class="gray-edit-btn js-edit-address" @click="changeAddress(item.id)">modify</a>
                                <span class="red-del-btn js-del-address " @click="deleteAddress(item.id)"> <a>delete</a><em>delete</em> </span>
                            </div>
                        </div>
                        <div class="default fn-right ">
                          <span v-show='item.isdefault'>（default）</span>
                          <a >default</a>
                        </div>
                        <div class="telephone fn-right ">{{item.phone}}</div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 显示增加 -->
    </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import Addnewaddress from '../components/Addnewaddress'
export default {
name:'address',
computed:{
...mapState(['checkoutdata','isAddress'])
},
methods:{
    ...mapMutations(['deleteAddress','addCommit','changeAddress','showAddAddress']),
   
},
components:{
    Addnewaddress
}
}
</script>

<style>
.gray-box, .gray-btn-menu-on:hover{
	background: #FFF;
}
.gray-box{
	overflow: hidden;
    border: 1px solid #D1D1D1;
    border-color: rgba(0,0,0,.14);
    border-radius: 8px;
    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
}

.account-content{
	margin: 50px;
}
.gray-box .title{
	height: 60px;
    padding: 0 10px 0 28px;
    background: #F5F5F5;
    background: linear-gradient(#FFF,#F5F5F5);
    border-bottom: 1px solid #DCDCDC;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 1px 7px rgba(0,0,0,.06);
    line-height: 60px;
    color: #646464;
}
.gray-box .pre-title{
	position: relative;
    z-index: 2;
}
.gray-box .title h2{
	font-size: 18px;
    font-weight: 400;
    color: #626262;
}


.blue-btn, .gray-blue-btn, .gray-btn, .gray-icon-btn, .light-blue-btn, .light-gray-btn{
    display: inline-block;
    height: 38px;
    padding: 0 20px;
    border-radius: 8px;
    line-height: 38px;
    font-size: 14px;
    cursor: pointer;
}
.gray-blue-btn{
    padding: 0;
    background: #A2A2A2;
}
.gray-box .title span{
    overflow: hidden;
    float: right;
    margin-top: 11px;
}
.blue-btn a, .gray-blue-btn a, .gray-btn a, .gray-icon-btn a, .light-blue-btn a, .light-gray-btn a{
    display: block;
}
.gray-blue-btn a{
    height: 38px;
    line-height: 38px;
    color: #FFF;
}
.gray-blue-btn a.add{
    padding: 0 13px 0 38px;
    background: url(../assets/img/btn-icon-new.png) 0 -6px no-repeat;
    transition: none;
}
.gray-blue-btn:hover{
    background: #ffc107;
    box-shadow: none;
}
.address-form{
    width: 370px;
    margin: 0 auto;
}
.account-address .address-form{
    padding: 30px;
    margin: 0;
}
.module-form-row{
    position: relative;
    padding-bottom: 10px;
    margin: 0 auto;
}
.address-form .module-form-row{
    padding-bottom: 15px;
}
.module-form-row .form-item-v3{
    position: relative;
    height: 46px;
    background: #FFF;
    border: 1px solid #CCC;
    border-radius: 6px;
    box-shadow: 0 3px 5px -4px rgba(0,0,0,.4) inset, -1px 0 3px -2px rgba(0,0,0,.1) inset;
    line-height: 46px;
    font-size: 18px;
    opacity: .618;
    transition: opacity .3s ease;
}
.module-form-row .form-item-v3 i{
    position: absolute;
    left: 15px;
    top: 0;
    font-size: 16px;
    color: #BEBEBE;
}
.module-form-row .form-item-v3 input{
    padding: 0 15px;
    background-color: transparent;
    border: none;
    font-size: 16px;
}
.address-form .form-item-v3 input{
    width: 330px;
}
.address-form .area-code-w{
    width: 118px;
}
.address-form .telephone-w{
    width: 238px;
}
.module-form-row div.select-item{
    width: auto;
    height: auto;
    margin: 0;
    background: 0 0;
    border: none;
    box-shadow: none;
    opacity: 1;
}
.module-form-row .form-item-v3 select{
    margin: 0 0 0 15px;
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #333;
}
.address-form .select-province{
    width: 370px;
}
.form-focus-item{
    z-index: 1;
    opacity: 1;
    border: 1px solid #ffc107;
}
.module-form-row div.select-item{
    width: auto;
    height: auto;
    margin: 0;
    background: 0 0;
    border: none;
    box-shadow: none;
    opacity: 1;
}
.module-form-row .form-item-v3 select{
    height: 48px;
    padding: 0 15px;
    margin: 0;
    background: -webkit-linear-gradient(top,#FAFAFA,#F5F5F5);
    background: linear-gradient(#FAFAFA,#F5F5F5);
    border: 1px solid #CCC;
    border-radius: 6px;
    box-shadow: 2px 0 0 rgba(255,255,255,.4) inset, 1px 0 0 rgba(255,255,255,.3);
    line-height: 48px;
    text-indent: 0;
    outline: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    cursor: pointer;
}
.address-form .select-city, .address-form .select-district{
    width: 180px;
}
.blue-checkbox, .blue-checkbox-disable, .blue-checkbox-on{
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
    background: url(/../assets/img/checkbox-bg.png) no-repeat;
    cursor: pointer;
}
.address-form .blue-checkbox{
    top: 0;
    float: left;
    margin-right: 5px;
}
.dialog-blue-btn{
    padding: 1px;
    background: #ffc107;
    background: linear-gradient(#ffc107,#ffc107);
    border-radius: 6px;
    text-align: center;
    color: #FFF;
}
.disabled-btn{
    opacity: .4;
}
.disabled-btn, .disabled-btn a{
    cursor: not-allowed;
    -webkit-transition: none;
    transition: none;
    pointer-events: none;
}
.dialog-blue-btn a{
    display: block;
    padding: 2px 0;
    background: #ffc107;
    background: linear-gradient(#ffc107,#ffc107);
    border-radius: 5px;
    box-shadow: inset 0 1px 2px #ffc107;
    text-shadow: 0 -1px 0 #ffc107;
    color: #FFF;
}
.big-main-btn a{
    height: 42px;
    line-height: 42px;
    font-size: 18px;
}
.account-address .address-list-item{
  height: 75px;
  padding: 20px 0;
  border-bottom: 1px solid #CFCFCF;
  line-height: 24px;
}
.account-address .address-list-item:last-child{
  border-bottom: none;
  border-radius: 0 0 7px 7px;
}
.account-address .address-list-item .name{
  display: table;
  width: 106px;
  height: 100%;
  padding: 0 20px 0 24px;
}
.account-address .address-list-item .name-cell{
  display: table-cell;
  vertical-align: middle;
}
.account-address .address-list-item .detail{
  display: table;
  width: 440px;
  height: 100%;
  text-align: left;
}
.account-address .address-list-item .detail-cell{
  display: table-cell;
  vertical-align: middle;
}
.account-address .address-list-item .operation{
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  width: 135px;
  padding: 24px 0;
}
.account-address .address-list-item .operation-cell{
  display: flex;
  text-align: center;
}
.gray-edit-btn, .red-del-btn{
  width: 26px;
  height: 26px;
  border-radius: 5px;
  overflow: hidden;
}
.gray-edit-btn, .red-del-btn:hover a {
  opacity: 1;
}
.gray-edit-btn{
  display: inline-block;
  background: url(../assets/img/btn-icon-new.png) -9px -112px no-repeat #A2A2A2;
  text-indent: -9999em;
}
.account-address .address-list-item .operation .gray-edit-btn{
  margin-right: 6px;
}
.gray-edit-btn, .red-del-btn{
  width: 26px;
  height: 26px;
  border-radius: 5px;
  overflow: hidden;
}
.red-del-btn{
  position: relative;
  display: inline-block;
  background: #d84747;
  background: linear-gradient(#f97474,#e05b5b);
  line-height: 26px;
  opacity: .62;
  cursor: pointer;
  transition: none;
}
.red-del-btn a{
  display: block;
  width: 26px;
  height: 26px;
  background: url(../assets/img/btn-icon-new.png) -9px -262px no-repeat;
  text-indent: -9999em;
  color: #FFF;
  transition: none;
}
.red-del-btn em{
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  height: 26px;
  text-indent: 0;
  font-size: 12px;
  color: #FFF;
}
.account-address .address-list-item .default{
  width: 80px;
  line-height: 75px;
  text-align: center;
  font-size: 12px;
}
.account-address .address-list-item .default a{
  color: #ffc107;
  visibility: hidden;
}
.account-address .address-list-item:hover .default a{
  visibility: visible;
}
.account-address .address-list-item .telephone{
  width: 160px;
  height: 100%;
  line-height: 75px;
  text-align: center;
}
</style>