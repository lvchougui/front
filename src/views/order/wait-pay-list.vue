<style type="text/css">
	.order-item-new{
		margin: 10px;
		display: flex;
		flex-direction: column;
		border:1px solid #efefef;
	}
	.orter-item-title{
		height: 40px;
		background-color: black;
		line-height: 40px;
		display: flex;
		flex-direction: row;
		color: white;
		padding-left: 10px;
		padding-right: 10px;
	}
	.order-line{
		background-color: #efefef;
		width: 100%;
		height: 1px;
		margin-top: 15px;
	}
	.order-address-part{
		padding: 10px;
		margin-top: 10px;
		display: flex;
		flex-direction: row;
	}
	.order-address-text{
		flex:1;
		line-height:20px;
		margin-left:10px;
		font-size:1.3em;
	}
	.order-operation-part{
		display: flex;
		flex-direction: row;
		padding: 10px;
	}
	.order-pay-btn{
		background-color: #58bc9a;
		line-height: 35px;
		height: 35px;
		text-align: center;
		color: white;
		font-size: 1.4em;
		width: 100px;
	}
	.order-cancel-btn{
		border:1px solid #efefef;
		line-height: 34px;
		height: 34px;
		text-align: center;
		font-size: 1.4em;
		width: 100px;
		color: grey;
		margin-left: 10px;
	}
	.order-divider{
		width: 100%;
		height: 5px;
		margin-top: 10px;
		background-color: #efefef;
	}
	.order-pro-part{
		padding: 10px;
		display: flex;
		flex-direction: row;
	}
	.order-prod-img{
		width: 70px;
		height: 70px;
	}
	.order-prod-detail{
		flex: 1;
		display: flex;
		flex-direction: row;
		padding-left: 10px;
		padding-top: 5px;
		padding-bottom: 5px;
		font-size: 1.4em;
	}
	.deliver-time{
		padding: 10px;
		color: grey;
		display: flex;
		flex-direction: row;
	}
</style>
<template>
	<div class="order-item-new" v-for="item in orderList">
		<div class="orter-item-title">
			<div style="flex:1;">单号：{{item.orderId}}</div>
			<div>待付款</div>
		</div>
		<div style="padding:10px;margin-top:5px;line-height:1;" v-if="!item.couponStr==''&& item.couponStr">{{item.couponStr}}</div>
		<div style="padding:10px;margin-top:5px;line-height:1;" v-if="item.couponStr==''|| !item.couponStr">暂无可用优惠券</div>
		<div style="padding-left:10px;line-height:1;" v-if="!item.remark==''&& item.remark">备注：{{item.remark}}</div>
		<div style="padding-left:10px;line-height:1;" v-if="item.remark==''|| !item.remark">备注：无</div>
		<div class="order-line"></div>
		<div class="order-address-part" @click="chooseAddress(item.orderId)">
			<img src="../../assets/img/dizhi.png" height="18px;">
			<div class="order-address-text" v-if="item.address&&item.address.receiver!=''">{{item.address.state}} {{item.address.city}} {{item.address.region}} / 收件人：{{item.address.receiver}} / {{item.address.phone}}</div>
			<div v-else class="order-address-text">请选择收货地址</div>
		</div>
		<div class="order-operation-part">
			<div class="order-pay-btn" @click="confirmGoPayCenter(item)">去付款</div>
			<div class="order-cancel-btn" @click="confirmDel(item.orderId)">取消订单</div>
		</div>
		<div class="order-divider"></div>
		<div class="order-pro-part" @click="goProductDetail(item)">
			<img class="order-prod-img" :src="item.imgUrl">
			<div class="order-prod-detail">
				<div style="flex:1;padding-right:10px;display: flex;flex-direction: column;">
					<div style="flex:1;">{{item.name}}</div>
					<div v-if="item.couponprice&&item.couponprice>0">¥{{item.couponprice}}</div>
					<div v-else>¥{{item.price}}</div>
				</div>
				<div>X1</div>
			</div>
		</div>
		<div class="order-line" style="margin-top:0;"></div>
		<div class="deliver-time">
			<img width="16px" height="16px" src="../../assets/img/time_hollow.png">
			<div style="margin-left:10px;">现在完成支付，预计 {{item.expecttime}} 前发货</div>
		</div>
	</div>
	<see-more :on-see="loadOrder"></see-more>
	<toast :show.sync="toast" type="text" width="12em">{{tips}}</toast>
	<confirm
	:show.sync="showConfirm"
	title="取消订单" 
	@on-cancel="onCancel" 
	@on-confirm="onConfirm" 
	cancel-text="取消"
	confirm-text="确认">
	<p style="text-align:center;">确认取消这个订单?</p>
</confirm>
</template>
<script>
	import {
		isLogined
	}
	from '../../lib/auth'
	import SeeMore from '../partial/see-more'
	import storage from '../../lib/storage-helper'
	import Toast from 'vux/dist/components/toast'
	import Confirm from 'vux/dist/components/confirm'

	export default {
		route:{
			data(){
				document.title="待付款订单";
			}
		},
		components: {
			SeeMore,
			storage,
			Toast,
			Confirm
		},
		ready() {
			this.$dispatch.apply(this,['onTitleChanged',{title:'待付款订单',back:true}]);
			this.getOrder();
			this.$bus.on('choose-address', this.changeAddress);
		},
		data:function(){
			return {
				orderList:[],
				temp:[],
				offset: 0,
				max: 10,
				toast:false,
				tips:'',
				delOrderId:'',
				showConfirm:false,
			}
		},
		methods: {
			getOrder:function(){
				if (!isLogined(this)) {
					return;
				};
				this.$http.post('', {
					act: 'commonOrder_getOrderList',
					offset: this.offset,
					max: this.max,
					status: 'waitforpay'
				}).then((result) => {
					this.orderList = result.data.datalist;
				})
			},
			loadOrder: function () {
				setTimeout(function () {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'commonOrder_getOrderList',
						offset: this.offset,
						max: this.max,
						status: 'waitforpay'
					}).then((result) => {
						if (result.data.code != 200) {
							this.temp = []
							this.$broadcast('$InfiniteLoading:noMore');
						} else {
							this.temp = result.data.datalist;
						}
					})
					this.orderList = this.orderList.concat(this.temp);
					this.$broadcast('$InfiniteLoading:loaded');
				}.bind(this), 1000);
			},
			changeAddress:function(address){
				if (address&&address.id>0) {
					this.$http.post('', {
						act: 'commonOrder_addAddress',
						ordersn: storage.getOrderId(),
						userid: window.userinfo.userid,
						addid: address.id,
					}).then((result) => {
						if (result.data.code == 200) {
						}
					});
				}
			},
			chooseAddress:function(orderId){
				storage.saveOrderId(orderId);
				this.$route.router.go('/my/address-list');
			},
			goProductDetail(order){
				if (order.type=='auction') {
					this.$route.router.go({
						name: 'auctionDetail_item',
						params: {
							id: order.bizid
						}
					});
				}else if (order.type=='mall') {
					this.$route.router.go({
						name: 'mallProductDetail_item',
						params: {
							id: order.bizid
						}
					});
				}else if (order.type == 'preference') {
					this.$route.router.go({
						name: 'mallDetail_item',
						params: {
							id: order.bizid
						}
					});
				}
			},
			confirmGoPayCenter(item) {
				if (item.address&&item.address.receiver!='') {
					this.toast = false;
					this.$route.router.go({
						name: 'pay-centre',
						params: {
							id: item.orderId
						},
						query: {
							r: 1
						}
					});
				}else{
					this.tips = "请选择收货地址";
					this.toast = true;
					return;
				}
				
			},
			confirmDel:function(orderId){
				this.delOrderId = orderId;
				this.showConfirm = true;
			},
			onCancel(){
				this.showConfirm = false;
			},
			onConfirm(){
				this.showConfirm = false;
				this.$http.post('', {
					act: 'commonOrder_abort',
					ordersn: this.delOrderId
				}).then((result) => {
					if (result.data.code == 200) {
						this.offset = 0;
						this.tips = "取消订单成功";
						this.toast = true;
						this.getOrder();
					}
				});
			},
		}
	}
</script>