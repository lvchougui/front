<template>
	<div class="order-detail-item order-cellgroup">
		<img :src="mainData.imgUrl" />
		<div class="right">
			<h3>{{mainData.name}}</h3>
			<p>下单时间: {{mainData.createTime}}</p>
		</div>
	</div>
	<div class="order-detail-address order-cellgroup">
		<i class="material-icons">location_on</i>
		<div class="right">
			<div class="top">
				<p>收货人: {{mainData.address.receiver}}</p>
				<p style="float:right">{{mainData.address.phone}}</p>
			</div>
			<p class="mid">收货地址: {{mainData.address.state}}{{mainData.address.region}}{{mainData.address.city}}{{mainData.address.address}}</p>
			<div class="bottom" v-show="mainData.status=='shipped'">
				<button class="btn-grey-outline">查看物流</button>
			</div>
		</div>
	</div>
	<template v-if="mainData.couponName != null">
		<div class="order-detail-coupon order-cellgroup">
			<i class="material-icons">local_play</i>
			<p>{{mainData.couponName}}</p>
			<p class="desc">{{mainData.couponPrice}}</p>
		</div>
	</template>
	<div class="order-detail-detail order-cellgroup">
		<p>订单编号: {{mainData.orderId}}</p>
		<template v-if="mainData.payType != null">
			<p>支付方式: {{mainData.payType}}</p>
		</template>
		<p>成交价格: ¥{{mainData.price}}</p>
		<template v-if="mainData.payPrice != null">
			<p>实际支付: ¥{{mainData.payPrice}}</p>
		</template>
	</div>
</template>

<script>
	export default {
		ready() {
				this.$dispatch.apply(this,['onTitleChanged',{title:'订单详情',back:true}])
				this.id = this.$route.params.id;
				this.getMainData();
			},
			methods: {
				getMainData: function () {
					this.$http.post('', {
						act: 'order_getInfo',
						oid: this.id
					}).then((result) => {
						this.mainData = result.data.data;
					})
				}
			},
			data() {
				return {
					id: '',
					mainData: []
				}
			}
	}
</script>

<style>	
	.order-cellgroup {
		background-color: #fafafa;
		border-top: 1px solid rgb(220, 220, 220);
		border-bottom: 1px solid rgb(220, 220, 220);
		margin: 8px 0 8px 0;
		padding: 0 8px 0 8px;
		overflow: hidden;
		position: relative;
	}
	
	.order-cellgroup i {
		color: #969696;
	}
	
	.order-detail-item img {
		width: 60px;
		height: 60px;
		margin: 8px 8px 8px 0;
		float: left;
	}
	
	.order-detail-item .right {
		margin-top: 8px;
	}
	
	.order-detail-item .right h3 {
		font-size: 0.875em;
		font-weight: 400;
		overflow: hidden;
		text-overflow: ellipsis;
		height: 44px;
		line-height: 22px;
	}
	
	.order-detail-item .right p {
		height: 16px;
		font-size: 0.75em;
		color: #646464;
	}
	
	.order-detail-address i {
		position: absolute;
		top: 8px;
	}
	
	.order-detail-address .right {
		margin: 8px 0 8px 32px;
	}
	
	.order-detail-address .right .top {
		font-size: 0.875em;
		height: 24px;
	}
	
	.order-detail-address .right .top p {
		clear: none;
		display: inline-block;
	}
	
	.order-detail-address .right .mid {
		font-size: 0.875em;
		color: #646464;
	}
	
	.order-detail-address .right button {
		float: right;
		height: 26px;
		line-height: 26px;
		padding: 0 8px 0 8px;
		font-size: 0.75em;
		margin: 8px 0 8px 0;
		border-radius: 6px;
	}
	
	.order-detail-coupon {
		height: 30px;
	}
	
	.order-detail-coupon i {
		margin: 4px 8px 4px 0;
		float: left;
	}
	
	.order-detail-coupon p {
		float: left;
		line-height: 30px;
		font-size: 0.875em;
	}
	
	.order-detail-coupon .desc {
		color: #646464;
		float: right;
	}
	
	.order-detail-detail {
		padding: 8px;
	}
	
	.order-detail-detail p {
		font-size: 0.875em;
		line-height: 1.5em;
	}
</style>