<style type="text/css">
	body{
		font-size: 62.5%;
	}
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
	.total-text{
		padding-right: 10px;
		margin-top: 10px;
		text-align: right;
		font-size: 1.4em;
	}
</style>
<template>
	<div class="order-item-new" v-for="item in orderList">
		<div class="orter-item-title">
			<div style="flex:1;">单号：{{item.orderId}}</div>
			<div>待收货</div>
		</div>
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
		<div style="padding-left:10px;margin-top:15px;line-height:1;" v-if="!item.remark==''&& item.remark">备注：{{item.remark}}</div>
		<div style="padding-left:10px;margin-top:15px;line-height:1;" v-if="item.remark==''|| !item.remark">备注：无</div>
		<div class="order-line"></div>
		<div class="order-address-part">
			<img src="../../assets/img/dizhi.png" height="18px;">
			<div class="order-address-text">{{item.address.state}} {{item.address.city}} {{item.address.region}} / 收件人：{{item.address.receiver}} / {{item.address.phone}}</div>
		</div>
		<div class="order-line" style="margin-top:10px;"></div>
		<div class="total-text">共计{{item.number}}件商品，合计¥{{item.total}}（含运费 ¥{{item.freight}}）</div>
		<div class="order-operation-part" style="justify-content:flex-end;">
			<div class="order-pay-btn" @click="confirmDialog(item.orderId)" >确认发货</div>
			<div class="order-cancel-btn" @click="logistics(item.orderId)">查看物流</div>
		</div>
		
	</div>
	<see-more :on-see="loadOrder"></see-more>
	<toast :show.sync="toast" type="text" width="12em">{{tips}}</toast>
	<confirm
		:show.sync="showConfirm"
		title="确认收货" 
		@on-cancel="onCancel" 
		@on-confirm="onConfirm" 
		cancel-text="取消"
		confirm-text="确认">
		<p style="text-align:center;">确认收到宝贝了吗?</p>
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
				document.title="待收货订单";
			}
		},
		components: {
			SeeMore,
			storage,
			Toast,
			Confirm
		},
		ready() {
			this.$dispatch.apply(this,['onTitleChanged',{title:'待收货订单',back:true}]);
			this.getOrder();
		},
		data:function(){
			return {
				orderList:[],
				temp:[],
				offset: 0,
				max: 10,
				toast:false,
				tips:'',
				receiveOrderId:'',
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
					status: 'shipped'
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
						status: 'shipped'
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
			confirmDialog:function(orderId){
				this.receiveOrderId = orderId;
				this.showConfirm = true;
			},
			onCancel(){
				this.showConfirm = false;
			},
			onConfirm(){
				this.showConfirm = false;
				this.$http.post('', {
					act: 'commonOrder_confirmShipment',
					orderSn: this.receiveOrderId
				}).then((result) => {
					if (result.data.code != 200) {
						this.tips = result.data.message;
						this.toast = true;
						return;
					} else {
						this.tips = "收货成功";
						this.toast = true;
						this.offset = 0;
						this.getOrder();
						return;
					}
				});
			},
			logistics(orderId){
				this.$route.router.go({
					name: 'deviler',
					params: {
						id: orderId
					}
				});
			},
		}
	}
</script>