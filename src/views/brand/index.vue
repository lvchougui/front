<style>
	.label-wrap {
		padding: 8px;
		height: 25px;
		line-height: 25px;
		margin-bottom: -15px;
		margin-top: 16px;
	}
	.label-ch{
		width: 100%;
		text-align: center;
		font-size: 1.5em;
		color: black;
		line-height: 1.5em;
		margin-top: 10px;
	}
	.label-en{
		width: 100%;
		text-align: center;
		font-size: 1.5em;
		color: black;
		line-height: 1.5em;
		font-style: italic;
	}

	.brand-product-logo {
		width: 75px;
		height: 75px;
		margin: 15px;
		display:flex; 
		justify-content:center;
		align-items:center;
	}
	
	.brandName {
		width: 100%;
		text-align: left;
		color: rgb(47,47,47);
		font-size: 15px;
		
	}
	.address_num {
		width: 100%;
		text-align: left;
		color: rgb(100,100,100);
		font-size: 13px;
	}
	.brand-product-desc {
		color: gray;
		font-size: 13px;
		margin-left: 15px;
		margin-right: 15px;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.brand-product-parent{align-items: center;margin-top: 10px;margin-bottom: 10px;} 
	.brand-product-row{height:33%;display:flex;} 
	.brand-product-item{width:33%;margin-left:15px;margin-right: 15px;}
	.brand-product-lot {width:100%;height: 100%;}
</style>
<template>
	<tab>
		<tab-item @click='goBrandTab(1)' selected>品牌馆</tab-item>
		<tab-item @click='goBrandTab(2)'>匠人</tab-item>
	</tab>
	<div v-if="tabPosition===1">
		
		<li style="list-style-type:none;" v-for="item in brandHallList" @click="goBrandHallDetail(item)">
			<div>
				<div style="display:flex;flex-direction:row;">
					<div  class="brand-product-logo">
						<img :src="item.logo" style=" max-height:75px; max-width:75px;" />
					</div>
					

					<div style="display:flex;flex-direction:column;align-items:center;flex:1;background-color:white;margin-top:15px;margin-right:15px;align-content:space-around; 
					justify-content: space-around;max-height:75px;">
					<span class="hall-name brandName">{{item.brandName}}</span>
					<p class="hall-name address_num">来自{{item.address}}     {{item.count}}件作品</p>
				</div>
			</div>

			<hr style="clear:left;border:0;height:1px;background-color:#eeeeee;size:10;margin-left:15px;margin-right:15px;"></hr>
			<div class="brand-product-desc">{{item.desc}}</div>

			<div class="brand-product-parent" v-if="item.list.length > 0">
				<div class="brand-product-row">
					<div class="brand-product-item">
						<img :src="item.list[0].img" class="brand-product-lot" @click="goGood(item.list[0])"></img>
					</div>
					<div class="brand-product-item">
						<img :src="item.list[1].img" class="brand-product-lot" @click="goGood(item.list[1])"></img>
					</div>
					<div class="brand-product-item">
						<img :src="item.list[2].img" class="brand-product-lot" @click="goGood(item.list[2])"></img>
					</div>
				</div> 
			</div>
		</div>

		<div style="width:100%;height:10px;background-color:#efefef;"></div>
	</li>
	<see-more :on-see="loadmorebrand"></see-more>
</div>
<div v-if="tabPosition===2">
	<li style="list-style-type:none;margin:10px;box-shadow: 0 0 10px #efefef;" v-for="item in masterList" @click="goMasterDetail(item)">
		<img :src="item.imgUrl" class="home-preference-cover">
		<div class="home-item-title" style="margin-top:10px;">
			<img src="../../assets/img/fuhao.png" width="9px" height="8px;" style="margin-left:25px;">
			<div style="flex:1;padding-right:25px;padding-left:5px;font-size:15px;">{{item.slogan}} ”</div>
		</div>
		<div style="padding:10px;text-align:right;line-height:40px;height:40px;">
			<div style="float:right;color:#58bc9a;font-size:13px;">{{item.tag}}</div>
			<div style="float:right;margin-right:5px;display:flex;align-items:center;height: 100%;" v-if="item.tag&&item.tag!=''">
				<img src="../../assets/img/biaoqian.png" width="15px" height="15px">
			</div>
			<div style="float:right;font-size:13px;margin-right:20px;">{{item.nickname}}</div>
			<div style="width:40px;height:40px;position:relative;float:right;margin-right:10px;">
				<img :src="item.logo" width="40px" height="40px">
				<img src="../../assets/img/touxiang.png" width="40px" height="40px" style="position:absolute;left: 0;top: 0;">
			</div>
		</div>
	</li>
	<see-more :on-see="loadMasters"></see-more>
</div>
</template>
<script>
	import Tab from 'vux/dist/components/tab'
	import TabItem from 'vux/dist/components/tab-item'
	import Swiper from 'vux/dist/components/swiper'
	import SwiperItem from 'vux/dist/components/swiper-item'
	import SeeMore from '../partial/see-more'

	export default {
		route: {
			data() {
				document.title = "品牌";
			}
		},
		components: {
			SeeMore,
			Swiper,
			SwiperItem,
			Tab,
			TabItem,
		},
		ready() {
			document.body.style.overflow = 'visible';
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '品牌',
				back: false
			}]);
			// this.loadHallList();
		},
		data() {
			return {
				offset: 0,
				max: 8,
				tabPosition: 1,
				brandHallList: [],
				masterList:[],
				page: 0,
			}
		},
		methods: {
			
			loadMasters() {
				setTimeout(function() {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'master_getMasterList',
						offset: this.offset,
						max: this.max
					}).then((result) => {
						if (result && result.data && result.data.code == 200) {
							var temp = result.data.datalist;
							this.masterList = this.masterList.concat(temp);
						} else {
							this.$broadcast('$InfiniteLoading:noMore');
						}
					});
					this.$broadcast('$InfiniteLoading:loaded');
				}.bind(this), 1000);
			},
			goMasterDetail: function(item) {
				log(item);
				if (item.id > 0) {
					this.$route.router.go({
						name: 'master_detail',
						params: {
							id: item.id
						}
					});
				};
			},
			goBrandTab(index) {
				switch (index) {
					case 1:
					log("品牌馆");

					case 2:
					log("匠人");
				}

				this.tabPosition = index;
			},
			
			goGood: function (item) {
				if (item.id > 0) {
					this.$route.router.go({
						name: 'mallProductDetail_item',
						params: {
							id: item.id
						}
					});
				};
				
			},
			
			goBrandHallDetail(item) {
				this.$route.router.go({
					name: 'brandDetail_item',
					params: {
						id: item.id
					}
				});
			},

			loadHallList: function() {
				// setTimeout(function() {
					const PAGE_SIZE = 5;
					this.$http.post('', {
						act: 'mall_getMallBrandList',
						group: 'mall',
						offset:this.page * PAGE_SIZE,
						max:PAGE_SIZE
					}).then((result) => {
						if (result && result.data && result.data.code == 200) {
							var temp = result.data.datalist;
							this.brandHallList = this.brandHallList.concat(temp);
						} else {
							this.$broadcast('$InfiniteLoading:noMore');
						}
					});
					this.$broadcast('$InfiniteLoading:loaded');
				// }.bind(this), 1000);
				
			},
			loadmorebrand(){
				this.loadHallList();
				this.page++;
			},
		}
	}
</script>
