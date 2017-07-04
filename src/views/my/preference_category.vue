<template list-style:none;>
	<!-- <p>优选分类{{id}}</p> -->
	<ul class="category-preference-item" v-for="item in preference" @click="goPreferenceDetail(item)">
		<img :src="item.cover" style="width:100%;height:180px;"></img> 
		<div style="flex-direction:row;display:flex;margin-top:5px;margin-left:10px;margin-right:10px;margin-bottom:5px;">
			<p style="flex:1;font-size:14px;font-weight:bold;color:#2F2F2F;">{{item.title}}</p>
			<p style="font-size:12px;color:#58BC9A;" v-if="item.tag.length > 0">#{{item.tag}}#</p>
		</div>
		
		<p style="font-size:12px;color:#2F2F2F;background-color:white;margin-left:10px;margin-right:10px;margin-bottom:5px;">{{item.summary}}</p>

		<div style="clear:both;background-color:#efefef;width:100%;height:8px;" v-if="preference.length > 0">
			<div style="height:1px;background-color:#e7e7e7;"></div>
			<div style="height:1px;background-color:#e7e7e7;margin-top:6px;"></div>
		</div>
	</ul>

	<ul v-for="item in banners" style="background-color:orange;margin-top:10px;margin-bottom:10px;" @click="goPage(item)">
		<div style="width:45.5%;" :class="{'div-float-left': $index % 2 == 0, 'div-float-right' : $index % 2 == 1}"> 
			<img :src="item.img" style="height:100px;width:100%;border-radius:5px;"></img>
		<div>
	</ul>

	<div style="clear:both;background-color:#efefef;width:100%;height:8px;" v-if="banners.length > 0">
		<div style="height:1px;background-color:#e7e7e7;"></div>
		<div style="height:1px;background-color:#e7e7e7;margin-top:6px;"></div>
	</div>

	<div class="section-header" v-if="master.length > 0">
		<div style="height:1px;background-color:#e7e7e7;flex:1;margin-top:4.5px;margin-left:10px;margin-right:10px;"></div>
		<img src="../../assets/img/xian.png" style="height:5px;margin-top:2.5px;"></img>
		<p style="line-height:10px;margin-left:10px;margin-right:10px;">热门匠人</p>
		<img src="../../assets/img/xian.png" style="height:5px;margin-top:2.5px;"></img>
		<div style="height:1px;background-color:#e7e7e7;flex:1;margin-top:4.5px;margin-left:10px;margin-right:10px;"></div>
	</div>

	<div style="padding-left:10px;padding-right:1px;">
		<ul style="margin-top:-1px;">
			<li v-for="item in master" style="margin-bottom:10px;">
				
				<div @click="goChannel(item.id)" style="flex-direction:row;display:flex;margin-right:10px;margin-top:10px;margin-bottom:10px;">
					<img :src="item.logo" style="width:40px;height:40px;border-radius:20px;">
					<div style="display:flex;flex-direction:column;flex:1;background-color:white;align-content:space-around;justify-content:space-around;max-height:40px;">
						<div style="font-size:13px;color:#2F2F2F;padding-left:10px;background-color:white;" v-if="item.nickname.length > 0">{{item.nickname}}</div>
						<div style="padding-left:10px;background-color:white;font-size;12px;color:#A1A1A1" v-if="item.brandName.length > 0">{{item.brandName}}</div>
					</div>
				</div>

				<ul class="slide-box" style="margin-top:5px;margin-right:10px;">
					<li class="slide-item" v-for="item in item.productList" @click="goAuction(item)">
						<img :src="item.img" style="width:100px;height:100px;" />
						<div style="color:#2F2F2F;font-size:13px;overflow:hidden;width:100px;">{{item.name}}</div>
						<div style="color:#A1A1A1;font-size:12px;">{{item.subTitle}}</div>
						<div style="color:#58bc9a;font-size:12px;">¥{{item.price}}</div>
					</li>
				</ul>
			</li>
		</ul>
	</div>

	<div class="section-header" v-if="list.length > 0">
		<div style="height:1px;background-color:#e7e7e7;flex:1;margin-top:4.5px;margin-left:10px;margin-right:10px;"></div>
		<img src="../../assets/img/xian.png" style="height:5px;margin-top:2.5px;"></img>
		<p style="line-height:10px;margin-left:10px;margin-right:10px;">好物推荐</p>
		<img src="../../assets/img/xian.png" style="height:5px;margin-top:2.5px;"></img>
		<div style="height:1px;background-color:#e7e7e7;flex:1;margin-top:4.5px;margin-left:10px;margin-right:10px;"></div>
	</div>

	<ul class="category-preference-item" v-for="item in list" @click="goPreferenceDetail(item)">
		<img :src="item.cover" style="width:100%;height:180px;"></img> 
		<div style="flex-direction:row;display:flex;margin-top:5px;margin-left:10px;margin-right:10px;margin-bottom:5px;">
			<p style="flex:1;font-size:14px;font-weight:bold;color:#2F2F2F;">{{item.title}}</p>
			<p style="font-size:12px;color:#58BC9A;" v-if="item.tag.length > 0">#{{item.tag}}#</p>
		</div>
		
		<p style="font-size:12px;color:#2F2F2F;background-color:white;margin-left:10px;margin-right:10px;margin-bottom:5px;">{{item.summary}}</p>
		
		<div style="clear:both;background-color:#efefef;width:100%;height:8px;" v-if="list.length > 0">
			<div style="height:1px;background-color:#e7e7e7;"></div>
			<div style="height:1px;background-color:#e7e7e7;margin-top:6px;"></div>
		</div>
	</ul>

	<div class="section-header" v-if="goods.length > 0">
		<div style="height:1px;background-color:#e7e7e7;flex:1;margin-top:4.5px;margin-left:10px;margin-right:10px;"></div>
		<img src="../../assets/img/xian.png" style="height:5px;margin-top:2.5px;"></img>
		<p style="line-height:10px;margin-left:10px;margin-right:10px;">热门商品</p>
		<img src="../../assets/img/xian.png" style="height:5px;margin-top:2.5px;"></img>
		<div style="height:1px;background-color:#e7e7e7;flex:1;margin-top:4.5px;margin-left:10px;margin-right:10px;"></div>
	</div>

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

<style>
    .category-preference-item {
    	background-color: white;
    	width: 100%;
    	margin-bottom: 10px;
    	margin: 0px;
    	/*height: 100px;*/
    }
    .div-float-left {
    	float: left;
    	/*background-color: green;*/
    	margin-left: 3%;
    	/*margin-right: 0.5%;*/
    	margin-bottom: 3%;
    }
    .div-float-right {
    	float: right;
    	/*background-color: purple;*/
    	/*margin-left: 0.5%;*/
    	margin-right: 3%;
    	margin-bottom: 3%;
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
	.section-header {
		width: 100%;
		text-align: center;
		font-size: 1.5em;
		color: #2F2F2F;
		line-height: 1.5em;
		margin-top: 10px;
		display: flex;
		flex-direction: row;
		align-content:space-around;
		justify-content:space-around;
		margin-top: 10px;
		margin-bottom: 10px;
	}
</style>

<script>
	import SeeMore from '../partial/see-more'

	export default {
		components: {
			SeeMore,
		},
		route:{
			data(){
				document.title = "优选分类";
			}
		},
		data() {
			return {
				id: 0,
				preference: [],
				banners: [],
				master: [],
				list: [],
				goods: [],
				category_offset: 0,
				category_max: 6,
			}
		},
		ready() {
			this.id = this.$route.params.id;
			this.$dispatch.apply(this,['onTitleChanged',{title:'优选分类',back:true}]);
			document.title = "优选分类";

			this.recommend_getListByLabelId();
			// this.loadGoods();
		},
		methods: {
			recommend_getListByLabelId: function() {
				this.$http.post('', {
					act: 'recommend_getListByLabelId',
					group: 'recommend',
					labelId: this.id
				}).then((result) => {
					if (result.data.code == 200) {
						// log(JSON.stringify(result));
						var dict = result.data.data;
						if (dict.preference != undefined) {
							this.preference = [dict.preference];
						};
						
						this.banners = dict.banners;

						if (dict.master != undefined) {
							this.master = [dict.master];
						};
						
						this.list = dict.list;
					};
					
				});
			},
			loadGoods() {
				setTimeout(function() {
					
					this.$http.post('', {
						act: 'preferenceGood_getList',
						group: 'preference',
						labelId: this.id,
						offset: this.category_offset,
						max: this.category_max
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
					this.category_offset = this.category_offset + this.category_max;
				}.bind(this), 1000);
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
	            }
            },
			goGood: function (item) {
				if (item.id > 0) {
					this.$route.router.go({
						name: 'mallDetail_item',
						params: {
							id: item.id
						}
					});
				};
				
			},
			goAuction: function(item) {
				if (item.id > 0) {
					this.$route.router.go({
						name: 'auctionDetail_item',
						params: {
							id: item.id
						}
					});
				};
			},
			goPreferenceDetail: function(item) {
				if (item.id > 0) {
					this.$route.router.go({
						name: 'preferenceDetail_item',
						params: {
							id: item.id
						}
					});
				};
			},
		}
	}
</script>