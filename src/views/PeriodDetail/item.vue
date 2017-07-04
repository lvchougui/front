<style type="text/css">
	.intro-btm {
		line-height: 18px;
	}
	.intro-btm span.tip{ 
		font-size: 12px !important;
	}
	.intro-btm .price {
		font-size: 12px !important;
	}
</style>
<template>

   <div style="position:relative;">
  	    <img width="100%" :src="data.room.coverimg">
          <p v-show = "data.type == 2" style="height:40px;line-height:40px;margin-top:-40px; margin-left:12px;color:#fff; font-size:14px;">
          	<span>距结拍:</span>
  	        <clocker v-if="time" style="display:inline" :time="time" ></clocker>
          </p>
   </div>

   <div style="background-color:white;height:40px;line-height:40px">
   	   <span class="masterNameColor" style="margin-left:10px;">{{data.room.name}}</span>
   	   <span class="masterNameColor" style="float:right;margin-right:20px">{{data.patLength}}</span>
   </div>

	<!-- 商品图片 -->
	<template v-for = "item in data.auctions">
		<!-- 循环添加此处的div -->
		<div
		@click = "pushAuctionDetail(item.id)"
		style="float:left;width:50%;">
			<div style="border:1px solid #ddd; margin:8px;" class="bg-white" >
				<img :src= "item.img" style="width:100%" />
				<p style="margin:5px;font-size:14px;height:28px;line-height:14px">{{item.name}}</p>

				<div style="margin:5px;overflow:hidden;">

					<!-- 预热中  -->
					<div class="intro-btm" v-if = "item.status == 1">
						<span>
							<span class="text-primary price">
							¥{{item.initPrice}}
							</span>
							<span class="tip">起拍价&nbsp;</span>
						</span>
						<span>
							<span class="text-primary price">¥{{item.stepPrice}}</span>
							<span class="tip">加幅价</span>
						</span>
					</div>

					<!-- 拍卖中  -->
					<div class="intro-btm" v-if = "item.status == 2">
						<span>
							<span class="text-primary price">
							¥{{ item.lastBidding ? item.lastBidding.price : item.initPrice}}
							</span>
							<span class="tip">当前价&nbsp;</span>
						</span>
						<span>
							<span class="text-primary price">¥{{item.stepPrice}}</span>
							<span class="tip">加幅价</span>
						</span>
					</div>

					<!-- 已结拍 & 已流拍  -->
					<div class="intro-btm" v-if = "item.status == 3 || item.status == 4">
						<p>
							<span class="text-primary price">
							{{ item.lastBidding ? '¥'+item.lastBidding.price : ''}}
							</span>
							<span class="tip">{{ item.lastBidding ? '成交价' : '无人出价'}}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	</template>

</template>

<script>
	import Swiper from 'vux/dist/components/swiper'
	import SwiperItem from 'vux/dist/components/swiper-item'
	import XButton from 'vux/dist/components/x-button'
	import Box from 'vux/dist/components/box'
	import Clocker from 'vux/dist/components/clocker'
	import {
        configShare
    }
    from '../../lib/wxclient'

	export default {

		route:{
			data(){
				document.title = "期次详情";
			}
		},
		components: {
			Swiper,
			SwiperItem,
			XButton,
			Clocker
		},
		ready:function(){
			document.body.style.overflow = 'visible';
			this.$dispatch.apply(this,['onTitleChanged',{title:'期次详情',back:true}]);
			this.getData();
			this.getShareInfo();
		},
		methods: {

		//type == 1 ;顺序拍
		//type == 2 ;同步拍
		getData (){
			this.$http.post('',{
				act: 'room_getStageDetail',
				id:this.$route.params.id,
				}).then(function (result) {

					let resp = result.data;
					log(resp);
					if (resp.code == 200) {
						let data = resp.data;
						this.data = data;
						this.data.patLength = data.auctions.length + "件拍品";
						if (data.type == 1) {
							// alert("顺序排");
						}
						if (data.type == 2) {
							// alert("同步拍")
							this.time = this.data.auctions[0].trueCloseTime;
						}
					}else{
						// alert("请求数据失败");
					}
				});

			},
			pushAuctionDetail:function(auctionId){
				// alert(auctionId);
				this.$route.router.go({name: 'auctionDetail_item', params: {id: auctionId}})
			},
			getShareInfo() {
                this.$http.post('', {
                    act: 'share_getInfo',
                    type: 'room',
                    id: this.$route.params.id
                }).then((resp) => {
                    log(resp);
                    if (resp && resp.data) {
                        log('ddd')
                        if (resp.data.code == 200) {
                        log('eee')
                            var result = resp.data.data;

                            var share_info = {
                                title: result.title,
                                desc: result.summary,
                                link: window.location.href,
                                imgUrl: result.img
                            };
                            setTimeout(configShare(share_info),3000);
                            
                        }
                    }
                })
            },
		},
		data (){
			return {
				data: {
					master:{},
					auctions:[],
					room:{},
					nowPrice:'200',
					patLength:'',
				},
				userDatas:['1','12'],
				time:''
			}
		},
	}
</script>

<style>
	.db-detail-top {
		background-color: #fafafa;
		border-bottom: 1px solid rgb(220, 220, 220);
	}
	
	.db-detail-top .db-detail-title {
		display: table-cell;
		vertical-align: middle;
		height: 56px;
		line-height: 28px;
		font-size: 1em;
		font-weight: 600;
		padding: 0 8px 0 20px
	}

	.backImage {
		background-image:url(../../assets/img/icon_blue.png);
	}
</style>