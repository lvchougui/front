<template>
	<div :class="{fixTop: inApp}">
	<tab>
		<tab-item @click='tab1' selected>全部</tab-item>
		<tab-item @click='tab2'>待支付</tab-item>
		<tab-item @click='tab3'>待发货</tab-item>
		<tab-item @click='tab4'>待收货</tab-item>
		<tab-item @click='tab5'>已完成</tab-item>
	</tab>
	</div>
	<div :class="{mgt44: inApp}">
	<ul class="order-list">
		<li class="order" v-for="order in mainData">
			<div class="top">
				<img :src="order.imgUrl" />
				<div class="right">
					<h3>{{order.name}}
						<template v-if="order.num != '1'">({{order.num}}件)</template>
					</h3>
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

				<button v-show="order.status=='waitforpay'" class="btn-red-fill" @click="buyIt(order.orderId)">
					<span>去结算</span>
				</button>
				<button v-show="order.status=='paid'" class="btn-grey-fill">已付款</button>
				<button v-show="order.status=='shipped' || order.status=='complete'" class="btn-red-outline"  @click="goDeviler(order.orderId)">查看物流</button>
				<button v-show="order.status=='complete'" class="btn-grey-fill">已收货</button>
			</div>
		</li>
	</ul>
	</div>
	<div class="scrim" v-if="buying == 'on'" @click="missionAbort" @touchstart="missionAbort"></div>
    <pay-module :data="buyInfo" mode="sale" v-if="buying == 'on'" transition="rise"></pay-module>
	<!-- <infinite-loading :on-infinite="loadOrder"></infinite-loading> -->
	<see-more :on-see="loadOrder"></see-more>
	<loading :show="buying == 'pending'" text="正在处理"></loading>
	<toast :show.sync="paySuccess">支付成功</toast>
</template>

<script>
	import Tab from 'vux/dist/components/tab'
	import TabItem from 'vux/dist/components/tab-item'
	// import InfiniteLoading from 'vue-infinite-loading'
	import Loading from 'vux/dist/components/loading'
	import Toast from 'vux/dist/components/toast'
	import PayModule from '../partial/pay-module'
	import {
	        isLogined
	    }
	    from '../../lib/auth'
	 import SeeMore from '../partial/see-more'

	export default {
		route:{
			data(){
				document.title="我的订单";
			}
		},
		components: {
			Tab,
			TabItem,
			Loading,
			// InfiniteLoading,
			SeeMore,
			PayModule,
			Toast
		},
		ready() {
			this.$dispatch.apply(this,['onTitleChanged',{title:'订单',back:true}]);
			this.getOrder();
		},
		methods: {
			goDetail: function (id) {
				this.$route.router.go({
					name: 'activity_good',
					params: {
						id: id
					}
				});
				return
			},
			goDeviler: function (id) {
				this.$route.router.go({
					name: 'deviler',
					params: {
						id: id
					}
				});
			},
			buyIt(id) {
        	    if (!isLogined(this)) {
        	        return;
        	    };
        	    this.buying = "pending";
        	    this.$http.post('', {
        	        act: 'bargainOrder_getInfo',
        	        oid: id,
        	    }).then((result) => {
        	        if (result && result.data && result.data.code == 200) {
        	            this.buyInfo = result.data.data;
        	            this.buying = 'on';
        	            document.body.style.overflow = 'hidden';
        	        }
        	    });
        	},
			getOrder() {
					this.$http.post('', {
						act: 'bargainOrder_getList',
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
							act: 'bargainOrder_getList',
							offset: this.offset,
							max: this.max,
							status: this.status
						}).then((result) => {
							if (result.data.code != 200) {
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
				missionAbort: function () {
					this.buying = 'off';
					this.chooseAmount = false;
					document.body.style.overflow = 'visible';
				}
		},
		data() {
			return {
				status: '',
				offset: 0,
				max: 10,
				temp: [],
				mainData: [],
            	buying: 'off',
            	buyInfo: '',
            	inApp: false,
            	paySuccess: false,
            	token: ''
			}
		},
		events: {
        'missionAbort' :function() {
            this.buying = 'off';
            document.body.style.overflow = 'visible';
            this.offset = 0;
            this.getOrder();
        },
        'missionComplete' :function() {
            this.buying = 'off';
            document.body.style.overflow = 'visible';
            this.offset = 0;
            this.getOrder();
            JsBridge.close();
        },
		'missionTruelyComplete': function () {
            this.buying = 'off';
            this.chooseAmount = false;
            this.paySuccess = true;
            document.body.style.overflow = 'visible';
            this.offset = 0;
            this.getOrder();
        },
        'inApp': function(){
				this.inApp = true;
			}
    	}
	}
</script>