<template>
	<div class="cellwimg">
		<img :src="mainData.cover" />
		<div class="data">
			<div class="name">{{mainData.name}}</div>
			<div class="price">交纳金额: <span class="text-red">¥{{mainData.deposit}}</span></div>
			<div class="for">交纳项目:
				<span>{{mainData.depositName}}</span>
			</div>
		</div>
	</div>
	<div class="cell-title">支付方式</div>
	<div class="cell-group-dotted">
		<div class="cell" @click="paytype='alipay'">
			<div class="db-icon icon_alipay" :class="{'fade': !alipayEnable}"></div>
			<div class="name" :class="{'fade': !alipayEnable}">支付宝支付</div>
			<template v-if="alipayEnable">
				<i class="material-icons" v-if="paytype=='alipay'">radio_button_checked</i>
				<i class="material-icons" v-else>radio_button_unchecked</i>
			</template>
		</div>
		<div class="cell" @click="paytype='wapay'">
			<div class="db-icon icon_wechatpay" :class="{'fade': !wxpayEnable}"></div>
			<div class="name" :class="{'fade': !wxpayEnable}">微信支付</div>
			<template v-if="wxpayEnable">
				<i class="material-icons" v-if="paytype=='wapay'">radio_button_checked</i>
				<i class="material-icons" v-else>radio_button_unchecked</i>
			</template>
		</div>
		<div class="cell" @click="paytype='balance'">
			<div class="db-icon icon_yue" :class="{'fade': mainData.balance < mainData.deposit}"></div>
			<div class="name" :class="{'fade': mainData.balance < mainData.deposit}">余额支付
				<span class="text-grey" v-if="mainData.balance >= mainData.deposit">(¥{{mainData.balance}})</span>
				<span class="text-red" v-else>余额不足</span>
			</div>
			<template v-if="mainData.balance >= mainData.deposit">
				<i class="material-icons" v-if="paytype=='balance' && mainData.balance >= mainData.deposit">radio_button_checked</i>
				<i class="material-icons" v-else>radio_button_unchecked</i>
			</template>
		</div>
	</div>
	<div class="pay-bottom-fix">
		<div class="total">合计: ¥{{mainData.deposit}}</div>
		<button @click="callPay">提交</button>
	</div>

	<div class="scrim" v-if="balanceConfirm" @click="balanceConfirm=false"></div>

	<div class="balanceConfirm" v-if="balanceConfirm" transition="balanceConfirm">
		<div class="title">
			余额支付
			<i class="material-icons" @click="balanceConfirm=false">close</i>
		</div>
		<div class="text-red text">付款金额: ¥{{mainData.deposit}}</div>
		<div class="text">手机号: {{phone}}</div>
		<div class="input">
			<input type="number" v-model="captcha" />
			<button @click="getCaptcha">发送验证码</button>
		</div>
		<div class="btn-block" @click=balancePay>确认支付</div>
	</div>

	<confirm :show.sync="showConfirm" title="支付结果" @on-cancel="onCancel" @on-confirm="onConfirm" cancel-text="不支付了" confirm-text="是的">
		<p style="text-align:center;">确认您已完成支付?</p>
	</confirm>
	<dialog class="pay-dialog" :show.sync="payDialog">
		<h4>支付清单</h4>
		<p><span class="text-primary">{{mainData.name}}</span>拍卖保证金</p>
		<a id="paylink" target="_blank" @click="confirmPay">确认支付 ¥{{mainData.deposit}}.00</a>
	</dialog>
</template>

<script>
	import Dialog from 'vux/dist/components/dialog'
	import Confirm from 'vux/dist/components/confirm'

	import browserUtils from '../../lib/browser-helper'
	import wx from 'weixin-js-sdk'
	import constants from '../../const'

	export default {
		ready() {
				this.$dispatch.apply(this, ['onTitleChanged', {
					title: '交纳保证金',
					back: true
				}]);
				this.id = this.$route.params.id;
				this.phone = window.userinfo.phone;
				this.getMainData();
				this.getPayTypes();
			},
			components: {
				Dialog,
				Confirm
			},
			methods: {
				getMainData: function () {
					this.$http.post('', {
						act: 'tgAuction_getDepositInfo',
						id: this.id
					}).then((result) => {
						if (result && result.data && result.data.code == 200) {
							this.mainData = result.data.data;
						}
					})
				},
				getCaptcha: function () {
					this.$http.post('', {
						act: 'captcha_getCaptcha',
						phone: this.phone,
						type: 3
					})
				},

				getPayTypes: function () {
					// 判断是否为App
					if (typeof (JsBridge) != 'undefined') {
						this.wxpayEnable = true;
						this.alipayEnable = true;
					}
					// 判断是否为微信
					else if (browserUtils.versions().weixin) {
						this.wxpayEnable = true;
						this.alipayEnable = false;
					} else {
						this.wxpayEnable = false;
						this.alipayEnable = true;
					}
				},
				confirmPay() {
					this.payDialog = false;
					this.showConfirm = true;
				},
				callPay: function () {
					if (this.paytype != 'balance') {
						var body = {
							act: 'deposit_payDeposit',
							type: this.mainData.targetid,
							id: this.id,
							amount: this.mainData.deposit,
							payType: this.payType
						};

						var cb;

						// App
						if (typeof (JsBridge) != 'undefined') {
							// App支付宝
							if (key == 'a') {
								body.ptype = 'alipay';
								cb = (data) => {
									if (data.paydata == undefined) {

										return;
									}
									JsBridge.alipay(data.paydata);
								};
							}
							// App微信
							else {
								body.ptype = 'wxpay';
								cb = (data) => {
									JsBridge.alipay(JSON.stringify(data));
								};
							}
						}
						// 微信
						else if (browserUtils.versions().weixin) {
							body.paytype = 'h5wxpay';
							body.openid = window.userinfo.wxopenid;
							cb = (data) => {

								var obj = {
									timestamp: data.timeStamp,
									nonceStr: data.nonceStr,
									package: data.package,
									signType: data.signType,
									paySign: data.sign,
									success: function (res) {
										log(res);
										// 支付成功后的回调函数
										if (res.err_msg == "get_brand_wcpay_request：ok") {}
									}
								};

								wx.chooseWXPay(obj);

							};
						}
						// 支付宝
						else if (this.paytype == 'alipay') {
							body.paytype = 'wapalipay';
							body.returnUrl = constants.getDepositSuccessUrl(this.id);
							log("===>> return_url :: " + body.returnUrl);

							cb = (data) => {
								document.getElementById('paylink').href = data.geturl;
								this.payDialog = true;
							};
						}

						this.$http.post('', body).then((result) => {
							var resp = result.data;
							log(resp);
							cb(resp.data);
						});
					}
					// 余额
					else {
						this.balanceConfirm = true;
					}
				},
				balancePay: function () {
					this.$http.post('', {
						act: 'deposit_payDeposit',
						type: this.mainData.type,
						id: this.id,
						amount: this.mainData.deposit,
						paytype: this.paytype,
						captcha: this.captcha,
					}).then((result) => {
						if (result && result.data && result.data.code == 200) {
							this.$route.router.go({
								name: 'auctionDetail_item',
								params: {
									id: this.id
								}
							});
						}else{
							alert(result.data.message);
						}
					})
				},
				onCancel() {
					this.showConfirm = false;
				},
				onConfirm() {
					// 完成支付：跳转订单详情页
					this.$route.router.go({
						name: 'auctionDetail_item',
						params: {
							id: this.id
						}
					});
				},
			},
			data() {
				return {
					id: '',
					phone: '',
					paytype: 'alipay',
					wxpayEnable: true,
					alipayEnable: true,
					mainData: [],
					balanceData: [],
					type: '',
					captcha: '',
					balanceConfirm: false,
					showConfirm: false,
					payDialog: false
				}
			},
			watch: {
				'paytype' () {
					log(this.paytype);
				}
			}
	}
</script>