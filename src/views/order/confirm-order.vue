<style type="text/css">
	.section-title {
		padding-left: 15px;
		padding-right: 15px;
		padding-top: 10px;
		text-align: left;
		font-size: 16px;
		font-weight: bold;
	}
	.divider{
		width: 100%;
		height: 5px;
		background-color: #efefef;
	}
	.logo {
		width: 75px;
		height: 75px;
		padding: 15px;
		float: left;
	}
	.order-info {
		overflow: hidden;
		display: flex;
		flex-direction: column;
		align-content:space-between; 
		margin-left: 20px;
		vertical-align: center;
	}
	.orderName {
		text-align: left;
		color: rgb(47,47,47);
		font-size: 15px;
		/*padding-right: 30px;*/
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 15px;
		margin-right: 10px;
	}
	.price {
		text-align: left;
		color: rgb(47,47,47);
		font-size: 15px;
		padding-right: 30px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 10px;
		margin-right: 10px;
	}
	.num {
		width: 50px;
		height: 20px;
		/*background-color: red;*/
		float: right;
		margin-top: 15px;
		margin-right: 15px;
		text-align: right;
		color: rgb(47,47,47);
		font-size: 15px;
	}
	.addressBlock {
		margin: 10px;
		padding: 10px;
		border:1px solid rgb(200,200,200);
	}
	.remarks {
		margin: 10px;
		padding: 10px;
		border:1px solid #e7e7e7;
		font-size: 13px;
	}
	.negotiate {
		font-size: 15px;
	}
	.bottom-buy-confirm{
		width: 90%;
		background-color: black;
		height: 45px;
		flex-direction: row;
		display: flex;
		margin: 5%;
	}

	.bottom-buy-price-confirm{
		width: 50%;
		height: 100%;
		font-size: 16px;
		color: #fff;
		text-align: center;
		line-height: 45px;
	}

	.verticle-line-confirm{
		height: 35px;
		width: 1px;
		margin-top: 5px;
		margin-bottom: 5px;
		background-color: #ffffff;

	}
	.bottom-buy-btn-confirm{
		width: 50%;
		height: 100%;
		text-align: center;
		font-size: 15px;
		color: #fff;
		line-height: 45px;
		/*background-color: black;*/
	}
	.my-address {
		border: 1px solid #e7e7e7;
		margin: 10px;
		padding-left: 15px;
		padding-top: 15px;
		padding-bottom: 15px;
		display:-webkit-flex;
		display:flex;
		flex-wrap: wrap;
	}
	
	.content-part{
		flex-grow: 1;
	}
	.operation-part{
		width: 50px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.my-address .top  h2{
		font-weight: 400;
		display: inline;
		color: black;
	}
	
	.my-address .top p {
		margin-right: 8px;
		margin-left: 10px;
		display: inline;
	}
	
	.my-address .top i {
		float: right;
		color: #646464;
	}
	
	
	.my-address .mid p {
		line-height: 1.5;
		color: gray;
		margin-top: 5px;
	}
	.confirm_goods_name {
		/*background-color: green;*/
		display: flex;
		margin-right: 10px;
		flex: 1;
		/*height: 45px;*/
	}

	.single_price {
		display: flex;
		margin-right: 10px;
		/*display: table-cell; */
		/*vertical-align: middle;*/
		/*background-color: red;*/
		vertical-align:center;
		/*line-height: 45px;*/
		/*text-align: center;*/
		/*margin: 0 auto;*/
	}

	.confirm_order_num {
		text-align: center;
		margin-left: 10px;
		margin-right: 10px;
		line-height: 30px;
	}
	.number_img_plus {
		width: 15px;
		height: 15px;
		padding: 7.5px;
		background-color: #F5F5F5;
	}
	.number_img_minus {
		width: 15px;
		height: 4px;
		padding-left: 7.5px;
		padding-right: 7.5px;
		padding-top: 13px;
		padding-bottom: 13px;
		background-color: #F5F5F5;
	}
</style>
<template>
	<div>
		<p class="section-title">订单详情</p>
		<img class="logo" :src="goodsInfo.cover" />
		<!-- <span class="num">X1</span> -->
		
		<div style="padding-top:15px;height:75px;padding-bottom:15px;">
			<div style="display:flex;flex:1;backgrond-color:red;overflow:hidden;height:40px;">
				<p class="confirm_goods_name">{{goodsInfo.name}}</p>
				<p class="single_price">¥{{goodsInfo.price}}</p>
		    </div>
		    <div style="display:flex;flex:1;height:30px;margin-top:5px;margin-bottom:0px;margin-right:10px;text-align:center;">
				<p style="flex:1;text-align:left;line-height:30px;">数量</p>
				<div style="float:right;flex-direction:row;display:flex;">
					<img class="number_img_minus" src="../../assets/img/order/ordernum_minus.png" @click="minusOrderNum"/>
					<p class="confirm_order_num">{{buycount}}</p>
					<img class="number_img_plus" src="../../assets/img/order/ordernum_plus.png" @click="addOrderNum"/>
				</div>
		    </div>
			
			<!-- <p class="order-info price">¥{{orderInfo.total}}</p> -->
		</div>
	</div>
	<div class="divider"></div>

	<div>
		<p class="section-title">让我们为您送到哪里？</p>
		
		<div class="pay-cellgroup" v-if="mode != 'duobao'">
			<div class="pay-cell" @click="chooseAddress" style="padding-bottom:10px;">

				<template v-if="addressData">

					<div class="my-address">
						<div class="content-part">
							<div class="top">
								<h2>{{addressData.receiver}}</h2>
								<p>{{addressData.phone}}</p>
							</div>
							<div class="mid" >
								<p>{{addressData.state}} {{addressData.city}} {{addressData.region}} {{addressData.address}}
								</p>
							</div>
						</div>
						<!-- <div style="height:100%;width:1px;background-color:#e7e7e7;"></div> -->
						<div class="operation-part" style="border:none;">
							<i v-if="!isAndroid" class="material-icons cell-arrow" style="vertical-align:center;margin-right:0px;float:right;">chevron_right</i>

						</div>

					</div>
				</template>

				<template v-else>
					<div class="addressBlock" style="padding:10px;">
						请选择地址
					</div>
				</template>
			</div>
		</div>
	</div>
	<div class="divider"></div>
	<div>
		<p class="section-title">还有什么需要我们给备注的？</p>
		<x-input class="remarks" type="text" name="firstname" value="orderInfo.remark" placeholder="在此处添加备注" :value.sync="remarks" type="text"></x-input>
		<div style="height:40px;text-align:center;">
			<label ><input type="checkbox" class="negotiate" name="radiobutton" value="radiobutton" v-model="this.isRead" @click="readCheck">我已阅读并同意</label><a style="color:rgb(88,188,154);font-size:10px;" href="http://help.tiangongyipin.com/term_of_service.html">《天工艺品服务条款》</a>
		</div>
	</div>
	<div class="divider"></div>

	<div class="bottom-buy-confirm">
		<div class="bottom-buy-price-confirm">合计：¥{{goodsInfo.price * buycount}}</div>
		<div class="verticle-line-confirm"></div>
		<div class="bottom-buy-btn-confirm" @click="buyIt" v-if="orderInfo.availableStock!=0">提交订单</div>
	</div>

</div>

<!-- <span>订单编号：{{id}}</span> -->
<!-- <text>{{orderInfo.address.receiver}}</text> -->
<toast :show.sync="toast" type="text" width="12em">{{tips}}</toast>
</template>

<script type="text/javascript">
	import floatbtn from '../../components/floatbtn'
	import Loading from 'vux/dist/components/loading'
	import Toast from 'vux/dist/components/toast'
	import PayModule from '../partial/pay-module'
	import {
		isLogined
	}
	from '../../lib/auth'
	import {
		configShare
	}
	from '../../lib/wxclient'

	import browserUtils from '../../lib/browser-helper'
	import storage from '../../lib/storage-helper'
	import wx from 'weixin-js-sdk'
	import constants from '../../const'
	import Alert from 'vux/dist/components/alert'

	import XInput from 'vux/dist/components/x-input'

	export default {
			components: {
				floatbtn,
				Loading,
				Toast,
				PayModule,
				Alert,
				XInput,
				storage
			},
			created() {
				document.title = '确认订单';
				this.getToken();
				this.id = this.$route.params.id;
				// storage.saveOrderId(this.$route.params.id);
				this.buycount = this.$route.query.num;

				if (!this.buycount) {
					this.buycount = 1;
				}
				document.body.style.overflow = 'visible';
				document.body.style.position = 'relative';
				this.checkIfEnable();
				if (browserUtils.versions().android) {
					this.isAndroid = true;
				}
				this.getGoodsInfo();
				// log(JSON.stringify(this.addressData)); 
				this.getDefaultAddress();
				// this.$bus.on('choose-address', this.changeAddress);
			},
			beforeDestroy() {
				// alert('beforeDestroy');
				// this.$bus.off('choose-address', this.addTodo);
				// localStorage.orderAddress = 'undefined';
				storage.save('orderAddress', {});
			},
			ready: function() {
				// this.$bus.on('choose-address', this.changeAddress);
				// this.getDefaultData();
			},
			data: function() {
				return {
					id:'',
					orderInfo: {},
					remarks: '',
					isRead:false,
					inApp: false,
					isAndroid: false,
					alipayEnable: true,
					addressData: undefined,
					token: '',
					payMethod: 'w',
					haveEnoughBalance: false,
					captcha: '',
					waitForPay: false,
					payStep: 'choose',
					noAddress: false,
					payFailed: false,
					failMsg: '',
					toast:false,
					tips:'',
					goodsInfo: {},
					buycount: 1,//购买数量
				}
			},
			methods: {
				addOrderNum: function() {
					if (this.buycount >= this.goodsInfo.availableStock) {
						this.buycount = this.goodsInfo.availableStock;
						this.toast = true;
						this.tips = "超过可购数量";
						return;
					};
					this.buycount = this.buycount + 1;
				},
				minusOrderNum: function() {
					if (this.buycount <= 1) {
						this.buycount == 1;
						this.toast = true;
						this.tips = "最低可购买一件";
						return;
					};
					this.buycount = this.buycount - 1;
				},
				changeAddress:function(address){
					
				},
				chooseAddress:function(){
					this.$route.router.go('/my/address-list');
				},
				getGoodsInfo: function() {
					this.$http.post('', {
		        		act: 'mall_getMallGoodInfo',
		        		group: 'mall',
		        		id: this.$route.params.id,
		        	}).then((result) => {
		        		this.goodsInfo = result.data.data;
		        	});
				},
				getDefaultAddress: function() {
					var savedAddress = storage.getAsObject('orderAddress');
					log(JSON.stringify(savedAddress));
					this.addressData = savedAddress;

					if (JSON.stringify(savedAddress) != '{}' && this.addressData != undefined) {
						log('sss');
						return;
					};

					log('hhh');

					this.$http.post('', {
		        		act: 'address_getDefaultAddress'
		        	}).then((result) => {
		        		this.addressData = result.data.data;
		        		
		        	});
				},
        		
		        readCheck(){
		        	if (this.isRead) {
		        		this.isRead = false;
		        	}else{
		        		this.isRead = true;
		        	}
		        },

		        //Pay methods
		        getToken(){
		        	if(!window.userinfo){
		        		log('无Token');

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
		        		}else {
		        			this.$route.router.go({name: 'login'});
		        		}
		        	}else{
		        		this.token = window.userinfo.token;
		        		log(this.token);
		        	}
		        },

		        getAddress() {
		        	
		        },
		        findPrimaryAddress(address) {
		        	if(address.primary === "1"){
		        		return address;
		        	}
		        },
		        checkIfEnable() {
		        	if (browserUtils.versions().weixin) {
		        		this.alipayEnable = false;
		        	}
		        },
		        validate(){
		        	if(!this.addressData||!this.addressData.receiver){
		        		this.tips = "请选择收货地址";
		        		this.toast = true;
		        		return false;
		        	}
		        	if(!this.isRead){
		        		this.tips = "您尚未同意《天工艺品服务条款》";
		        		this.toast = true;
		        		return false;
		        	}
		        	return true;
		        },
		        showToast (tips){
		        	this.tips = tips;
		        	this.toast=true
		        },
		        buyIt() {
		        	if(!this.validate()){
		        		return;
		        	}
		        	if (!isLogined(this)) {
		        		return;
		        	}
		        	
		            // var temp = $('#remarkInput').val();
		            // var remark = this.$refs.remarkInput.value
		            log(this.remarks)

		            // this.toast = true;
		            // this.tips = '正在提交订单...';

		            if (!this.remarks || this.remarks == ''|| this.remarks.length==0) {
		            	//先下单
						this.$http.post('', {
			            	act: 'mall_createOrder',
			            	group: 'mall',
			            	sku_id: this.id,
			            	num: this.buycount,
			            	addr_id: this.addressData.id
			            }).then((result) => {
			            	log(result);
			            	if (result && result.data && result.data.code == 200) {
			        			// this.buyInfo = result.data.data;
			        			// log(this.buyInfo);
			        			// this.buying = 'on';
			        			// document.body.style.overflow = 'hidden';

			        			this.goPayCenter(result.data.data.ordersn);
			        		}else{
			        			this.toast = true;
		            			this.tips = result.data.message;
			        		}
			        	});
		            	return;
		            }

		            //先下单
					this.$http.post('', {
		            	act: 'mall_createOrder',
		            	group: 'mall',
		            	sku_id: this.id,
		            	num: this.buycount,
		            	addr_id: this.addressData.id,
		            	remark: this.remarks,
		            }).then((result) => {
		            	log(result);
		            	if (result && result.data && result.data.code == 200) {
		        			// this.buyInfo = result.data.data;
		        			// log(this.buyInfo);
		        			// this.buying = 'on';
		        			// document.body.style.overflow = 'hidden';

		        			this.goPayCenter(result.data.data.ordersn);
		        		}else{
			        			this.toast = true;
		            			this.tips = result.data.message;
			        		}
		        	});
	            	return;

		         //    this.$http.post('', {
		         //    	act: 'commonOrder_addRemark',
		         //    	orderSn: this.id,
		         //    	remark: this.remarks,
		         //    }).then((result) => {
		         //    	log(result);
		         //    	if (result && result.data && result.data.code == 200) {
		        	// 		// this.buyInfo = result.data.data;
		        	// 		// log(this.buyInfo);
		        	// 		// this.buying = 'on';
		        	// 		// document.body.style.overflow = 'hidden';

		        	// 		this.goPayCenter(this.id);
		        	// 	}
		        	// });
		        },
		        goPayCenter(orderId) {
					// if (typeof(JsBridge) != 'undefined') {
					// 		JsBridge.openMallProductDetail(item.id);
					// 		return;
					// 	};

					log('goPayCenter');

					// window.location.href = "http://localhost:8081/pay?id=" + orderId;//用此方法跳转会造成window.userinfo丢失

					this.$route.router.go({
						name: 'pay-centre',
						query: {
							r:1
						},
						params: {
							id: orderId
						}
					});
				}
	},
	events: {
		// 'missionAbort': function () {
		// 	this.buying = 'off';
		// 	document.body.style.overflow = 'visible';
		// 	this.getDefaultData();
		// },
		// 'missionComplete': function () {
		// 	this.buying = 'off';
		// 	document.body.style.overflow = 'visible';
		// 	JsBridge.close();
		// 	this.getDefaultData();
		// },
		// 'missionTruelyComplete': function () {
		// 	this.buying = 'off';
		// 	this.paySuccess = true;
		// 	document.body.style.overflow = 'visible';
		// 	this.getDefaultData();
		// }
	},
}
</script>