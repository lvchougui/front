<style>
	.auction-slide-banner{
		display: -webkit-box;
		overflow-x: scroll;
		-webkit-overflow-scrolling:touch;
	}
	.slide-banner-item{
		margin-left: 10px;
	}
	.slide-box::-webkit-scrollbar {display:none}
	.slide-image{
		width: 140px;
		height: 75px;
		border-radius: 5px;
	}
</style>
<template>
	<div style="margin-top:15px;">
		<ul class="auction-slide-banner" >
			<li class="slide-banner-item" v-for="item in banners" @click="goPage(item)">
				<img class="slide-image" :src="item.img" />
			</li>
		</ul>
	</div>
	<single-auction-list act="tgAuction_getListByStatusAndCateId"></single-auction-list>
</template>
<script>
	import SeeMore from '../partial/see-more'
	import SingleAuctionList from '../../views/partial/single-auction-list'
	import helper from '../../lib/browser-helper';

	export default {
		route: {
			data() {
				document.title = "拍卖";
			}
		},
		components: {
			SeeMore,
			SingleAuctionList,
			helper,
		},
		ready() {
			document.body.style.overflow = 'visible';
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '拍卖',
				back: false
			}]);
			this.getBanner();
		},
		data() {
			return {
				offset: 0,
				max: 10,
				banners: [],
			}
		},
		methods: {
			getBanner(){
				this.$http.post('', {
					act: 'banner_getStageList'
				}).then((result) => {
					var resp = result.data;
					if (result && result.data && result.data.code == 200) {
						this.banners = result.data.datalist;
					}
				})
			},
			goPage(item){
				if(item.type == 'webpage'){
					window.location.href = item.page;
				} else if (item.type == 'native') {
                // 期次详情
                if (item.page == 'stagedetail') {
                	this.$route.router.go({
                		name: 'stage_detail',
                		params: {
                			id: item.params.id
                		}
                	});
                }
                // 拍品详情
                else if (item.page == 'auctiondetail') {
                	this.$route.router.go({
                		name: 'auctionDetail_item',
                		params: {
                			id: item.params.id
                		}
                	});
                }
            }
        }
    }
}
</script>