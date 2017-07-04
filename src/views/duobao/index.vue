<template>
	<div :class="{fixTop: inApp}">
		<tab>
			<tab-item @click='tab1' selected>优选</tab-item>
			<tab-item @click='tab2'>人气</tab-item>
			<tab-item @click='tab3'>揭晓</tab-item>
			<tab-item @click='tab4'>晒单</tab-item>
		</tab>
	</div>

	<div :class="{mgt44: inApp}">
	<div class="db-index-content" v-show="tabIndex != 4">
		<!-- <div class="db-banner-container" v-show="tabIndex == 1" v-if="bannerData">
			<ul class="db-banner" :style="{width: bannerWidth + 'px'}">
				<li class="banner" v-for="banner in bannerData">
					<a :href="banner.url">
						<img :src="banner.img" />
						<div class="hover">{{banner.title}}</div>
					</a>
				</li>
			</ul>
		</div> -->
		<ul class="db-index-list">
			<li class="db-card" v-for="data in mainData">
				<div class="card" @click="goDetail(data.id)">
					<img :src="data.img" class="db-card-cover" :style="{height: imgSize}" />
					<h3>{{data.name}}</h3>
					<div class="progress" v-show="data.status==1 || data.status==2">
						<p>揭晓进度 <span style="color: #64b5f6">{{((1 - data.available/data.total)*100).toFixed(0)}}%</span></p>
						<div class="bar">
							<div class="bar-inner" :style="{width: (1 - data.available/data.total)*100+'%'}"></div>
						</div>
					</div>
					<template v-if="data.status==4">
						<div class="winner">
							<i class="material-icons">stars</i>
							<p class="name">{{data.username}}</p>
						</div>
					</template>
					<div class="action">
						<button class="btn-red" v-show="data.status==1">立即夺宝</button>
						<button class="btn-grey" v-show="data.status==2">预热中</button>
						<button class="btn-grey" v-show="data.status==3">计算中</button>
						<button class="btn-grey" v-show="data.status==4">已结束</button>
					</div>
				</div>
			</li>
		</ul>
		<template v-if="tabIndex==1">
			<!-- <infinite-loading :on-infinite="load1"></infinite-loading> -->
			<see-more :on-see="load1"></see-more>
		</template>
		<template v-if="tabIndex==2">
			<!-- <infinite-loading :on-infinite="load2"></infinite-loading> -->
			<see-more :on-see="load2"></see-more>
		</template>
		<template v-if="tabIndex==3">
			<!-- <infinite-loading :on-infinite="load3"></infinite-loading> -->
			<see-more :on-see="load3"></see-more>
		</template>
	</div>

	<div class="db-index-content" v-show="tabIndex==4">
		<ul class="db-show-order">
			<li class="db-show" v-for="show in showPrizeData">
				<div class="show-avatar">
					<img :src="show.user.logo" />
				</div>
				<div class="show-content">
					<div class="top">
						<p style="color:#58bc9a;float:left">{{show.user.nickname}}</p>
						<p style="color:#646464;float:right">{{show.createTime}}</p>
					</div>
					<div class="mid">
						<div class="triangle"></div>
						<p>期号: {{show.prize.stage}}</p>
						<p>{{show.prize.name}}</p>
						<p class="main">{{show.content}}</p>
						<ul class="gallery">
							<li v-for="img in show.images">
								<div>
									<img :src="img" @click="showCaseIt(show.images)" />
								</div>
							</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
		<template v-if="tabIndex==4">
			<!-- <infinite-loading :distance="distance" :on-infinite="load4"></infinite-loading> -->
			<see-more :on-see="load4"></see-more>
		</template>
	</div>
	</div>

	<!-- <div class="long-fab" @click="goShow(0)">
		<i class="material-icons">add_a_photo</i>
		<div>我要晒单</div>
	</div> -->

	<div class="showcase" style="display:none" v-show="showCase.length != 0">
		<div class="showcase-close" @click="showCase=[]">
			<i class="material-icons">cancel</i>
		</div>
		<swiper style="height:320px" :style="{top: showCaseTop}" dots-position="center">
			<swiper-item v-for="pic in showCase">
				<img :src="pic"/>
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import Tab from 'vux/dist/components/tab'
	import TabItem from 'vux/dist/components/tab-item'
	import Swiper from 'vux/dist/components/swiper'
	import SwiperItem from 'vux/dist/components/swiper-item'
	// import InfiniteLoading from 'vue-infinite-loading'
	import SeeMore from '../partial/see-more'

	export default {

		route: {
			data() {
				document.title = "一元夺宝";
			}
		},
		components: {
			Tab,
			TabItem,
			Swiper,
			SwiperItem,
			// InfiniteLoading,
			SeeMore
		},
		ready() {
			this.detectPlatform();
			this.getPrimaryData();
			this.getBannerData();
			this.$dispatch.apply(this,['onTitleChanged',{title:'一元夺宝',back:false}]);
			this.imgSize = (window.innerWidth - 24) / 2 + 'px';
			this.showCaseTop = (window.innerHeight - 320) / 2 + 'px';
		},

		methods: {
			detectPlatform() {
				if (typeof(JsBridge) != 'undefined') {
					this.inApp = true;
				}
			},
			goDetail: function (id) {
				this.$route.router.go({
					name: 'duobao_item',
					params: {
						id: id
					}
				});
			},

			goShow: function (id) {
				this.$route.router.go({
					name: 'duobao_show',
					params: {
						id: id
					}
				});
			},

			getPrimaryData() {
				this.$http.post('', {
					act: 'goods_getListByPrimary',
					group: 'cloud',
					offset: this.offset,
					max: this.max
				}).then((result) => {
					this.mainData = result.data.datalist;
				})
			},

			getPopularityData() {
				this.$http.post('', {
					act: 'goods_getListByPopularity',
					group: 'cloud',
					offset: this.offset,
					max: this.max
				}).then((result) => {
					this.mainData = result.data.datalist;
				})
			},

			getOverData() {
				this.$http.post('', {
					act: 'goods_getListByOver',
					group: 'cloud',
					offset: this.offset,
					max: this.max
				}).then((result) => {
					this.mainData = result.data.datalist;
				})
			},

			getBannerData() {
				this.$http.post('', {
					act: 'indianaBanner_getList',
					group: 'cloud'
				}).then((result) => {
						this.bannerData = result.data.datalist;
					if(result.data.code==200){
						this.bannerWidth = this.bannerData.length * 136;
					}
				})
			},

			getShowPrizeData() {
				this.$http.post('', {
					act: 'showprize_getList',
					group: 'cloud',
					offset: this.offset,
					max: this.max
				}).then((result) => {
					this.showPrizeData = result.data.datalist;
				})
			},

			tab1: function () {
				this.offset = 0;
				this.mainData = [];
				this.temp = [];
				this.getPrimaryData();
				this.tabIndex = 1;
			},
			tab2: function () {
				this.offset = 0;
				this.mainData = [];
				this.temp = [];
				this.getPopularityData();
				this.tabIndex = 2;
			},
			tab3: function () {
				this.offset = 0;
				this.mainData = [];
				this.temp = [];
				this.getOverData();
				this.tabIndex = 3;
			},
			tab4: function () {
				this.offset = 0;
				this.temp = [];
				this.getShowPrizeData();
				this.tabIndex = 4;
			},

			showCaseIt: function (imgs) {
				this.showCase = imgs;
			},

			handleResp(resp){
				if (resp.data.code == 229) {
					this.$broadcast('$InfiniteLoading:noMore');
					return;
				}
				var temp = this.mainData;
				var data = resp.data.datalist;
				if(data.length<this.max){
					this.$broadcast('$InfiniteLoading:noMore');
				}
				for (var i = 0; i < data.length; i++) {
					temp.push(data[i]);
				}
				this.mainData = temp;
				this.$broadcast('$InfiniteLoading:loaded');
			},
			load1: function () {
				setTimeout(function () {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'goods_getListByPrimary',
						group: 'cloud',
						offset: this.offset,
						max: this.max
					}).then((resp) => {
						this.handleResp(resp);
					})
				}.bind(this), 1000);
			},
			load2: function () {
				setTimeout(function () {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'goods_getListByPopularity',
						group: 'cloud',
						offset: this.offset,
						max: this.max
					}).then((resp) => {
						this.handleResp(resp);
					})
				}.bind(this), 1000);
			},
			load3: function () {
				setTimeout(function () {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'goods_getListByOver',
						group: 'cloud',
						offset: this.offset,
						max: this.max
					}).then((resp) => {
						this.handleResp(resp);
					})
				}.bind(this), 1000);
			},
			load4: function () {
				setTimeout(function () {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'showprize_getList',
						group: 'cloud',
						offset: this.offset,
						max: this.max
					}).then((resp) => {
						if (resp.data.code == 229) {
							this.$broadcast('$InfiniteLoading:noMore');
							return;
						}
						var temp = this.showPrizeData;
						var data = resp.data.datalist;
						for (var i = 0; i < data.length; i++) {
							temp.push(data[i]);
						}
						this.showPrizeData = temp;
						this.$broadcast('$InfiniteLoading:loaded');
					})
				}.bind(this), 1000);
			}
		},
		data() {
			return {
				tabIndex: 1,
				offset: 0,
				max: 10,
				showCase: [],
				bannerWidth: '',
				imgSize: '',
				showCaseTop: '',
				temp: [],
				mainData: [],
				bannerData: [],
				showPrizeData: [],
				distance:100,
				inApp: false
			}
		},
		events: {
			'inApp': function(){
				this.inApp = true;
			}
		}
	}
</script>