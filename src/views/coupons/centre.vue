<template>
	<div class="content-bg">
	</div>
    <div v-for = "item in data" @click="onSelect(item)" class="list">
    	<div class="coupon-a">
	    	<div class="coupon-left">
				<div class="coupon-desc">
					<div class="coupon-amount">
						<span class="coupon-price">{{item.coupon_amount}}</span>
						<span class="coupon-rmb">元</span>
					</div>
					<span class="coupon-remark">满{{item.promoter_amount}}元使用</span>
				</div>
			</div>

			<div class="pro-content">
					<span class="pro-info" :class="item.coupon_desc.length > (screenW / 28) ? 'pro-info-line2' : 'pro-info-line1'">{{item.coupon_desc}}</span>
					<span class="coupon-validetime" :class="screenW <= 320 ? 'coupon-time-smallfont' : 'coupon-time-bigfont'">{{couponDesc}}{{item.coupon_startdate}}-{{item.coupon_enddate}}</span>
			</div>

			<div class="coupon-right" :class="item.ischeck == 1  ? 'available-bg' : (item.amount_pre_time == 0 ? 'unavailable-bg' : 'available-bg')">
	<!-- 			<div class="triangle-border-right">
					<em class="circular0"></em>
					<em class="circular1"></em><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
				<div class="change-block"> -->

				<div v-if="item.ischeck == 1">
					<img class="img-hint" src="../../assets/img/coupon/received.png" /> 
					<span class="coupon-btn-use" @click="useCoupon(item)">去使用</span>
				</div>

			    <div v-if="item.amount_pre_time != 0 && item.ischeck == 0"> 
					<span class="progress-text">剩余<br>{{parseInt(item.amount_pre_time/item.coupon_limits*100)}}%</span>

					<div class="progress-bar-block">
						<div class="progress-bar"><span class="bar-span" style="width:{{parseInt(item.amount_pre_time/item.coupon_limits*100)}}%;"></span></div>
					</div>

					<span class="coupon-btn" @click="acquireCoupon(item)">马上领</span>
				</div>

				<div v-if="item.amount_pre_time == 0 && item.ischeck == 0">
					<img class="img-hint" src="../../assets/img/coupon/unavailable.png" /> 
					<span class="nexttime-hint">下次再来</span>
				</div>
				
				
			</div>
		</div>
    </div>

    <see-more :on-see="getCoupons"></see-more>

    <toast :show.sync="needToast" type="text" width="12em">{{toastTips}}</toast>

</template>

<script>
	import Swiper from 'vux/dist/components/swiper'
	import SwiperItem from 'vux/dist/components/swiper-item'
	import XButton from 'vux/dist/components/x-button'
	
	import { setOrderCoupon } from '../../vuex/actions'
	import SeeMore from '../partial/see-more'
	import {isLogined} from '../../lib/auth'
	import browserUtils from '../../lib/browser-helper'

	import Toast from 'vux/dist/components/toast'

	export default {
		route:{
			data(){
				document.title = "领券中心";
			}
		},
		vuex:{
			actions:{
				setOrderCoupon
			}
		},
		components: {
			Swiper, SwiperItem, XButton,SeeMore, browserUtils, Toast
		},
		ready:function(){
			
			this.$dispatch.apply(this,['onTitleChanged',{title:'领券中心',back:true}])

			if (typeof(JsBridge) != 'undefined'){
				JsBridge.setTitle("领券中心");
			}
			
			var query = this.$route.query;
			this.mode = query.mode;

			setTimeout(function(){
				if (typeof(JsBridge) != 'undefined'){
					JsBridge.showRightBtn('http://' +  window.location.host + '/minecoupon');
				}
			}, 1000);


			this.screenW = window.screen.width;

            // if (window.screen.width <= 320) {
            // 	this.couponDesc = '';
            // } else {
            // 	this.couponDesc = '有效期:';
            // }

			// this.getToken();

		},
		data:function(){
			return {
				mode:0,//mode为0则不选择优惠券
				offset: 0,
				max: 10,
				data:[],
				canAcquire: true,
				couponDesc: '有效期:',
				needToast: false,
				toastTips: '',
				screenW: 0,
			}
		},
		methods: {
			getToken(){
	            if(!window.userinfo){
	                if (typeof(JsBridge) != 'undefined'){
	                    var qToken = this.$route.query.token;
	                    var nToken = JsBridge.getTokenFromNative();
	                    log('qToken:' + qToken + ' nToken:' + nToken);
	                    // alert('qToken:' + qToken + ' nToken:' + nToken);
	                    if(qToken){
	                        this.token = qToken;
	                        window.userinfo = {
	                            token:qToken
	                        };
	                    }else if(nToken){
	                        this.token = nToken;

	                        window.userinfo = {
	                            token:nToken
	                        };
	                    }else{
	                        this.$route.router.go({name: 'login'});
	                    }

	                    
	                }else if(browserUtils.versions().weixin){
	                    this.$route.router.go({name: 'login'});
	                } else {
	                    this.$route.router.go({name: 'login'});
	                }
	            }else{
	                this.token = window.userinfo.token;
	                // alert('window.userinfo.token:' + window.userinfo.token);
	            }
	            log('token:' + this.token);
	            // alert('token:' + this.token);
	        },
			getCoupons (){
				setTimeout(function() {
					this.$http.post('',{
					act: 'coupon_getCoreList',
					offset: this.offset,
					max: this.max
					}).then(function (result) {
						let resp = result.data;
						if (resp.code == 200) {
							if (resp.datalist.length > 0) {
								this.data = this.data.concat(resp.datalist);
								if (resp.datalist.length < this.max) {
									this.$broadcast('$InfiniteLoading:noMore');
								} else {
									this.$broadcast('$InfiniteLoading:loaded');
								}
							} else {
								this.$broadcast('$InfiniteLoading:noMore');
							}
						} else if (resp.code == 229){
							this.$broadcast('$InfiniteLoading:noMore');
						} else {
							this.$broadcast('$InfiniteLoading:loaded');
						}
					});
					
					this.offset += this.max;
				}.bind(this), 1000);
			},
			onSelect(item){
				if(this.mode){
					log('选择优惠券');
					this.setOrderCoupon(item);
					history.back();
				}
			},
			acquireCoupon(item) {
				this.getToken();

				if (this.token == undefined) {
					return;
				};

				if (this.canAcquire == false) {
					// alert('请耐心等待');
					return;
				};

				this.canAcquire = false;
				setTimeout(function() {
					this.$http.post('',{
					act: 'coupon_addCoreCoupon',
					id: item.id
					}).then(function (result) {
						let resp = result.data;
						if (resp.code == 200) {
							// alert('领取成功');
							this.toastTips = '领取成功';
							this.needToast = true;

							item.ischeck = 1;
						} else {
							// alert(resp.message);
							this.toastTips = resp.message;
							this.needToast = true;
						}
						this.canAcquire = true;
					});
				}.bind(this), 1000);
			},
			useCoupon(item) {
				// alert('使用优惠券'+ item.use_type + ' , ' + item.params);
				if (typeof(JsBridge) != 'undefined'){
					JsBridge.couponJump(item.use_type, item.params);
				} else {
					//1好物 2拍卖 3通用 4频道 5优选 6单品
					if (item.use_type == 1) {//好物券：跳转【好物】首页
						this.goShop();
					} else if (item.use_type == 2) {//拍卖券：跳转【拍卖】首页
						this.goAuction();
					} else if (item.use_type == 3) {//通用券：跳转到【好物】首页
						this.goShop();
					} else if (item.use_type == 4) {//频道券：跳转指定的频道详情
						this.goChannel(item.params);
					} else if (item.use_type == 5) {//优选券：跳转指定的专题详情
						this.goPreference(item.params);
					} else if (item.use_type == 6) {//单品券：跳转指定的商品详情
						this.goGood(item.params);
					}
				}
			},
			goAuction:function(){
				this.$route.router.go({
					name: 'auction',
				});
			},
			goShop: function() {
				this.$route.router.go({
					name: 'shop_index',
				});
			},
			goGood: function (id) {
				// if (typeof(JsBridge) != 'undefined') {
				// 	JsBridge.openMallProductDetail(item.id);
				// 	return;
				// };
				if (id > 0) {
					this.$route.router.go({
						name: 'mallProductDetail_item',
						params: {
							id: id
						}
					});
				};
			},
			goChannel:function(id){
				
				this.$route.router.go({
					name: 'channelDetail_item',
					params: {
						id: id
					}
				});
			},
			goPreference:function(id){
				this.$route.router.go({
					name: 'preferenceDetail_item',
					params: {
						id: id
					}
				});
			},
		},
	}
</script>

<style>
	.list {
		/*padding-right: 15px;*/
		/*padding: 15px;*/
		margin-left: 10px;
		padding-top: 10px;
	}
	.content-bg {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgb(239,239,239);
		z-index: -1;
	}
	.coupon-a {
	    height: 100px;
	    display: flex;
	    /*width: 92%;*/
	    /*border: 1px solid #e7e7e7;*/
/*	    display: box;
	    display: -webkit-box;
	    display: -moz-box;
	    display: -ms-box;
	    display: -o-box;*/

	    /*background-color: white;*/

	    /*margin: 10px;*/
	    margin-right: 10px;
	    /*margin-bottom: 10px;*/
	    /*overflow: hidden;*/
	}
	.coupon-left {
		height: 100px;
	    width: 80px;
	    min-width: 80px;
	    /*margin-top: 10px;*/
	    background-size: 75px 75px;
	    background-color: white;
	    float: left;
	}
	.coupon-desc {
	    display: flex;
        flex-direction: column;
        align-content: space-between;
        align-items: center;
	}
	.coupon-amount {
		display: flex;
		flex-direction:row;
	}
	.coupon-price {
	    /*display: inline;*/
	    font-size: 28px;
	    height: 28px;
	    line-height: 28px;
	    font-weight: bold;
	    position: relative;
	    top: 20px;
	    /*background-color: orange;*/
	    color: rgb(88,188,154);
	    justify-content: center;
	    text-align: center;
	}
	.coupon-rmb {
	    /*display: inline;*/
	    font-size: 17px;
	    height: 17px;
	    line-height: 17px;
	/*    font-weight: bold;*/
	    position: relative;
	    top: 30px;
	    color: rgb(88,188,154);
	}
	.coupon-remark {
	    /*display: inline;*/
	    font-size: 12px;
	    height: 12px;
	    line-height: 12px;
	    /*font-weight: bold;*/
	    position: relative;
	    top: 35px;
	    color: rgb(88,188,154);
	    width: 100%;
	    /*background-color: orange;*/
	    justify-content: center;
	    text-align: center;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden;
	}
	.pro-content {
		/*margin-top: 10px;*/
	    height: 100px;
/*	    display: flex;
	    flex: 1;*/
/*	    box-flex: 1;
	    -webkit-box-flex: 1;
	    -moz-box-flex: 1;
	    -ms-box-flex: 1;
	    -o-box-flex: 1;*/
	    /*margin-left: 10px;*/
	    background-color: white;
	    flex: 1;
	    /*margin-right: 15px;*/
	}
	.pro-info {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: box;
	    display: -webkit-box;
	    display: -moz-box;
	    display: -ms-box;
	    display: -o-box;
	    line-clamp: 2;
	    -webkit-line-clamp: 2;
	    -moz-line-clamp: 2;
	    -ms-line-clamp: 2;
	    -o-line-clamp: 2;
	    box-orient: vertical;
	    -webkit-box-orient: vertical;
	    -moz-box-orient: vertical;
	    -ms-box-orient: vertical;
	    -o-box-orient: vertical;
	    word-break: break-all;
	    font-size: 14px;
	    color: #232326;
	    height: 30px;
	    /*line-height: 15px;*/
	    /*margin-bottom: 10px;*/
	    margin-top: 20px;
	}
	.pro-info-line1 {
		line-height: 30px;
		/*background-color: blue;*/
	}
	.pro-info-line2 {
		line-height: 15px;
		/*background-color: orange;*/
	}
	.coupon-validetime {
	    position: relative;
	    color: gray;
	    top: 12px;
	    font-size: 10px;
	    /*text-overflow: ellipsis;*/
	    /*white-space: nowrap;*/
	    /*overflow: hidden;*/
	    /*margin-right: 10px;*/
	}
	.coupon-time-bigfont {
		top: 12px;
		font-size: 12px;
	    line-height: 12px;
	    height: 12px;
	}
	.coupon-time-smallfont {
		top: 12px;
		font-size: 10px;
	    line-height: 10px;
	    height: 10px;
	}
	.coupon-right {
		width: 75px;
	    height: 100%;
	    /*background-color: rgb(88,188,154);*/

	    /*margin-right: 10px;*/
	    /*margin-left: 4px;*/
	    /*position: relative;*/
	    /*right: 0px;*/
	    /*float: right;*/
	    /*border-radius: 0px 5px 5px 0px*/
	}
	.color-available {

	}
	.color-unavailable {

	}
	.triangle-border-right {
	    height: 100%;
	    width: 6px;
	    position: absolute;
	    left: -5px;
	    z-index: 1
	}
	.circular0 {
	    position: absolute;
	    height: 12px;
	    width: 12px;
	    border-radius: 6px 6px 6px 6px;
	    background-color: #f3f5f7;
	    left: -3px;
	    top: -6px;
	    z-index: 2
	}
	.circular1 {
	    position: absolute;
	    height: 12px;
	    width: 12px;
	    border-radius: 6px 6px 6px 6px;
	    background-color: #f3f5f7;
	    left: -3px;
	    bottom: -6px;
	    z-index: 2
	}
	.change-block {
	    width: 75px;
	    height: 100%;
	    margin: 0px;
	    padding: 0px;
	    box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	    -moz-box-sizing: border-box;
	    -ms-box-sizing: border-box;
	    -o-box-sizing: border-box
	}
	.progress-text {
	    display: block;
	    font-size: 12px;
	    color: white;
	    width: 100%;
	    text-align: center;
	    height: 12px;
	    line-height: 12px;
	    margin-top: 15px
	}
	.progress-bar-block {
		width: 50px;
	    margin-left: 12px;
	    margin-right: 12px;
	    padding-top: 22px
	}
	.progress-bar {
	    width: 50px;
	    height: 2.5px;
	    border-radius: 1.25px;
	    /*background-color: #13a1fa*/
	    background-color: rgb(22,131,105);
	}
	.bar-span {
	    display: block;
	    height: 100%;
	    width: 50%;
	    background-color: #fff;
	    border-radius: 5px
	}
	.coupon-btn {
	    border: 1px solid white;
	    color: #f74949;
	    position: relative;
	    font-size: 12px;
	    top: 12px;
	    /*width: 80px;*/
	    height: 20px;
	    color: white;
	    padding-top: 1px;
	    padding-bottom: 1px;
	    padding-left: 10px;
	    padding-right: 10px;
	    margin-left: 8px;
	    border-radius: 10px; 
	}
	.coupon-btn-use {
	    border: 1px solid white;
	    color: #f74949;
	    position: relative;
	    font-size: 12px;
	    top: 6px;
	    /*width: 80px;*/
	    height: 20px;
	    color: white;
	    padding-top: 1px;
	    padding-bottom: 1px;
	    padding-left: 10px;
	    padding-right: 10px;
	    margin-left: 8px;
	    border-radius: 10px; 
	}
	.coupon-blue .coupon-right .triangle-border-right i {
	    display: block;
	    border: 2px solid transparent;
	    /*border-right: 3px solid #42b6ff;*/
	    border-right: 3px solid rgb(88,188,154);
	    border-left: 3px solid #fff;
	    width: 0px;
	    height: 1px
	}
	.img-hint {
		margin-left: 10px;
	    width: 55px;
	    height: 55px;
	    overflow: hidden;
	}
	.nexttime-hint {
	    color: rgb(99,99,99);
	    position: relative;
	    font-size: 12px;
	    top: 6px;
	    /*width: 80px;*/
	    height: 20px;
	    margin-left: 12px;
	    border-radius: 10px; 
	}
	.available-bg {
		background: url(../../assets/img/coupon/green_bg.png) no-repeat 0 0;background-size: 100% 100%;
		/*background-repeat: repeat-x; */
		/*background-size: cover;*/
	}
	.unavailable-bg {
		background: url(../../assets/img/coupon/gray_bg.png) no-repeat 0 0;background-size: 100% 100%;
		/*background: url(../../assets/img/coupon/gray_bg.png) center;*/
		/*background-size: cover;*/
	}
</style>