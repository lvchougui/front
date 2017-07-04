<style type="text/css">
	.coupon-item {
		margin:12px;
		/*background-color:white;*/
		overflow:hidden;
		position:relative;
		/*background: url(../../assets/img/coupon/shangpinbj.png) center;*/
		border-radius: 5px;
	}
	.item-product {
		background: url(../../assets/img/coupon/shangpinbj.png) center;
		background-size: cover;
	}
	.item-lot {
		background: url(../../assets/img/coupon/paipinbj.png) center;
		background-size: cover;
	}
	.item-invalid {
		background: url(../../assets/img/coupon/shixiaobj.png) center;
		background-size: cover;
	}
	.item-bg {
		background-color: red;
		width: 100%;
		height: 100%;
		float: center;
		position: absolute;
		z-index: -9999;
	}
	.coupon-price-container {
		width: 30%;
		height:80px;
	}
	.coupon-info {
		float:right;
		line-height: 25px;
		padding: 5px;
		width:66%;
		height:80px;
		text-align: right;
	}
	.coupon-info .text-primary { 
		opacity: 0.8;
		font-size: 14px;
		text-align: right;
	}
	.coupon-type {

	}
	.coupon-label {
		width: 40px;height:40px;position:absolute;right:0;top:0;
	}
	.coupon-tip {
	    font-size: 12px;
	    /*border-top: 1px dashed #ddd;*/
	    margin-top: 5px;
	}

	.coupon-bg {
		width: 100%;
		height: 100%;
		background-color: red;
		float: center;
	}
	.coupon-type-img {
		width: 55px;
		height: 55px;
		/*background-color: red;*/
		margin: 25px;
		float: left;
	}
	.coupon-price {
		/*float: right;*/
		margin-top: 25px;
		margin-right: 18px;
		text-align: right;
		/*background-color: green;*/
		font-size: 22px;
		color: white;
	}
	.coupon-type {
		/*float: right;*/
		/*margin-top: 18px;*/
		text-align: right;
		margin-right: 18px;
		/*background-color: green;*/
		font-size: 16px;
		color: white;
	}
	.coupon-usage {
		/*background-color: orange;*/
		width: 100%;
		clear: left;
		padding-left: 18px;
		padding-right: 18px;
		padding-top: 18px;
		padding-bottom: 10px;
	}
	.coupon-tint-img-1 {
		clear: left;
		width: 20px;
		height: 18px;
		float: left;
		padding-right: 10px;
		margin-top: 5px;
	}
	.coupon-tint-img-2 {
		clear: left;
		width: 20px;
		height: 20px;
		float: left;
		padding-right: 10px;
		margin-top: 5px;
	}
</style>
<template>
    <div v-for = "item in data" @click="onSelect(item)" class="coupon-item" :class="[item.coupon_status == 1 ? (item.use_type == 1 ? 'item-product' : 'item-lot') : 'item-invalid']">
        <!-- <img class="item-bg" src="../../assets/img/coupon/shangpinbj.png"></img> -->

    	<!-- 类型图片  -->
    	<!-- 优惠券状态(1:可使用；2：已使用；3：锁定；4：过期的；) -->
    	<img src="../../assets/img/coupon/paipin.png" class="coupon-type-img" v-if="item.use_type !=1 && item.coupon_status == 1"></img>
    	<img src="../../assets/img/coupon/shangpin.png" class="coupon-type-img" v-if="item.use_type == 1 && item.coupon_status == 1"></img>
    	<img src="../../assets/img/coupon/shixiaopaipin.png" class="coupon-type-img" v-if="item.use_type != 1 && item.coupon_status != 1"></img>
    	<img src="../../assets/img/coupon/shixiaoshangpin.png" class="coupon-type-img" v-if="item.use_type == 1 && item.coupon_status != 1"></img>

	    <!-- 面额 -->
	    <div style="float: right;">
	    	<p class="coupon-price">¥{{item.coupon_amount}}.00</p>
	    	<p class="coupon-type">{{item.use_type == 1 ? "商品抵用券" : "拍品抵用券"}}</p>
	    </div>

	    <!-- 详细信息 -->
        <div class="coupon-usage">
          	<img src="../../assets/img/coupon/shangpinbiaoqian.png" class="coupon-tint-img-1" v-if="item.use_type ==1 && item.coupon_status == 1"></img>
          	<img src="../../assets/img/coupon/jiagebiaoqian.png" class="coupon-tint-img-1" v-if="item.use_type !=1 && item.coupon_status == 1"></img>
          	<img src="../../assets/img/coupon/shixiaobiaoqian.png" class="coupon-tint-img-1" v-if="item.use_type != 1 && item.coupon_status != 1"></img>
        	<p :class="[item.coupon_status != 1 ? 'couponGrayColor' : (item.use_type == 1 ? 'goldenTintColor' : 'greenTintColor')]" style="margin-top:5px;font-size:12px;">{{item.coupon_desc}}</p>
        	<img src="../../assets/img/coupon/coupon_time.png" class="coupon-tint-img-2"></img>
    	    <p class="coupon-tip couponGrayColor">使用期限：{{item.coupon_startdate}} - {{item.coupon_enddate}}</p>
    	    <br>
        </div>

        <!-- <img class="item-bg" src="../../assets/img/coupon/shangpinbj.png"></img> -->

        <!-- 状态角标 -->
       <!--  <img v-if = "item.coupon_status == 4"  src="../../assets/img/img_expire.png" class="coupon-label">
        <img v-if = "item.coupon_status == 2" src="../../assets/img/img_used.png" class="coupon-label"> -->
    </div>
</template>

<script>
	import Swiper from 'vux/dist/components/swiper'
	import SwiperItem from 'vux/dist/components/swiper-item'
	import XButton from 'vux/dist/components/x-button'
	
	import { setOrderCoupon } from '../../vuex/actions'

	export default {
		route:{
			data(){
				document.title = "我的优惠券";
			}
		},
		vuex:{
			actions:{
				setOrderCoupon
			}
		},
		components: {
			Swiper, SwiperItem, XButton,
		},
		ready:function(){
			
			this.$dispatch.apply(this,['onTitleChanged',{title:'优惠券',back:true}])
			
			var query = this.$route.query;
			this.mode = query.mode;
			this.type = query.type;
			this.amount = query.amount;
			this.getCoupons();

		},
		data:function(){
			return {
				tags:['1','1'],
				mode:0,
				type:0,
				amount:0,
				data:[],
			}
		},
		methods: {
			getCoupons (){
				this.$http.post('',{
					act: 'coupon_getList',
					type: this.type,
					amount: this.amount
				}).then(function (result) {
					let resp = result.data;
					if (resp.code == 200) {
						if (resp.datalist.length > 0) {
							for (var i = resp.datalist.length - 1; i >= 0; i--) {
								var dates = resp.datalist[i].coupon_startdate.split('-');
								resp.datalist[i].coupon_startdate = dates[0] + '.' + dates[1] + '.' + dates[2].substring(0,2);
								log(resp.datalist[i].coupon_startdate);

								var enddates = resp.datalist[i].coupon_enddate.split('-');
								resp.datalist[i].coupon_enddate = enddates[0] + '.' + enddates[1] + '.' + enddates[2].substring(0,2);
								log(resp.datalist[i].coupon_enddate);
							};
						};
					}
					this.data = resp.datalist;
					log(this.data);
				});

			},
			onSelect(item){
				if(this.mode){
					log('选择优惠券');
					this.setOrderCoupon(item);
					history.back();
				}

			}
		},
	}
</script>

<style>
	.redFontColor{
		color: rgb(216,84,86);
	}
	.topView{
		position:fixed;
		top:10px;
		left:0px;
		width:100%;
		height:50px;
		background-color:rgba(0,0,0,0.0);
	}

	.priceColor{
		color: rgb(218,83,83);
	}
	.transparentPriceColor{
		color: rgba(218,83,83,0.7);
	}
	.peridColor{
		color: rgb(201,202,202);
	}
	.dottedLine{
		color: rgb(245,245,245);
	}
	.greenTintColor {
		color:rgb(88,188,154);
	}
	.goldenTintColor {
		color:rgb(172,149,113);
	}
	.couponGrayColor {
		/*color: #666;*/
		color: rgb(159,160,160);
	}
	

</style>