<template>
	<tab>
		<tab-item @click='mypat' selected>拍品</tab-item>
		<tab-item @click='mygoods'>商品</tab-item>
		<tab-item @click='myArtfun'>艺趣</tab-item>
	</tab>

	<!-- 拍品 -->
	<ul class="order-list" v-if="patBooleans">
		<li v-for="item in mainData" @click="pushAuctionDetail(item.id)" class="collection-item">
			<img :src="item.img">
			<div class="right">
				<div>{{item.name}}</div>
			</div>
			<x-button style="font-size:13px" @click="cancleCollectionPat(item.id)">取消收藏</x-button>
		</li>
	</ul>

	<!-- 商品 -->
	<ul class="order-list" v-if="goodsBooleans">
		<li v-for="item in mainData" @click="pushGoodsDetail(item.id)" class="collection-item">
			<img :src="item.img">
			<div class="right">
				<div>{{item.name}}</div>
				<div class="priceColor">
					<span>¥</span>
					<span>{{item.price}}</span>
				</div>
			</div>
			<x-button style="font-size:13px" @click="cancleCollectionGoods(item.id)">取消收藏</x-button>
		</li>
	</ul>


	<!-- 艺趣 -->
	<div class="order-list" v-if="artBooleans">
		<yiqu-list act="collection_getList"></yiqu-list>
	</div>

	<!-- 下拉刷新 -->
	<infinite-loading :on-infinite="loadOrder"></infinite-loading>

</template>


<script>
	import Tab from 'vux/dist/components/tab'
	import TabItem from 'vux/dist/components/tab-item'
	import InfiniteLoading from 'vue-infinite-loading'
	import XButton from 'vux/dist/components/x-button'
	import YiquList from '../partial/yiqu-list'

	export default {
		route: {
			data() {
				document.title = "我的收藏";
			}
		},
		components: {
			Tab,
			TabItem,
			InfiniteLoading,
			XButton,
			YiquList
		},
		ready() {
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '我的收藏',
				back: true
			}])
			this.getDefatuleData();
		},
		methods: {
			goDetail: function (id) {
				this.$route.router.go({
					name: 'mall_order_item',
					params: {
						id: id
					}
				});
			},
			getDefatuleData() {
				// alert(this.type);
				this.$http.post('', {
					act: 'favorites_getList',
					offset: this.offset,
					max: this.max,
					type: this.type
				}).then((result) => {
					this.result = result;
					if (result.data.code == 200) {
						// alert("接受数据成功");
						this.mainData = result.data.datalist;
					} else {
						//							alert("请检查您的网络情况");
					}
				})
			},

			mypat: function () {
				this.goodsBooleans = false;
				this.artBooleans = false;
				this.patBooleans = true;
				this.offset = 0;
				this.type = 3;
				this.mainData = [];
				this.temp = [];
				this.getDefatuleData();
				this.tabIndex = 1;
			},

			mygoods: function () {
				this.goodsBooleans = true;
				this.artBooleans = false;
				this.patBooleans = false;
				this.offset = 0;
				this.type = 2;
				this.mainData = [];
				this.temp = [];
				this.getDefatuleData();
				this.tabIndex = 2;
			},

			myArtfun: function () {
				this.goodsBooleans = false;
				this.artBooleans = true;
				this.patBooleans = false;
				this.offset = 0;
				this.type = 1;
				this.mainData = [];
				this.temp = [];
				this.getDefatuleData();
				// this.getYiqu();
				this.tabIndex = 3;
			},

			//跳转到拍品详情
			pushAuctionDetail: function (patId) {
				alert("跳转到拍品列表");
				alert(patId);
				this.$route.router.go({
					name: 'auctionDetail_item',
					params: {
						id: patId
					}
				})
			},

			//跳转到商品详情
			pushGoodsDetail: function (goodsId) {
				alert(goodsId);
				alert("跳转到拍品详情");
			},

			// 根据id(取消之后,刷新页面)
			cancleCollectionGoods: function (goodsId) {
				alert("取消收藏商品");
				this.type == 2;
				this.getDefatuleData();
			},

			cancleCollectionPat: function (patId) {
				alert("取消收藏拍品");
				alert(patId);
				this.type == 3;
				this.getDefatuleData();
			},


			// 加载数据
			loadOrder: function () {
				setTimeout(function () {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'favorites_getList',
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
					this.mainData = this.mainData.concat(this.temp); //插入数据
					this.$broadcast('$InfiniteLoading:loaded');
				}.bind(this), 1000);
			},
		},
		data() {
			return {
				status: '',
				offset: 0,
				max: 5,
				type: 3, //默认传商品type
				temp: [], //用来保存刷新的数据
				mainData: [],
				patBooleans: true,
				goodsBooleans: false,
				artBooleans: false,
				operatBooleas: false,
				operationId: 0,
				result: {},
			}
		}
	}
</script>

<style>
	.db-detail-top {
		background-color: #fafafa;
		border-bottom: 1px solid rgb(220, 220, 220);
	}
	
	.order-list {
		margin-top: 0;
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
	
	.topView {
		position: fixed;
		top: -2px;
		left: 0px;
		width: 100%;
		height: 44px;
		background-color: white;
	}
	
	.priceColor {
		color: rgb(218, 83, 83);
	}
	
	.collection-item {
		background-color: #fafafa;
		border-bottom: 1px solid rgb(220, 220, 220);
		overflow: hidden;
		padding: 8px;
		position: relative;
	}
	
	.collection-item img {
		width: 60px;
		height: 60px;
		float: left;
		margin-right: 8px;
	}
	
	.collection-item .right {
		font-size: 0.875em;
	}
	
	.collection-item .weui_btn {
		width: 80px !important;
		position: absolute;
		right: 8px;
		bottom: 8px;
	}
</style>