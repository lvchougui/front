<style>
	.product-cover{
		width: 100%;
		height: auto;
	}
	
	.auction-prop{
		flex-direction: row;
		margin-top: 10px;
		margin-left: 20px;
		margin-right: 20px;
	}
	.product-price{
		color: #58bc9a;
		font-size: 13px;
		margin-left: 20px;
		margin-bottom: 10px;
		margin-top: 0;
		margin-right: 20px;
	}
	.prop-key{
		font-size: 13px;
		width: 100px;
		color: #2f2f2f;
		display: inline-block;
		line-height: 1;
	}
	.prop-value{
		font-size: 13px;
		color: #9fa0a0;
		display: inline-block;
		line-height: 1;
	}

	.bottom-buy{
		background-color: #40434a;
		height: 45px;
		flex-direction: row;
		display: flex;

		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 9999999;
	}

	.tuan-buy-price{
		width: 60%;
		height: 100%;
		font-size: 16px;
		color: #fff;
		text-align: center;
		line-height: 45px;
	}

	.verticle-line{
		height: 35px;
		width: 1px;
		margin-top: 5px;
		margin-bottom: 5px;
		background-color: #ffffff;
		
	}

	.tuan-buy-btn{
		width: 39%;
		height: 100%;
		text-align: center;
		font-size: 15px;
		color: #fff;
		line-height: 45px;
	}

	.label-text{
		color: #000000;
		padding: 10px;
		font-size: 14px;
		font-weight: bold;
		margin: 10px;
	}
	
	.master-logo{
		display:flex;   
		width: 80px;
		height: 80px;
		justify-content:center;
		margin: 0 auto;
	}
	.master-name{
		padding: 5px;
		align-items: center;
		color: #2f2f2f;
		font-size:14px;
		margin-top: 5px;
		text-align: center;
	}
	.master-brand{
		align-items: center;
		color: #9fa0a0;
		font-size: 13px;
		margin-bottom: 20px;
		text-align: center;
	}
	.divider{
		width: 100%;
		height: 10px;
		background-color: #efefef;
	}
	.product-desc{
		padding: 10px;
		margin: 10px;
	}
	.list{
		margin-top: 0;
		margin-right: 10px;
		margin-left: 10px;
		margin-bottom: 0;
		padding: 10px;

	}
	.tuan-norms{
		padding-left: 10px;
		padding-right: 10px;
		padding-bottom: 20px;
		display: flex;
		flex-direction: row;
	}
	.tuan-norms div{
		flex: 1;
		line-height: 50px;
		border:1px solid #e7e7e7;
		color: grey;
		text-align: center;
		font-size: 14px;
		border-radius: 5px;
		margin: 10px;
	}
	.norm-selected{
		border:none !important;
		background-color: #58bc9a;
		color: #58bc9a !important;
		font-weight: 600;
		color: white !important;
	}
</style>
<template>
	<img :src="detail.cover" class="product-cover">
	<div class="label-text" style="font-weight:bold;">{{detail.name}}</div>
	<div class="tuan-norms">
		<div :class="{'norm-selected': selectposition == 1}" @click="chooseNorm(1)">半斤装：¥580</div>
		<div :class="{'norm-selected': selectposition == 2}" @click="chooseNorm(2)">二两装：¥258</div>
	</div>

	<div class="divider"></div>
	<div class="product-desc">{{{detail.desc}}}</div>
	<div class="divider"></div>
	<div class="bottom-buy" style="margin-bottom:0px;">
		<div class="tuan-buy-price">{{tuanNorm}}¥{{normPrice}}</div>
		<div class="verticle-line"></div>
		<div class="tuan-buy-btn" @click="buyIt">立即购买</div>
	</div>
	<toast :show.sync="orderSuccess">下单成功</toast>
	<toast :show.sync="payToast" type="text" width="12em">{{payTips}}</toast>
</template>

<script>
	import browserUtils from '../../lib/browser-helper'
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
	export default {
		components: {
			Loading,
			Toast,
			browserUtils,
			PayModule
		},
		route:{
			data(){
				document.title = "遇见·宜兴红";
			}
		},
		ready: function() {
			this.$dispatch.apply(this,['onTitleChanged',{title:'遇见·宜兴红',back:true}]);
			this.id = this.$route.params.id;
			document.body.style.overflow = 'visible';
			document.body.style.position = 'relative';
			this.getDefaultData();
		},
		data: function() {
			return {
				id:'',
				detail:{},
				master:{},
				hints:[],
				buying: 'off',
				buyInfo: '',
				paySuccess: false,
				orderSuccess: false,
				token: '',
				payToast: false,
				payTips: '',
				tuanNorm:'半斤装：',
				normPrice:580,
				selectposition:1,
				buyProId:10782,
			}
		},
		methods: {
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
						this.$route.router.go({name: 'login'});
					} else {
						this.$route.router.go({name: 'login'});
					}
				}else{
					this.token = window.userinfo.token;
				}
			},

        //得到默认的数据
        getDefaultData: function() {
        	this.$http.post('', {
        		act: 'mall_getMallGoodInfo',
        		group: 'mall',
        		id: 10782,
        	}).then((result) => {
        		log(result)
        		this.detail = result.data.data;
        		this.master = this.detail.master;
        		this.hints = this.detail.hints;
        	});

        },
        chooseNorm(norm){
        	this.selectposition = norm;
        	if (norm==1) {
        		this.tuanNorm = "半斤装：";
        		this.normPrice = 580;
        		this.buyProId = 10782;
        	}else{
        		this.tuanNorm = "二两装：";
        		this.normPrice = 258;
        		this.buyProId = 10781;
        	}
        },
        buyIt() {
        	// this.getToken();

        	// if (this.token == '') {
        	// 	this.getToken();
        	// 	return;
        	// }


        	if (typeof(JsBridge) != 'undefined'){
        		JsBridge.openMallProductDetail(this.buyProId);
        		return;
        	}else{
        		if (!isLogined(this)) {
        			return;
        		};

        		this.payTips = '正在下单...';
        		this.payToast = true;

        		this.buying = "pending";
        		this.$http.post('', {
        			act: 'mall_buy',
        			group: 'mall',
        			id: this.buyProId,
        		}).then((result) => {
        			log(result);
        			if (result && result.data && result.data.code == 200) {
        				this.buyInfo = result.data.data;
        				log(this.buyInfo);
        				this.orderSuccess = true;
        			// this.buying = 'on';
        			// document.body.style.overflow = 'hidden';

        			this.goConfirmOrder(this.buyInfo.orderId);
        		}
        	});
        	}
        	
        },
        missionAbort: function () {
        	this.buying = 'off';
        	document.body.style.overflow = 'visible';
        },
        goConfirmOrder(orderId) {
			// if (typeof(JsBridge) != 'undefined') {
			// 		JsBridge.openMallProductDetail(item.id);
			// 		return;
			// 	};
			this.$route.router.go({
				name: 'confirm_order',
				params: {
					id: orderId
				}
			});
		}
		
	},
	events: {
		'missionAbort': function () {
			this.buying = 'off';
			document.body.style.overflow = 'visible';
			this.getDefaultData();
		},
		'missionComplete': function () {
			this.buying = 'off';
			document.body.style.overflow = 'visible';
			JsBridge.close();
			this.getDefaultData();
		},
		'missionTruelyComplete': function () {
			this.buying = 'off';
			this.paySuccess = true;
			document.body.style.overflow = 'visible';
			this.getDefaultData();
		}
	},
}
</script>

