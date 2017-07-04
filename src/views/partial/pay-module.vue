<template>
	<div class="pay-module">
		<div class="pay-background">
		<div class="pay-card">
		<div class="pull-down" @click="missionAbort" @touchstart="missionAbort">
			<div class="bar"></div>
		</div>
		<template v-if="payStep == 'choose'">
			<div class="title">支付金额 <big>¥{{data.price}}</big> 元</div>
			<div class="pay-cellgroup">
				<div class="pay-cell" @click="payMethod = 'a'" v-if="alipayEnable">
					<div class="pay-icon icon_alipay"></div>
					<div class="label">支付宝</div>
					<i class="material-icons cell-checkbox" v-show="payMethod == 'a'">check_circle</i>
					<div class="checkbox-placeholder" v-show="payMethod != 'a'"></div>
				</div>
				<div class="pay-cell" @click="payMethod = 'w'">
					<div class="pay-icon icon_wechatpay"></div>
					<div class="label">微信支付</div>
					<i class="material-icons cell-checkbox" v-show="payMethod == 'w'">check_circle</i>
					<div class="checkbox-placeholder" v-show="payMethod != 'w'"></div>
				</div>
				<div class="pay-cell" @click="payMethod = 'b'" v-if="haveEnoughBalance">
					<div class="pay-icon icon_yue"></div>
					<div class="label">账户余额</div>
					<i class="material-icons cell-checkbox" v-show="payMethod == 'b'">check_circle</i>
					<div class="checkbox-placeholder" v-show="payMethod != 'b'" v-if="haveEnoughBalance"></div>
					<div class="sub-label">¥{{data.balance}}</div>
				</div>
				<div class="pay-cell" v-else>
					<div class="pay-icon icon_yue"></div>
					<div class="label">账户余额</div>
					<div class="sub-label" v-else>余额不足</div>
				</div>
			</div>
			<div class="pay-cellgroup" v-if="mode != 'duobao'">
				<div class="pay-cell" @click="chooseAddress">
					<i v-if="!isAndroid" class="material-icons pay-icon">location_city</i>
					<div v-else class="material ic_location_city pay-icon"></div>
					<div class="label">选择地址</div>
					<i v-if="!isAndroid" class="material-icons cell-arrow">chevron_right</i>
					<div v-else class="material ic_keyboard_arrow_right cell-arrow"></div>
					<div class="sub-label">
					<template v-if="selectedAddress">
						{{selectedAddress.city}}{{selectedAddress.region}}{{selectedAddress.address}}
					</template>
					<template v-else>没有选择地址</template>
					</div>
				</div>
				<ul class="address-list" v-if="chooseingAddress">
					<li class="address" :class="{'adderss-selected': this.selectedAddress == address}" v-for="address in addressData" @click="chooseMe(address)">
						<span class="receiver-name">{{address.receiver}}</span>
						<span class="receiver-phone">{{address.phone}}</span>
						<div class="detail">{{address.state}}{{address.city}}{{address.region}}{{address.address}}</div>
					</li>
					<li class="address-add" v-link="{name:'address-add'}">
						<i class="material-icons">add</i>
					</li>
				</ul>
			</div>
			<div class="pay-cellgroup" v-if="data.usefulcoupons > 0">
				<div class="pay-cell">
					<i class="material-icons pay-icon">local_activity</i>
					<div class="label">选择优惠券</div>
					<i v-if="!isAndroid" class="material-icons cell-arrow">chevron_right</i>
					<div v-else class="material ic_keyboard_arrow_right"></div>
				</div>
			</div>
			<div class="pay-btn" @click="goPay">
				<span v-show="!waitForPay">去支付</span>
				<span v-show="waitForPay">
					<i v-if="!isAndroid" class="material-icons">schedule</i>
					<div v-else class="material ic_query_builder"></div>
				</span>
			</div>
		</template>
		<template v-if="payStep == 'captcha'">
			<div class="title">输入验证码</div>
			<div class="phone">验证码已发送到 {{data.phone}}
				<span class="text-blue" @click="getCaptcha">重新发送</span>
			</div>
			<div class="captcha">
				<input type="text" v-model="captcha" placeholder="输入验证码"/>
			</div>
			<div class="pay-btn" @click="goPay">
				<span v-show="!waitForPay">去支付</span>
				<span v-show="waitForPay">
					<i v-if="!isAndroid" class="material-icons">schedule</i>
					<div v-else class="material ic_query_builder"></div>
				</span>
			</div>
		</template>
		<template v-if="payStep == 'conform'">
			<div class="title">确认您已完成支付?</div>
			<div class="pay-btn pay-complete" @click="missionComplete">是的</div>
			<div class="pay-btn pay-complete" @click="missionAbort">不支付了</div>
		</template>
	</div>
	<alert :show.sync="noAddress" title="地址未选择">请选择地址</alert>
	<alert :show.sync="payFailed" title="支付失败">{{failMsg}}</alert>
</template>

<script>
import browserUtils from '../../lib/browser-helper'
import wx from 'weixin-js-sdk'
import constants from '../../const'
import Alert from 'vux/dist/components/alert'
import {
		isLogined
	}
	from '../../lib/auth'

export default {
	name: 'pay-module',
	props:{
		data:[Object],
		mode: [String]
	},
	components: {
    	Alert
  	},
	ready: function () {
		if (parseInt(this.data.price) <= this.data.balance) {
			this.haveEnoughBalance = true;
		}
		this.checkIfEnable();
		if (browserUtils.versions().android) {
			this.isAndroid = true;
		}
		this.getToken();
		if (this.mode != 'duobao'){
			this.getAddress();
			if(this.data.address.receiver != ''){
				this.selectedAddress = this.data.address;
				this.chooseingAddress = false;
			}
		}
	},
	data: function() {
		return {
			inApp: false,
			isAndroid: false,
			alipayEnable: true,
			addressData: '',
			selectedAddress: '',
			chooseingAddress: false,
			token: '',
			payMethod: 'w',
			haveEnoughBalance: false,
			captcha: '',
			waitForPay: false,
			payStep: 'choose',
			noAddress: false,
			payFailed: false,
			failMsg: ''
		}
	},
	methods:{
		findPrimaryAddress(address) {
			if(address.primary === "1"){
				return address;
			}
		},
		getAddress() {
			this.$http.post('', {
				act: 'address_getAddressById',
				id: window.userinfo.id
			}).then((result) => {
				if (result && result.data && result.data.code == 200) {
					this.addressData = result.data.datalist;
					this.selectedAddress = this.addressData.find(this.findPrimaryAddress);
				}
			})
		},
		missionAbort() {
			this.chooseingAddress = false;
			this.$dispatch('missionAbort');
		},
		missionComplete() {
			this.$dispatch('missionComplete');
		},
		chooseAddress() {
			if(!this.chooseingAddress){
				this.chooseingAddress = true;
			}else{
				this.chooseingAddress = false;
			}
		},
		chooseMe(address) {
			this.selectedAddress = address;
			address.primary = 1;
			this.chooseingAddress = false;
			this.$http.post('', {
					act: 'commonOrder_addAddress',
					ordersn: this.data.orderId,
					addid: address.id
				}).then((result) => {
					if (result && result.data && result.data.code == 200) {
                    log("选择地址" + result.data.message);
                }
			})
		},
		getCaptcha () {
			this.$http.post('',{
				phone: this.data.phone,
				act:'captcha_getCaptcha'
			}).then((result)=>{
				log(resp);
			});
		},
		checkIfEnable() {
			if (browserUtils.versions().weixin) {
				this.alipayEnable = false;
			}
		},

		//Pay methods
		getToken(){
            if(!window.userinfo){
                if (typeof(JsBridge) != 'undefined'){
                    var qToken = this.$route.query.token;
                    var nToken = JsBridge.getTokenFromNative();
                    if(qToken){
                		this.noAddress = true;
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
                	this.$route.router.go('/duobao/phone');
                } else {
                    this.$route.router.go({name: 'login'});
                }
            }else{
                this.token = window.userinfo.token;
            }
        },

		goPay() {
			if(this.mode != 'duobao'){
				if(!this.selectedAddress){
					this.noAddress = true;
					return
				}
			}
            var body = {
				returnUrl: '',
				num: this.data.price
            }

            switch (this.mode) {
            	//拍卖
            	case 'auction':
            		body.act = 'payment_getInfo';
            		body.otype = 'auction';
            		body.oid = this.data.orderId;
            		break;
            	//专题购
            	case 'activity':
            		body.act = 'payment_getInfo';
            		body.otype = 'special';
            		body.oid = this.data.orderId;
            		break;
            	//今日特价
            	case 'sale':
            		body.act = 'payment_getInfo';
            		body.otype = 'bargain';
            		body.oid = this.data.orderId;
            		break;
            	//夺宝
            	case 'duobao':
            		body.act = 'record_buy';
            		body.group = 'cloud';
            		body.gid = this.data.id;
            		break;
            }

            var cb;

            //余额支付
            if (this.payMethod == 'b') {
            	if (this.captcha == '') {
            		this.getCaptcha();
            		this.payStep = 'captcha';
            		return
            	}else{
            		body.ptype = 'balance';
            		body.captcha = this.captcha;
            		cb = (data) => {
                	    if (data.paymentResult == "paid") {
                	    	this.$dispatch('missionTruelyComplete');
                	    }
                	}
            	}
            }
            // App 内支付
            else if (typeof(JsBridge) != 'undefined') {
                // App支付宝
                if (this.payMethod == 'a') {
                    body.ptype = 'alipay';
                    cb = (data) => {
                        if (data.paydata == undefined) {
                            return;
                        }
                        JsBridge.alipay(JSON.stringify(data));
                    };
                    this.waitForPay = true;
                    setTimeout(function(){
                		this.waitForPay = false;
                    	this.payStep = 'conform';
            		}.bind(this), 5000)
                }
                // App微信
                else {
                    if(navigator.userAgent.indexOf("yipaiseller") != -1){
                        body.ptype = 'zgwxpay';
                    }else{
                        body.ptype = 'wxpay';
                    };
                    cb = (data) => {
                        JsBridge.wxpay(JSON.stringify(data));
                    };
                    this.waitForPay = true;
                    setTimeout(function(){
                		this.waitForPay = false;
                    	this.payStep = 'conform';
            		}.bind(this), 5000)
                }
            }
            // 微信
            else if (browserUtils.versions().weixin) {
                body.ptype = 'h5wxpay';
                body.openid = window.userinfo.wxopenid;
                cb = (data) => {
                    var obj = {
                        timestamp: data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: data.signType,
                        paySign: data.sign,
                        success: function(res) {
                            // 支付成功后的回调函数
                            if (res.err_msg == "get_brand_wcpay_request：ok") {
                            }
                        }
                    };
                    wx.chooseWXPay(obj);
                };
            }
            //WAP支付宝
            // else {
            //     body.ptype = 'wapalipay';
            //     body.returnUrl = constants.getDuobaoSuccessUrl(this.id);
            //     log("===>> return_url :: " + body.returnUrl);

            //     cb = (data) => {
            //         document.getElementById('paylink').href = data.geturl;
            //         this.payDialog = true;
            //     };
            // }
            //获取支付数据
            this.$http.post('', body).then((result) => {
            	if(result.data.code == 200){
            		var resp = result.data;
                	cb(resp.data);
            	} else {
            		this.failMsg = result.data.message;
            		this.payFailed = true;
            	}
            });
        },
	},
	events: {
		'inApp': function(){
			this.inApp = true;
		}
	}
}
</script>