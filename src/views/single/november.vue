<template>
	<div class="content">
		<img src="../../assets/img/november-1.jpg" class="bg">
		<img src="../../assets/img/november-2.jpg" class="bg" v-if="!inApp">
		<div class="bg bg-center">
			<input type="tel" placeholder="输入手机号码" class="inputPhone" v-model="phone" v-if="!inApp">
			<div class="inputBtn" @click="getIt">点击领取红包</div>
		</div>
		<img src="../../assets/img/november-4.jpg" class="bg">
	</div>
	<div class="redPop" v-if="showRedBags==true" transition="rise">
		<div class="placeholder" @click="redDown"></div>
		<img src="../../assets/img/redbag-1.png" class="bg">
		<div class="money">￥<big>{{amount}}</big>元</div>
		<div class="bg bg-top-center">
			<div class="note">红包已放入您的账号：{{accountPhone}}中</div>
			<div class="note">请在您的个人账户中查询</div>
			<!--			<div class="shareBtn" @click="showShareMenu">分享还可领微信红包</div>-->
			<div class="shareBtn" @click="goUse">立即使用</div>
		</div>
		<img src="../../assets/img/redbag-3.jpg" class="bg">
	</div>
	<loading :show="loading" text="正在处理"></loading>
	<toast :show.sync="toast" type="text">{{msg}}</toast>
</template>

<script>
	import Loading from 'vux/dist/components/loading'
	import Toast from 'vux/dist/components/toast'
	import browserUtils from '../../lib/browser-helper'
	import wx from 'weixin-js-sdk'
	import {
		configShare
	}
	from '../../lib/wxclient'
	import config from '../../appConfig'

	export default {
		components: {
			Loading,
			Toast
		},
		ready() {
			document.title = "双十一，让红包飞起来";
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '双十一，让红包飞起来',
				back: true
        	}]);
			this.$dispatch('hideNavBar');
			this.shareWeChat();
			//从url得到用户信息
			if (this.$route.query.code) {
				this.phone = this.$route.query.phone
				this.loading = true
				this.$http.post('', {
					act: 'wchat_getWxUser',
					code: this.$route.query.code
				}).then((result) => {
					var resp = result.data;
					if (resp && resp.code == 200) {
						var userinfo = resp.data;
						//领取红包
						if (userinfo.nickname != null) {
							this.getRed(userinfo)
						} else {
							this.getRed(window.userinfo)
						}
					}
				});
			}
		},
		methods: {
			getToken() {
					if (!window.userinfo) {
						if (typeof (JsBridge) != 'undefined') {
							var qToken = this.$route.query.token;
							var nToken = JsBridge.getTokenFromNative();
							if (qToken) {
								this.noAddress = true;
								this.token = qToken;
								window.userinfo = {
									token: qToken
								};
							} else if (nToken) {
								this.token = nToken;
								window.userinfo = {
									token: nToken
								};
							} else {
								this.$route.router.go({name: 'login'});
							}
						} else if (browserUtils.versions().weixin) {
							this.$route.router.go('/duobao/phone');
						} else {
							this.$route.router.go({
								name: 'login'
							});
						}
					} else {
						this.token = window.userinfo.token;
					}
				},
				getIt() {
					if (this.inApp) {
						this.getToken()
						this.getRed(window.userinfo)
					} else if (this.inBrowser) {
						if (this.phone.length != 11) {
							this.msg = "请输入正确的手机号码"
							this.toast = true
							return
						}
						this.getRed()
					} else {
						if (this.phone.length != 11) {
							this.msg = "请输入正确的手机号码"
							this.toast = true
							return
						}
						var authUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + 'wxd0cdf72977282962' +
							'&redirect_uri=' + 'http%3A%2F%2Fm.yipaiquan.com%2Fwxauth.php%3F__r%3D1111%26phone=' + this.phone +
							'&response_type=code&scope=snsapi_userinfo&state=' + (path ? path : '') + '#wechat_redirect';
						window.location = authUrl
					}
				},
				getRed(userinfo) {
					var body = {
						act: "activity_act11",
						group: "activity"
					}
					if (!this.inApp && !this.inBrowser) {
						body.phone = this.phone
						if (userinfo.logo) {
							body.logo = userinfo.logo
							body.name = userinfo.nickname
							body.openid = userinfo.wxopenid
							this.logo = userinfo.logo
							this.shareWeChat();
						}
					}
					if (this.inBrowser) {
						body.phone = this.phone
					}

					this.$http.post('', body).then((result) => {
						if (result && result.data && result.data.code == 200) {
							this.loading = false
							this.showRedBags = true
							document.body.style.overflow = 'hidden';
							this.amount = result.data.data.amount
							this.accountPhone = result.data.data.phone
						} else {
							this.loading = false
							this.msg = result.data.message
							this.toast = true
						}
					})
				},
				redDown() {
					this.showRedBags = false
					document.body.style.overflow = 'visible';
				},
				shareWeChat: function () {
					var that = this;
					setTimeout(() => {
						var shareInfo = {
							title: "艺拍圈双11，红包任性抢",
							desc: "美物好物尽在这里，最低0元起拍，还有现金红包送哦，疯抢就现在！",
							link: "http://m2.yipaiquan.com/#!/single/november",
							imgUrl: "http://cdn.tiangongyipin.com/ypq/banners/11.11.jpg?x-oss-process=image/resize,w_400"
						};
						if (this.logo != null) {
							shareInfo.imgUrl = this.logo
						}
						if (this.amount != null) {
							shareInfo.desc = "人品大爆发！我抢到" + (300 + this.amount) + "元大礼包，邀你来参加~"
						}
						configShare(shareInfo);
						this.$dispatch('shareInfo', shareInfo);
					}, 500);
				},
				showShareMenu: function () {
					wx.showOptionMenu()
				},
				goUse: function () {
					if (this.inApp) {
						JsBridge.close();
					} else {
						window.location = "http://m2.yipaiquan.com/"
					}
				}
		},
		data() {
			return {
				phone: '',
				logo: null,
				amount: null,
				accountPhone: '',
				toast: false,
				loading: false,
				msg: '',
				showRedBags: false,
				inApp: false,
				inBrowser: false
			}
		},
		events: {
			'inApp' () {
				this.inApp = true
			},
			'inBrowser' () {
				this.inBrowser = true
			},
		}
	}
</script>

<style type="text/css" scoped>
	.bg {
		width: 100%;
		height: auto;
		display: block;
	}
	
	.bg-center {
		background-image: url(../../assets/img/november-3.jpg);
		background-repeat: repeat-y;
		background-size: 100% auto;
		text-align: center;
	}
	
	.inputPhone {
		height: 36px;
		line-height: 36px;
		border-radius: 18px;
		border: none;
		font-size: 16px;
		text-align: center;
		width: 50%;
		margin: 8px auto 8px auto;
	}
	
	.inputBtn {
		height: 36px;
		line-height: 36px;
		border-radius: 18px;
		font-size: 16px;
		margin: 0 auto 0 auto;
		text-align: center;
		width: 50%;
		background-color: #7B1211;
		color: #fff;
	}
	
	.redPop {
		position: fixed;
		z-index: 9;
		bottom: 0;
		height: 100%;
		width: 100%;
		overflow-y: scroll;
	}
	
	.redPop .placeholder {
		height: 200px;
		width: 100%;
	}
	
	.bg-top-center {
		background-image: url(../../assets/img/redbag-2.jpg);
		background-size: 100% 100%;
		text-align: center;
	}
	
	.rise-transition {
		transition: all .3s ease;
		bottom: 0;
	}
	
	.rise-enter,
	.rise-leave {
		bottom: -500px;
	}
	
	.note {
		font-size: 14px;
		line-height: 20px;
		color: #fff;
	}
	
	.money {
		position: absolute;
		font-size: 18px;
		height: 60px;
		width: 100%;
		line-height: 60px;
		text-align: center;
		margin: -70px auto 0 auto;
		color: #FB890F;
	}
	
	.money big {
		font-size: 28px;
	}
	
	.shareBtn {
		height: 36px;
		line-height: 36px;
		border-radius: 18px;
		font-size: 16px;
		margin: 8px auto 0 auto;
		text-align: center;
		width: 50%;
		background-color: #F5D4A7;
		color: #8B4128;
	}
</style>