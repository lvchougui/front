<style type="text/css">
	.intro-btm {
		line-height: 18px;
	}
	.intro-btm span.tip{ 
		font-size: 12px !important;
	}
	.intro-btm .price {
		font-size: 12px !important;
	}
	.cell{
		 width:100%;
		 background-color: white;
		 border-top: 0.5px dashed;
		 border-color: rgb(220,220,220);
		 height:35px;
	}
	.cell p{
		height:35px;
		line-height: 35px;
		text-align:center;
		font-size: 16px;
		color: rgb(89,87,87);
	}

	.alipay{
		height:60px;
		border-bottom:1px solid rgb(220,220,220);
	}
	.alipay p{
		float:left;
		height:40px;
		line-height:40px;
		margin-top:10px;
		margin-left:10px;
		font-size:20px;
	}
	.alipay .aliPayimg{
		width:40px;
		height:40px;
		margin-top:10px;
		margin-left:10px;
		float:left
	}
	.alipay .selectimg{
		float:right;
		width:30px;
		height:30px;
		margin-right:15px;
		margin-top:15px
	}

	.weixinPay{
		height:60px
	}

	.weixinPay .weixinPayimg{
		width:40px;
		height:40px;
		margin-top:10px;
		margin-left:10px;
		float:left
	}

	.weixinPay p{
		float:left;
		height:40px;
		line-height:40px;
		margin-top:10px;
		margin-left:10px;
		font-size:20px;
	}

	.weixinPay .selectImg{
		float:right;
		width:30px;
		height:30px;
		margin-right:15px;
		margin-top:15px;
	}


</style>

<template>
    <group title="充值方式" >
         <div class="alipay"
         v-show = "payMethod == 'a' " >
         	  <img 
         	      class="aliPayimg" 
         	      src="../../assets/img/icon_pay_alipay.png"/>
         	  <p style="">支付宝支付</p>
         	    <div @click = "selectAliPay">
	         	    <img  
	         	  	  v-show = "aliPayOn"
		         	  class="selectimg" 
		         	  src="../../assets/img/radio_on.png" >
		         	<img 
		         	  class="selectimg" 
		         	  v-show = "alipayOff"
		         	  src="../../assets/img/radio_off.png" >
         	    </div>
         </div>
<!-- v-show = "mallBoleans" -->
         <div class="weixinPay" 
         v-show = "payMethod == 'w'">
         	  <img 
         	  class="weixinPayimg"
         	  src="../../assets/img/icon_wechat.png" />
         	  <p>微信支付</p>
         	  <div @click = "selectWeixinPay">
         	  	 <img 
	         	  class = "selectImg"
	         	  v-show = "weixinpayOn"
	         	  src="../../assets/img/radio_on.png"/>
	         	  <img
	         	  class = "selectImg"
	         	  v-show = "weixinpayOff"
	         	  src="../../assets/img/radio_off.png"/>
         	  </div>
         </div>

         <div  v-show = "payMethod == 'app'">
         	
       
         <div class="alipay" >
         	  <img 
         	      class="aliPayimg" 
         	      src="../../assets/img/icon_pay_alipay.png"/>
         	  <p style="">支付宝支付</p>
         	    <div @click = "selectAliPay">
	         	    <img  
	         	  	  v-show = "aliPayOn"
		         	  class="selectimg" 
		         	  src="../../assets/img/radio_on.png" >
		         	<img 
		         	  class="selectimg" 
		         	  v-show = "alipayOff"
		         	  src="../../assets/img/radio_off.png" >
         	    </div>
         </div>
<!-- v-show = "mallBoleans" -->
         <div class="weixinPay">
         	  <img 
         	  class="weixinPayimg"
         	  src="../../assets/img/icon_wechat.png" />
         	  <p>微信支付</p>
         	  <div @click = "selectWeixinPay">
         	  	 <img 
	         	  class = "selectImg"
	         	  v-show = "weixinpayOn"
	         	  src="../../assets/img/radio_on.png"/>
	         	  <img
	         	  class = "selectImg"
	         	  v-show = "weixinpayOff"
	         	  src="../../assets/img/radio_off.png"/>
         	  </div>
         </div>

       </div>


    </group>
    <!-- 暂时提供支付宝和微信-->
   <!--  <div class="cell" @click = "showMall">
    	 <p>更多充值方式...</p>
    </div> -->

    <group title="充值金额">
        <x-input name="" placeholder="请输入您的充值金额"  :value.sync="data.amount" style = "height:30px">
        </x-input>
    </group>

    <x-button  type="warn" style = "width:80%;margin-top:20px;margin-left:10%" @click = "withdrawDeposit">确认充值</x-button>

<!--    -->
    <confirm
            :show.sync="showConfirm"
			title="支付结果" 
			@on-cancel="onCancel" 
			@on-confirm="onConfirm" 
			cancel-text="不支付了"
			confirm-text="是的">
      <p style="text-align:center;">确认您已完成支付?</p>
    </confirm>

    <dialog class="pay-dialog" :show.sync="payDialog">
    	<h4>支付清单</h4>
    	<p>充值 <span class="text-primary">¥ {{ data.amount }}</span> 元</p>
    	<a id="paylink" target="_blank" @click="confirmPay">确认支付 ¥{{ data.amount }}.00</a>
    </dialog>

</template>

<script>
		import Cell from 'vux/dist/components/cell'
		import Group from 'vux/dist/components/group'
		import XInput from 'vux/dist/components/x-input'
		import XButton from 'vux/dist/components/x-button'
		import browser from '../../lib/browser-helper'
		import Confirm from 'vux/dist/components/confirm'
		import Dialog from 'vux/dist/components/dialog'
		
		import browserUtils from '../../lib/browser-helper'
		import wx from 'weixin-js-sdk'
	    import constants from '../../const'

	export default {

		route:{
			data(){
				document.title = "充值";
			}
		},
		components: {
			Cell, Group, XInput, XButton, browser, Confirm, Dialog
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'充值',back:true}])
		},
		methods: {

			getPayTypes () {

				if( typeof(JsBridge) != 'undefined' ){  //!=app
	
					this.payMethod = 'app';
				}
				// 判断是否为微信
				else if (browserUtils.versions().weixin){  //== 微信
					alert("w")
					this.payMethod = 'w';
				}
				else {    // 支付宝付款
					alert("a")
					this.payMethod = 'a';
				}

				// if (typeof(JsBridge) != 'undefined') {
				// 	alert("app1111");
				// 	this.payMethod = 'app'
				// }
				// this.payStage=2;

			},

			//更多充值方式(暂时先去掉)
			showMall:function(){
				if (this.mallBoleans == false) {
					this.mallBoleans = true;
					return;
				}
				if (this.mallBoleans == true) {}{
					this.mallBoleans = false;
					return;
				}
			},
			//选择支付宝支付
			selectAliPay:function(){
				this.weixinpayOn = false;
				this.weixinpayOff = true;
				this.aliPayOn = true;
				this.alipayOff = false;

			},
			//选择微信支付
			selectWeixinPay:function(){
				this.weixinpayOn = true;
				this.weixinpayOff = false;
				this.aliPayOn = false;
				this.alipayOff = true;
			},
			//充值按钮
			withdrawDeposit:function(){
				
				let select = "alipay";
				if (this.aliPayOn) {
				   select = "alipay";
				}
				if (this.weixinpayOn) {
					select = "wxpay"
				}
				if (this.data.amount) {
					// this.recharge(select);
					this.callPay();
				}else{
					alert("请输入充值的金额");
				}
			},
			// recharge:function(paytype){
		 //    	this.$http.post('', {
			// 		act:'balance_recharge',
			// 		paytype:paytype,
			// 		amount:this.data.amount
			// 	}).then((result) => {
			// 		if (result.data.code == 200) {
			// 		} else {
			// 			alert("请检查你的网络信息");
			// 		}
			// 	})
		 //    },

		 //确认支付
		    confirmPay(){
				this.payDialog = false;
				this.showConfirm = true;
			},
			//发起支付
			callPay(){
				var body = {
					act:'balance_recharge',
					returnUrl:'',
					paytype:'alipay',
					amount:this.data.amount
				};
				var cb;
				// App 内支付
				if( typeof(JsBridge) != 'undefined' ){   
					// App支付宝
					if(this.payMethod == 'a'){
						body.paytype = 'alipay';
						cb = (data)=>{
							if(data.paydata == undefined){
								return;
							}
							JsBridge.alipay(data.paydata);
						};
					}
					// App微信
					else{
						body.paytype = 'wxpay';
						cb = (data)=>{
							JsBridge.alipay(JSON.stringify(data));
						};
					}
				}
				// 微信支付
				else if (browserUtils.versions().weixin){
					body.paytype = 'h5wxpay';
					body.openid = window.userinfo.wxopenid;
					cb = (data)=>{
						
						var obj = {
						    timestamp: dadtimeStamp,
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

					};
				}
				// 支付宝支付
				else{

					body.paytype = 'wapalipay';
					body.returnUrl = window.location.href.split('#')[0];
					cb = (data)=>{
						log("======================>================>");
						log(data);
						document.getElementById('paylink').href=data.geturl;
						this.payDialog = true;
					};
				}

				this.$http.post('',body).then((result)=>{
						var resp = result.data;
						log(resp);
						cb(resp.data);
					});

			},
			onCancel(){
				this.showConfirm = false;
			},
			onConfirm(){
				// 完成支付：跳转订单详情页
				this.showConfirm = false;
				// this.getMainData();
			},
		},
		data (){
			return {
				data: {
					account:'',
					amount:''
				},
				payMethod: 'a',
				showConfirm:false,
				payDialog:false,
				aliPayOn:true,
				alipayOff:false,
				weixinpayOn:false,
				weixinpayOff:true,
				mallBoleans:false,

			}
		},
		watch:{
			'data.account'(){
			
			}
		}
	}
</script>
