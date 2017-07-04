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
		 background-color: #fafafa;;
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

	.alipay .aliPayImg{
        width:40px;
        height:40px;
        margin-top:10px;
        margin-left:10px;
        float:left;
	}
	.alipay p{
		float:left;
		height:40px;
		line-height:40px;
		margin-top:10px;
		margin-left:10px;
		font-size:20px
	}
	.alipay .aliPayOn{
        float:right;
        width:30px;
        height:30px;
        margin-right:15px;
        margin-top:15px;
	}	
	.alipay .aliPayOff{
		float:right;
		width:30px;height:30px;
		margin-right:15px;
		margin-top:15px;
	}

	.weixinPay{
		height:60px;
	}

	.weixinPay p{
		float:left;
		height:40px;
		line-height:40px;
		margin-top:10px;
		margin-left:10px;
		font-size:20px;
	}

	.weixinPay .weixinPayimg{
        width:40px;
        height:40px;
        margin-top:10px;
        margin-left:10px;
        float:left;
	}

	.weixinPay .weinxinOnImg{
		float:right;
		width:30px;
		height:30px;
		margin-right:15px;
		margin-top:15px;
	}

	.weixinPay .weixinOffImg{
		float:right;
		width:30px;
		height:30px;
		margin-right:15px;
		margin-top:15px;
	}

</style>

<template>

    <group title="提现方式" >
         <div class="alipay">
         	  <img 
         	  class="aliPayImg" 
         	  src="../../assets/img/icon_pay_alipay.png"/>
         	  <p>支付宝支付</p>
         	  <div @click = "selectAliPay">
         	  	  <img 
	         	  	  class="aliPayOn" 
		         	  v-show = "aliPayOn"
		         	  src="../../assets/img/radio_on.png" >
	         	  <img 
		         	  class="aliPayOff" 
		         	  v-show = "alipayOff" 
		         	  src="../../assets/img/radio_off.png">
         	  </div>
         	  
         </div>

         <div 
         class="weixinPay" 
         v-show = "mallBoleans">
         	  <img
         	     class = "weixinPayimg"
         	     src="../../assets/img/icon_wechat.png"/>
         	  <p>微信支付</p>
         	  <div  @click = "selectWeixinPay">
	         	  <img
	         	  class = "weinxinOnImg"
	         	  v-show = "weixinpayOff"
	         	  src="../../assets/img/radio_off.png">
	         	  <img 
	         	  class= "weixinOffImg" 
	         	  v-show = "weixinpayOn"
	         	  src="../../assets/img/radio_on.png">
         	  </div>
         	  
         </div>
    </group>

    <div class="cell" @click = "showMall">
    	 <p>更多提现方式...</p>
    </div>

    <group title="提现账号" style="margin-top:10px">
          <x-input 
	          name="" 
	          placeholder="请输入您的提现账号"  
	          :value.sync="data.account" 
	          style = "height:30px">
          </x-input>
    </group>

    <group title="提现金额">
         <x-input 
	         name="" 
	         placeholder="请输入您的提现金额"  
	         :value.sync="data.amount" 
	         style = "height:30px">
         </x-input>
    </group>

	    <x-button  
		    type="warn" 
		    style = "width:80%;margin-top:20px;margin-left:10%" 
		    @click = "withdrawDeposit">确认提现
	    </x-button>
    
</template>

<script>
		import Cell from 'vux/dist/components/cell'
		import Group from 'vux/dist/components/group'
		import Radio from 'vux/dist/components/radio'
		import XInput from 'vux/dist/components/x-input'
		import XButton from 'vux/dist/components/x-button'

	export default {

		route:{
			data(){
				document.title = "提现";
			}
		},
		components: {
			Cell,
			Group,
			Radio,
			XInput,
			XButton
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'提现',back:true}])
		},
		methods: {

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
			selectWeixinPay:function(){
				this.weixinpayOn = true;
				this.weixinpayOff = false;
				this.aliPayOn = false;
				this.alipayOff = true;
			},

			//确认提现按钮
			withdrawDeposit:function(){
				log(this.data.account);
				if (this.data.account && this.data.account) {
				
					let select = "alipay";
					if (this.aliPayOn) {
					   select = "alipay";
					}

					if (this.weixinpayOn) {
						select = "wxpay"
					}

					if (this.data.amount && this.data.account) {
						this.recharge(select);
					}else{
						alert("请输入充值的金额或账户");
					}

				}else{
					alert("请输入提现账户或金额");
				}
			},

			recharge:function(paytype){
				log(this.data.amount);
				log(this.data.account);
				log(paytype);
		    	this.$http.post('', {
					act:'balance_withdrawals',
					accountType:paytype,
					amount:this.data.amount,
					cardnum:this.data.account
				}).then((result) => {
					if (result.data.code == 200) {
						 this.data = result.data.data;
						 alert("提现成功");
					} else {
						alert("请检查你的网络信息");
					}
				})
		    },
		},
		data (){
			return {
				data: {
					account:'',
					amount:''
				},
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
