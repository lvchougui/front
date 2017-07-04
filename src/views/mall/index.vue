<style>
	.home-top {
		background-color: #fafafa;
		border-bottom: 1px solid rgb(220, 220, 220);
	}

	.cate-list {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		align-content: flex-start;
		margin-top: 15px;
	}

	.cate-list .entry {
		color: rgb(100, 100, 100);
		box-sizing: border-box;
		flex: 0 0 25%;
		height: 50px;
		text-align: center;
	}

	.cate-list .entry img {
		width: 45px;
		height: 31px;
	}

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
	.divider{
		width: 100%;
		height: 5px;
		background-color: #efefef;
	}
	.slide-box{
		display: -webkit-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.slide-item{
		margin-right: 10px;
		text-align: center;
	}
	.slide-box::-webkit-scrollbar {display:none}


	.brand-product-logo {
		width: 75px;
		height: 75px;
		margin: 15px;
		/*float: left;*/
		/*background-color: black;*/
	}
	.hall-name {
		/*overflow: hidden;*/
		/*display: flex;*/
		/*flex: 1;*/
		/*background-color: green;*/
		/*flex-direction: column;*/
		/*align-content:space-between; */
		/*margin-left: 20px;*/
		/*vertical-align: center;*/
	}
	.brandName {
		width: 100%;
		text-align: left;
		color: rgb(47,47,47);
		font-size: 15px;
		/*padding-right: 5px;*/
		/*white-space: nowrap;*/
		/*overflow: hidden;*/
		/*text-overflow: ellipsis;*/
		/*margin-top: 15px;*/
		/*margin-right: 10px;*/
	}
	.address_num {
		width: 100%;
		text-align: left;
		color: rgb(100,100,100);
		font-size: 13px;
		/*padding-right: 5px;*/
		/*white-space: nowrap;*/
		/*overflow: hidden;*/
		/*text-overflow: ellipsis;*/
		/*margin-top: 3px;*/
	}
	.brand-product-desc {
		color: gray;
		font-size: 13px;
		margin-left: 15px;
		margin-right: 15px;
		margin-top: 10px;
		margin-bottom: 10px;
		/*padding: 10px;*/
	}
	.brand-product-parent{align-items: center;margin-top: 10px;margin-bottom: 10px;} 
	.brand-product-row{height:33%;display:flex;} 
	.brand-product-item{width:33%;margin-left:15px;margin-right: 15px;}
	.brand-product-lot {width:100%;height: 100%;}
</style>
<template>
	
	<div class="home-top">
		<swiper :aspect-ratio="497/1242" dots-position="center" auto>
			<swiper-item class="swiper-demo-img" v-for="item in banners" @click="goPage(item)">
				<img :src="item.img" style="width:100%;height:100%;">
			</swiper-item>
		</swiper>
	</div>
	<div class="divider"></div>
	<!-- <div class="label-ch" style="">分类</div> -->
	<!-- <div class="label-en">CLASSIFY</div> -->
	<div class="cate-list">
		<div class="entry" v-for="item in tags" @click="filterMall(item)">
			<img :src="item.img" />
		</div>
	</div>
	<div v-if="channels&&channels.length!=0">
		<div class="divider"></div>
		<div class="label-ch" style="">推荐商品频道</div>
		<!-- <div class="label-en">CHANNEL</div> -->
		<div style="border:1px solid #e7e7e7;margin:10px;padding-left:10px;padding-right:1px;">
			<ul style="margin-top:-1px;">
				<li v-for="item in channels" style="margin-bottom:10px;">
					<div style="height:1px;background-color:#e7e7e7;margin-right:9px;"></div>
					<div @click="goChannel(item.id)">
						<div style="font-size:1.3em;color:black;margin-top:10px;">{{item.channelName}}</div>
						<div >{{item.summary}}</div>
					</div>

					<ul class="slide-box" style="margin-top:5px;">
						<li class="slide-item" v-for="item in item.list" @click="goGood(item)">
							<img :src="item.img" style="width:80px;height:80px;" />
							<div style="color:#58bc9a;">¥{{item.price}}</div>
						</li>
					</ul>
					<div style="margin-top:10px;" @click="goChannel(item.id)">
						<div style="font-size:1.3em;color:#58bc9a;">查看全部{{item.count}}件商品</div>
					</div>

				</li>
			</ul>
		</div>
	</div>
	<div class="divider"></div>
	<div class="label-ch" style="">单品推荐</div>
	<!-- <div class="label-en">SINGLE PRODUCT</div> -->
	<ul class="stage-detail-list activity-good-list">
		<li v-for="item in goods">
			<div class="card" @click="goGood(item)">
				<img :src="item.img"  :style = "{height: itemHeight}"/>
				<div class="name" style="padding-left:0.5em;padding-right:0.5em;font-size:1.2em;">{{item.name}}</div>
				<div class="stat" style="padding-left:0.5em;padding-right:0.5em;">
					<span style="color:grey;float:left;font-size:12px;">{{item.nickname}}</span>
					<span class="price" style="color:#58bc9a;float:right;">¥{{item.price}}</span>
				</div>
			</div>
		</li>
	</ul>
	<see-more :on-see="loadGoods"></see-more>
	
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
				document.title = "好物";
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
				title: '好物',
				back: false
			}]);
			this.getBanner();
			this.getMallTags();
			this.getChannels();
			this.getGoods();
		},
		data() {
			return {
				offset: 0,
				max: 10,
				mallTabPosition: 1,
				stageTabPosition: 1,
				banners: [],
				tags:[],
				channels:[],
				goods:[],
				auctionBanner: {},
				stageBanner: {},
				mainData: [],
				brandHallList: [],
				page: 0,
			}
		},
		methods: {
			getBanner() {
				this.$http.post('', {
					act: 'mall_getMallBanner',
					group:'mall'
				}).then((result) => {
					var resp = result.data;
					if (result && result.data && result.data.code == 200) {
						this.banners = result.data.datalist;
					}
				})
			},
			getMallTags() {
				this.$http.post('', {
					act: 'mall_getMallCategoryList',
					group:'mall'
				}).then((result) => {
					var resp = result.data;
					if (result && result.data && result.data.code == 200) {
						this.tags = result.data.datalist;
					}
				})
			},
			getChannels(){
				this.$http.post('', {
					act: 'mall_getMallChannelList',
					group:'mall',
					commend : 1
				}).then((result) => {
					var resp = result.data;
					if (result && result.data && result.data.code == 200) {
						this.channels = result.data.datalist;
					}
				})
			},
			getGoods(){
				this.$http.post('', {
					act: 'mall_getMallSkuinfo',
					group:'mall',
					offset: this.offset,
					max: this.max
				}).then((result) => {
					var resp = result.data;
					if (result && result.data && result.data.code == 200) {
						this.goods = result.data.datalist;
					}
				})
			},

			
			loadGoods() {
				setTimeout(function() {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'mall_getMallSkuinfo',
						group: 'mall',
						offset: this.offset,
						max: this.max
					}).then((result) => {
                    // log(result)
                    if (result && result.data && result.data.code == 200) {
                    	var temp = result.data.datalist;
                    	this.goods = this.goods.concat(temp);
                    } else {
                    	this.$broadcast('$InfiniteLoading:noMore');
                    }
                });
					this.$broadcast('$InfiniteLoading:loaded');
				}.bind(this), 1000);
			},
			goGood: function (item) {
				// if (typeof(JsBridge) != 'undefined') {
				// 	JsBridge.openMallProductDetail(item.id);
				// 	return;
				// };
				if (item.id > 0) {
					this.$route.router.go({
						name: 'mallProductDetail_item',
						params: {
							id: item.id
						}
					});
				};
				
			},
			goChannel:function(id){
				
				this.$route.router.go({
					name: 'channelDetail_item',
					params: {
						id: id
					}
				});
			},
			goBrandHallDetail(item) {
				this.$route.router.go({
					name: 'brandDetail_item',
					params: {
						id: item.id
					}
				});
			},
			
			filterMall(item){
				this.$route.router.go({
					name: 'mallcategory',
					params: {
						id: item.id,
					},
					query: {
						name: item.name,
					}
				});
			},
			goPage(item){
				if(item.type == 'webpage'){
					window.location.href = item.page;
				} else if (item.type == 'native') {
		                // 期次详情
		                if (item.page == 'stagedetail') {
		                	this.goStageBanner(item.params.id);
		                }
		                // 拍品详情
		                else if (item.page == 'auctiondetail') {
		                	this.goAuctionBanner(item.params.id);
		                } 
		                else if (item.page == 'channeldetail') {
		                	this.goChannelBanner(item.params.id);
		                }
		                else if (item.page == 'branddetail') {
		                	this.goBrandBanner(item.params.id);
		                }
		                else if (item.page == 'preferencedetail') {
		                	this.goPreferenceBanner(item.params.id);
		                }
		            }

		        },
		        goAuctionBanner:function(aid){
		        	if (aid > 0) {
		        		this.$route.router.go({
		        			name: 'auctionDetail_item',
		        			params: {
		        				id: aid
		        			}
		        		});
		        	};
		        },
		        goBrandBanner:function(brandid){
		        	if (brandid > 0) {
		        		this.$route.router.go({
		        			name: 'brandDetail_item',
		        			params: {
		        				id: brandid
		        			}
		        		});
		        	};
		        },
		        goChannelBanner:function(cid){
		        	if (cid > 0) {
		        		this.$route.router.go({
		        			name: 'channelDetail_item',
		        			params: {
		        				id: cid
		        			}
		        		});
		        	};
		        },
		        goStageBanner:function(stageId){
		        	if (stageId > 0) {
		        		this.$route.router.go({
		        			name: 'stage_detail',
		        			params: {
		        				id: stageId
		        			}
		        		});
		        	};
		        },
		        goPreferenceBanner: function(pid) {
		        	if (pid > 0) {
		        		this.$route.router.go({
		        			name: 'preferenceDetail_item',
		        			params: {
		        				id: pid
		        			}
		        		});
		        	};
		        },
		    }
		}
	</script>
