<template>
	<tab>
		<tab-item @click='tab1' selected>全部</tab-item>
		<tab-item @click='tab2'>待支付</tab-item>
		<tab-item @click='tab3'>待发货</tab-item>
		<tab-item @click='tab4'>待收货</tab-item>
		<tab-item @click='tab5'>已完成</tab-item>
	</tab>
	<ul class="order-list">
		<li class="order" v-for="order in mainData">
			<div class="top" @click="goDetail(order.orderId)">
				<img :src="order.imgUrl" />
				<div class="right">
					<h3>{{order.name}}</h3>
					<p style="color:#58bc9a">成交价: ¥{{order.price}}</p>
					<p style="font-size:0.857142857em">成交时间: {{order.createTime}}</p>
				</div>
			</div>
			<div class="bottom">
				<p class="status" v-show="order.status=='waitforpay'">待支付</p>
				<p class="status" v-show="order.status=='paid'">待发货</p>
				<p class="status" v-show="order.status=='shipped'">待收货</p>
				<p class="status" v-show="order.status=='complete'">已完成</p>
				<p class="status" v-show="order.status=='refused'">拒签</p>
				<p class="status" v-show="order.status=='timeout'">已超时</p>

				<button v-show="order.status=='waitforpay'" class="btn-red-fill">去结算</button>
				<button v-show="order.status=='paid'" class="btn-grey-fill">已付款</button>
				<button v-show="order.status=='shipped' || order.status=='complete'" class="btn-red-outline"  @click="goDeviler(order.id)">查看物流</button>
				<button v-show="order.status=='complete'" class="btn-grey-fill">已收货</button>
			</div>
		</li>
	</ul>
	<infinite-loading :on-infinite="loadOrder"></infinite-loading>
</template>

<script>
	import Tab from 'vux/dist/components/tab'
	import TabItem from 'vux/dist/components/tab-item'
	import InfiniteLoading from 'vue-infinite-loading'

	export default {
		components: {
			Tab,
			TabItem,
			InfiniteLoading
		},
		ready() {
			this.$dispatch.apply(this,['onTitleChanged',{title:'商城订单',back:true}])
			this.getOrder();
		},
		methods: {
			goDetail: function (id) {
				this.$route.router.go({
					name: 'deviler',
					params: {
						id: id
					}
				});
			},
			goDeviler: function (id) {
				this.$route.router.go({
					name: 'deviler',
					params: {
						id: id
					}
				});
			},
			getOrder() {
					this.$http.post('', {
						act: 'mallorder_getList',
						offset: this.offset,
						max: this.max,
						status: this.status
					}).then((result) => {
						this.mainData = result.data.datalist;
					})
				},
				tab1: function () {
					this.status = '';
					this.offset = 0;
					this.mainData = [];
					this.temp = [];
					this.getOrder();
					this.tabIndex = 1;
				},
				tab2: function () {
					this.status = 'waitforpay';
					this.offset = 0;
					this.mainData = [];
					this.temp = [];
					this.getOrder();
					this.tabIndex = 2;
				},
				tab3: function () {
					this.status = 'paid';
					this.offset = 0;
					this.mainData = [];
					this.temp = [];
					this.getOrder();
					this.tabIndex = 3;
				},
				tab4: function () {
					this.status = 'shipped';
					this.offset = 0;
					this.mainData = [];
					this.temp = [];
					this.getOrder();
					this.tabIndex = 4;
				},
				tab5: function () {
					this.status = 'complete';
					this.offset = 0;
					this.mainData = [];
					this.temp = [];
					this.getOrder();
					this.tabIndex = 5;
				},
				loadOrder: function () {
					setTimeout(function () {
						this.offset = this.offset + this.max;
						this.$http.post('', {
							act: 'mallorder_getList',
							offset: this.offset,
							max: this.max,
							status: this.status
						}).then((result) => {
							if (result.data.code == 229) {
								this.temp = []
								this.$broadcast('$InfiniteLoading:noMore');
							} else {
								this.temp = result.data.datalist;
							}
						})
						this.mainData = this.mainData.concat(this.temp);
						this.$broadcast('$InfiniteLoading:loaded');
					}.bind(this), 1000);
				},
		},
		data() {
			return {
				status: '',
				offset: 0,
				max: 6,
				temp: [],
				mainData: []
			}
		}
	}
</script>

<style>
	.order-list {
		margin-top: 32px;
	}
	
	.order-list .order {
		height: 114px;
		background-color: #fafafa;
		border-top: 1px solid rgb(220, 220, 220);
		border-bottom: 1px solid rgb(220, 220, 220);
		margin: 8px 0 8px 0;
		font-size: 0.875em;
		padding: 0 8px 0 8px;
	}
	
	.order-list .order .top {
		height: 76px;
		border-bottom: 1px dashed rgb(220, 220, 220);
		overflow: hidden;
	}
	
	.order-list .order .top img {
		width: 60px;
		height: 60px;
		margin: 8px 8px 8px 0;
		float: left;
	}
	
	.order-list .order .top .right {
		margin-top: 8px;
		height: 60px;
		white-space: nowrap;
	}
	
	.order-list .order .top .right h3 {
		overflow: hidden;
		text-overflow: ellipsis;
		font-size: 1em;
		font-weight: 400;
		line-height: 20px;
		height: 20px;
	}
	
	.order-list .order .top .right p {
		color: #646464;
		line-height: 20px;
		height: 20px;
	}
	
	.order-list .order .bottom p {
		color: #58bc9a;
		float: left;
		line-height: 38px;
	}
	
	.order-list .order .bottom button {
		float: right;
		height: 30px;
		border: 1px solid;
		margin: 3px 0 3px 8px;
		line-height: 24px;
		padding: 0 8px 0 8px;
		border-radius: 6px;
	}
</style>