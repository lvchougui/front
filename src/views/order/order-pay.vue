<style type="text/css">
	.weui_media_title {
		height: 27px;
		line-height: 27px;
	}
	.btm-bar {
		position: fixed;
		bottom: 0;
		background-color: rgba(255,255,255,0.8);
		border-top: 1px solid #ddd;
		width: 100%;
		height: 45px;
		line-height: 45px;
		padding: 0 12px;
	}
	.order-panel a.weui_panel_ft {
		color: #595959 !important;
	}
	.order-panel a.weui_panel_ft:after {
	    border: none !important;
	}
	.order-panel .weui_media_desc {
		font-size: 14px;
		margin-top: 5px;
		color: #58bc9a;
	}
	.address-cell {

	}
	.pay-dialog .weui_dialog{
		padding: 12px;
		width: 60%;
	}
	.pay-dialog .weui_dialog p {
		padding: 12px 0;
	}
	.pay-dialog .weui_dialog a {
		display: inline-block;
		border-radius: 3px;
		height: 30px;
		line-height: 30px;
		border:1px solid #58bc9a;
		color: #58bc9a !important;
		padding: 0 16px;
	}
</style>
<template>
	<div class="padding-12">
		<p style="color:#999;font-size:12px;">友情提示</p>
	    <p style="font-size:14px;line-height:1.2;" class="mt-8">请在5分钟内完成付款哦，超时未支付的订单请致电我们的客服人员。客服热线：400-600-9650</p>
    </div>
    <panel class="order-panel" :header="header" :list="list" :footer="footer" type=1></panel>

    <group title="选择地址">
		<cell class="address-cell" title="添加地址" is-link 
		    v-if="order.address == undefined || order.address.id == undefined"
				@click="this.$route.router.go('/my/address-list?mode=1')">
			<img slot="icon" width="25" style="display:block;margin-right:5px;" 
				src="../../assets/img/icon_address.png">
		</cell>
		<panel :list="addressPanels" :footer="{title:'切换地址',url:'/my/address-list?mode=1'}" type=2
		    v-if="order.address != undefined && order.address.id != undefined"></panel>
    </group>


	<group title="优惠券" v-if="order.usefulcoupons">
		<cell :title="couponHeader" is-link @click = "this.$route.router.go('/coupons/list?mode=1&type=1&amount='+this.order.price);">
			<img slot="icon" width="25" style="display:block;margin-right:5px;" src="../../assets/img/icon_coupon.png">
		</cell>
	</group>

    <group title="支付方式" style="margin-bottom:60px">
		<cell title="支付宝支付" @click="type = 1" v-if="alipayEnable">
			<img slot="icon" width="28" style="display:block;margin-right:5px;" src="../../assets/img/icon_pay_alipay.png">
			<span style="float:right;" class="text-primary" v-if="type == 1">√</span>
		</cell>
		<cell title="微信支付" @click="type = 2" v-if="wxpayEnable">
			<img slot="icon" width="28" style="display:block;margin-right:5px;" src="../../assets/img/icon_pay_wechatpay.png">
			<span style="float:right;" class="text-primary" v-if="type == 2">√</span>
		</cell>
    </group>

    <div class="btm-bar vux-center-v">
    	<span class="text-primary" >合计：¥ {{ order.price }}</span>
    	<x-button style="margin-right:20px;width:60px;" class="fr" mini type="warn" 
	    	@click="getPayData">结算</x-button>
    </div>
    <confirm :show.sync="showConfirm" 
			title="支付结果" 
			@on-cancel="onCancel" 
			@on-confirm="onConfirm" 
			cancel-text="不支付了"
			confirm-text="是的">
      <p style="text-align:center;">确认您已完成支付?</p>
    </confirm>
    
    <dialog class="pay-dialog" :show.sync="payDialog">
    	<h4>支付清单</h4>
    	<p>{{order.name}}</p>
    	<a id="paylink" target="_blank" @click="confirmPay">确认支付 ¥{{order.price}}</a>
    </dialog>

</template>
<script>

	import Card from 'vux/dist/components/card'
	import Panel from 'vux/dist/components/panel'
	import Group from 'vux/dist/components/group'
	import Cell from 'vux/dist/components/cell'
	import XButton from 'vux/dist/components/x-button'
	import Confirm from 'vux/dist/components/confirm'
	import Dialog from 'vux/dist/components/dialog'

	import { orderPaying, getOrderAddress, getOrderCoupon } from '../../vuex/getters'
	import { setOrderAddress, setOrderCoupon } from '../../vuex/actions'

	import browser from '../../lib/browser-helper'
	import wx from 'weixin-js-sdk'
	import constants from '../../const'


	const ALIPAY = 1, WXPAY = 2;
	const MALL = 1, AUCTION = 2;

	export default {
		components:{
			Card, Panel,Group,Cell,XButton, Confirm, Dialog
		},
		vuex: {
			actions:{
				setOrderAddress, setOrderCoupon
			},
			getters: {
				order: orderPaying,
				selectedAddress: getOrderAddress,
				getOrderCoupon
			}
		},

		ready(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'订单支付',back:true}])
			this.getPayTypes();
		},
		beforeDestroy(){
			// 清除已选择的地址
			this.setOrderAddress(undefined);
			this.setOrderCoupon(undefined);
		},
		data(){

			log(this.selectedAddress);

			var addr = this.order.address;
			if(this.selectedAddress != undefined){
				addr = this.order.address = this.selectedAddress;
				this.changeOrderAddr(addr);
			}

			log(this.getOrderCoupon);
			
			var selectedCoupon = this.getOrderCoupon;

			return {
				type:ALIPAY,
				coupon:this.getOrderCoupon,
				couponHeader:selectedCoupon == undefined ? '未选择': selectedCoupon.coupon_desc,
				showConfirm:false,
				alipayEnable:true,
				wxpayEnable:true,
				payDialog:false,
				addressPanels:[{
			        title: addr.receiver+'   '+addr.phone,
			        desc: addr.state+addr.city+addr.region+addr.address,
			        url: '/my/address-list?mode=1'
				}],
				header:'下单时间：'+this.order.createTime,
				list: [{
			        src: this.order.imgUrl,
			        title: this.order.name,
			        desc: '¥ '+this.order.price,
			        url: '/mall/detail/'+this.order.productId
			    }],
	            footer: {
			        title: '订单编号：'+this.order.orderId
			    }

			}
		},
		methods:{
			getPayTypes(){
				var ver = browser.versions();
				// 不是在App内打开
				if(typeof JsBridge == 'undefined'){
					if(ver.weixin){
						this.alipayEnable = false;
						this.type = WXPAY;
					}else{
						this.wxpayEnable = false;
						this.type = ALIPAY;
					}
				}

			},
			confirmPay(){
				this.payDialog = false;
				this.showConfirm = true;
			},

			getPayData(){

				var body = {
					act:'payment_getInfo',
					oid:this.order.orderId,
					cid:this.coupon.id,
					otype:'mall',
					returnUrl:'',
					ptype:'alipay' // 默认支付宝支付
				}

				var cb; // 调起支付的方法
				var ver = browser.versions();
				// 不是在App内打开，是在浏览器内打开
				if(typeof JsBridge == 'undefined'){
					// 在微信内打开
					if(ver.weixin){
						body.ptype = 'h5wxpay' // 使用微信公众号支付
						var obj = {
						    timestamp: data.timeStamp,
						    nonceStr: data.nonceStr,
						    package: data.package,
						    signType: data.signType,
						    paySign: data.sign,
						    success: function(res) {
						    	log(res);
						      // 支付成功后的回调函数
						      if(res.err_msg == "get_brand_wcpay_request：ok" ) {

						      }
						    }
						  };

						wx.chooseWXPay(obj);
					}
					// 否则
					else{
						body.ptype = 'wapalipay' // 使用支付宝WAP支付
						body.returnUrl = constants.getOrderPaySuccessUrl(this.order.orderId);
						log("===>> return_url :: " + body.returnUrl);

						cb = (data)=>{
							document.getElementById('paylink').href=data.geturl;
							this.payDialog = true;
						};
					}
				}

				// App内打开：根据type判断
				else{
					switch(this.type){
						case WXPAY:
							body.ptype = 'wxpay'
							cb = (data)=>{
								JsBridge.alipay(JSON.stringify(data));
							};
						break;
						case ALIPAY:
						default:
							body.ptype = 'alipay'
							cb = (data)=>{
								if(data.paydata == undefined){
									return;
								}
								JsBridge.alipay(data.paydata);
							};
						break;
					}
				}

				// 获取支付参数
				this.$http.post('',body)
				.then(result=>{
					var resp = result.data;
					log(resp);

					if(resp.code != 200){
						return;
					}

					cb(resp.data);

				})
			},

			changeOrderAddr(addr){
				this.$http.post('',{
					act:'mallorder_addAddress',
					oid:this.order.orderId,
					addid:addr.id
				}).then(result=>{
					var resp = result.data;
					log(resp);

					if(resp.code != 200){

					}
				})
			},

			onCancel(){
				this.showConfirm = false;
			},
			onConfirm(){
				// 完成支付：跳转订单详情页
				this.showConfirm = false;
				this.$route.router.replace('/my/mall-order/item/'+this.order.orderId);
			}

		}
	}
</script>