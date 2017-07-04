<template>
	<ul class="stage-list-kai">
		<li class="stage-kai" v-for="item in data">
			<div class="stage-title">
				<div class="name">{{item.name}}</div>
				<div class="time" v-if="item.status==1">进行中</div>
				<div class="time" v-if="item.status==2">{{item.openTime}} 开拍</div>
				<div class="time" v-if="item.status==3">已结束</div>
				<!--<i class="material-icons">share</i>-->
				<div class="watcher">{{item.onlookercount}}人围观</div>
			</div>
			<div class="stage-cover" v-if="item.coverimg" @click="goStage(item.id)">
				<img :src="item.coverimg" />
			</div>
			<ul class="stage-goods" v-if="!item.coverimg">
				<li v-for="item in item.auctions" @click="goAuction(item.id)">
					<img :src="item.img" />
					<div>{{item.name}}</div>
				</li>
			</ul>
			<div class="go" @click="goStage(item.id)">
				<div>{{item.auctions.length}}件拍品 立即参与</div>
				<i class="material-icons">keyboard_arrow_right</i>
			</div>
		</li>
	</ul>
	<!-- <infinite-loading :on-infinite="loadStages" v-if="page"></infinite-loading> -->
	<!-- <see-more :on-see="loadStages"></see-more> -->
</template>

<script>
	// import InfiniteLoading from 'vue-infinite-loading'
	// import SeeMore from '../partial/see-more'

	export default {
		name: 'stage-list',
		props: {
			data: {
				type: Array
			}
		},
		components: {
			// InfiniteLoading,
			// SeeMore
		},
		ready() {},
		methods: {
			getStages() {
					if (this.page == true) {
						this.$http.post('', {
							act: this.act,
							offset: this.offset,
							max: this.max,
						}).then((result) => {
							if (result && result.data && result.data.code == 200) {
								this.mainData = result.data.datalist;
							}
						})
					} else if (this.status) {
						this.$http.post('', {
							act: this.act,
							status: this.status
						}).then((result) => {
							if (result && result.data && result.data.code == 200) {
								this.mainData = result.data.datalist;
							}
						})
					} else {
						this.$http.post('', {
							act: this.act
						}).then((result) => {
							if (result && result.data && result.data.code == 200) {
								this.mainData = result.data.datalist;
							}
						})
					}
				},
				loadStages: function () {
					setTimeout(function () {
						this.offset = this.offset + this.max;
						this.$http.post('', {
							act: this.act,
							offset: this.offset,
							max: this.max,
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
				goStage: function (id) {
					this.$route.router.go({
						name: 'stage_detail',
						params: {
							id: id
						}
					});
				},
				goAuction: function (id) {
					this.$route.router.go({
						name: 'auctionDetail_item',
						params: {
							id: id
						}
					});
				}
		},
		data() {
			return {
				offset: 0,
				max: 10,
				page: false,
				temp: []
			}
		}
	}
</script>