<style>
	.myheader{
		display: flex;
		flex-direction: column;
		clear: both;
	}
	.myheader img {
		width: 72px;
		height: 72px;
		border-radius: 36px;
		margin-top: 10px;
		margin-left: auto;
		margin-right: auto;
		box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.12), 0px 0px 4px 0px rgba(0, 0, 0, 0.24);
	}
	.setting-btn {
		margin-top: 10px;
		margin-right: 10px;
		width: 20px;
		height: 20px;
		border-radius: 10px;
		float: right;
	}
	.me-nickname{
		text-align: center;
		font-size: 14px;
		line-height: 20px;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.me-order{
		margin: 20px;
		height: 65px;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.me-order-item{
		flex: 1;
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: column;
	}
	.me-order-divider{
		width: 1px;
		height: 100%;
		background-color: #e7e7e7;
	}
	.me-order-num{
		width: 18px;
		height: 18px;
		border-radius: 15px;
		background-color: #58bc9a;
		font-size: 0.8em;
		line-height: 20px;
		margin-left: 25px;
		color: white;
		text-align: center;
		margin-bottom: -10px;
		z-index: 9999;
	}
	.me-order-status-icon{
		width: 28px;
		height: 21px;
	}
	.me-order-status{
		margin-top: 8px;
		font-size: 13px;
	}
	.divider{
		width: 100%;
		height: 10px;
		background-color: #efefef;
	}
	.home-menu {
		width: 100%;
		margin-top: 20px;
		margin-bottom: 68px;
	}
	
	.home-menu i {
		color: #969696;
		margin-right:5px;
		display: block;
	}

	.me-icon{
		width: 20px;
		height: 20px;
		margin-right: 10px;
		margin-top: 3px;
	}
	.weui_cell{
		line-height: 1;
	}
</style>
<template>
	<img class="setting-btn" src="../assets/img/settings.png"  @click = "this.$route.router.go('/set/setList');" /> 
	<div class="myheader">
		<img class="me-logo" :src="logo"  @click = "this.$route.router.go('/set/personList');" /> 
		<div class="me-nickname" >{{nickname}}</div>
	</div>
	<div class="me-order">
		<div class="me-order-item" @click="this.$route.router.go('/order/waitPayList');">
			<div class="me-order-num" v-if="orderNums.waitforpayCount>0">{{orderNums.waitforpayCount}}</div>
			<img class="me-order-status-icon" src="../assets/img/order/daifukuan.png">
			<div class="me-order-status">待付款</div>
		</div>
		<div class="me-order-divider"></div>
		<div class="me-order-item" @click="this.$route.router.go('/order/waitDeliverList');">
			<div class="me-order-num" v-if="orderNums.paidCount>0">{{orderNums.paidCount}}</div>
			<img class="me-order-status-icon" src="../assets/img/order/daifahuo.png">
			<div class="me-order-status">待发货</div>
		</div>
		<div class="me-order-divider"></div>
		<div class="me-order-item" @click="this.$route.router.go('/order/waitReceiveList');">
			<div class="me-order-num" v-if="orderNums.shippedCount>0">{{orderNums.shippedCount}}</div>
			<img class="me-order-status-icon" src="../assets/img/order/daishouhuo.png">
			<div class="me-order-status">待收货</div>
		</div>
		<div class="me-order-divider"></div>
		<div class="me-order-item" @click="this.$route.router.go('/order/finishList');">
			<div class="me-order-num" v-if="orderNums.completeCount>0">{{orderNums.completeCount}}</div>
			<img class="me-order-status-icon" src="../assets/img/order/yiwanchen.png">
			<div class="me-order-status">已完成</div>
		</div>
	</div>
	<div class="home-menu">
		<!-- <div class="divider"></div> -->
		<group>
			<cell title="帮助与客服" is-link @click="this.$route.router.go('help');" >
				<img class="me-icon" slot="icon" src="../assets/img/wodejingpai.png">
			</cell>
			<cell title="保证金" is-link @click="this.$route.router.go('mydeposit');">
				<img class="me-icon" slot="icon" src="../assets/img/mine_deposit.png">
			</cell>
			<cell title="我的优惠券" is-link @click = "this.$route.router.go('minecoupon');" >
				<img class="me-icon" slot="icon" src="../assets/img/youhuiquan.png">
			</cell>
		</group>

		<group>
			<cell title="收藏夹" is-link @click="this.$route.router.go('mycollection');">
				<img class="me-icon" slot="icon" src="../assets/img/mine_deposit.png">
			</cell>
			<cell title="我的竞拍" is-link @click="this.$route.router.go('/my/my-auctions');" >
				<img class="me-icon" slot="icon" src="../assets/img/wodejingpai.png">
			</cell>
		</group>
		<group>
			<cell title="关于天工艺品" is-link @click="this.$route.router.go('/about_us');">
				<img class="me-icon" slot="icon" src="../assets/img/about.png">
			</cell>
		</group>
	</div>
</template>

<script>
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'
	import storage from '../lib/storage-helper'
	import browserUtils from '../lib/browser-helper'
	import {
		isLogined
	}
	from '../lib/auth'
	export default {
		components: {
			Cell,
			Group,
			browserUtils
		},
		route:{
			data(){
				document.title = "我的";
			}
		},
		ready: function() {
			this.getToken();
			this.$dispatch.apply(this,['onTitleChanged',{title:'我的',back:true}]);
		},
		data() {
			return {
				defaultInfo: {
					'logo': 'http://placeholder.qiniudn.com/48x48/bbdefb/ffffff',
					'coverimg': 'http://placeholder.qiniudn.com/400x400/b2ebf2/ffffff',
					'nickname': '请登录'
				},
				'logo':'',
				'nickname':'',
				'coverimg':'',
				token: '',
				userId: 0,
				orderNums:{},
			}
		},

		methods: {
			getOrderNum(){
				// if (!isLogined(this)) {
				// 	return;
				// };
				this.$http.post('', {
					act: 'commonOrder_getOrderCount',
				}).then((result) => {
					// alert(JSON.stringify('getOrderNum:' + JSON.stringify(result.data)));
					this.orderNums = result.data.data;
				});
			},
			getToken(){
				// alert('getToken');
				// alert('userinfo:' + JSON.stringify(window.userinfo));
				if (window.userinfo){
					this.logo=window.userinfo.logo;
					this.coverimg=window.userinfo.coverimg;
					this.nickname=window.userinfo.nickname;

					this.getOrderNum();
				}else{
					this.logo=this.defaultInfo.logo;
					this.coverimg=this.defaultInfo.coverimg;
					this.nickname=this.defaultInfo.nickname;
				}
				if(!window.userinfo){

					if (typeof(JsBridge) != 'undefined'){
						var qToken = this.$route.query.token;
						var nToken = JsBridge.getTokenFromNative();

						if(qToken){
							this.token = qToken;

							window.userinfo = {
								token:qToken
							};
							this.getUserId();
						}else if(nToken){
							this.token = nToken;

							window.userinfo = {
								token:nToken
							};
							this.getUserId();
						}else{
							
								this.$route.router.go({name: 'login'});
						}
					}else if(browserUtils.versions().weixin){
	                	// this.$route.router.go('/duobao/phone');
	                	this.$route.router.go({name: 'login'});
	                } else {
	                	this.$route.router.go({name: 'login'});
	                }
	            }else{
	            	// if (browserUtils.versions().ios) {
              //           window.location.href="yipai://com.tiangong.yipai/login";
              //       }else{
              //           JsBridge.getTokenFromNative();
              //       }
              this.token = window.userinfo.token;
          }
      },
      getUserId() {
      	this.$http.post('', {
      		act: 'user_getUserByToken',
      	}).then((result) => {
      		if (result && result.data && result.data.code == 200) {
      			this.userId = result.data.data.userid;

	                    //服务器返回的Token失效，需要替换
	                    var userDict = result.data.data;
	                    userDict['token'] = this.token;

	                    window.userinfo = userDict;
	                    storage.saveUserInfo(userDict);

	                    if (window.userinfo){
	                    	this.logo=window.userinfo.logo;
	                    	this.coverimg=window.userinfo.coverimg;
	                    	this.nickname=window.userinfo.nickname;
	                    }else{
	                    	this.logo=this.defaultInfo.logo;
	                    	this.coverimg=this.defaultInfo.coverimg;
	                    	this.nickname=this.defaultInfo.nickname;
	                    }

	                    this.getOrderNum();
	                }
	            })
      },
	        //获取默认昵称
	        getDefaultData:function(){
	        	this.$http.post('',{
	        		act: 'user_getInfo',
					id: this.userId //  this.$route.params.id,   //用户的id
				}).then(function (result) {
					let primaryResp = result.data;

					if (primaryResp.code == 200) {
						let data = result.data.data;
						window.userinfo = data;

						if (window.userinfo){
							this.logo=window.userinfo.logo;
							this.coverimg=window.userinfo.coverimg;
							this.nickname=window.userinfo.nickname;
						}else{
							this.logo=this.defaultInfo.logo;
							this.coverimg=this.defaultInfo.coverimg;
							this.nickname=this.defaultInfo.nickname;
						}
						this.getOrderNum();
					}
				});
			},
		}
	}
</script>

