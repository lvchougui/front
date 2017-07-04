<template>
	<ul class="db-prize-list">
		<li class="db-record" v-for="prize in prizeData">
			<div class="top">
				<p class="id">{{prize.id}}</p>
				<p>{{prize.time}}</p>
			</div>
			<div class="mid">
				<h4>夺得: {{prize.name}}</h4>
				<button @click="goShow(prize.id)" disabled>晒单得券</button>
			</div>
		</li>
	</ul>
	<infinite-loading :on-infinite="loadPrizeloadPrize"></infinite-loading>
	<see-more :on-see="loadmore"></see-more>
</template>

<script>
	import InfiniteLoading from 'vue-infinite-loading'
	import SeeMore from '../partial/see-more'

	export default {
		components: {
			// InfiniteLoading
			SeeMore
		},
		ready() {
			this.$dispatch.apply(this,['onTitleChanged',{title:'中奖纪录',back:true}])
			this.getPrizeData();
		},
		methods: {
			goShow: function (id) {
				this.$route.router.go({
					name: 'duobao_show',
					params: {
						id: id
					}
				});
			},

			getPrizeData() {
				this.$http.post('', {
					act: 'goods_prizeList',
					group: 'cloud',
					offset: this.offset,
					max: this.max
				}).then((result) => {
					this.prizeData = result.data.datalist;
				})
			},

			loadPrize: function () {
				setTimeout(function () {
					this.offset = this.offset + this.max;
					this.$http.post('', {
						act: 'goods_prizeList',
						group: 'cloud',
						offset: this.offset,
						max: this.max
					}).then((result) => {
						if (result.data.code == 229) {
							this.temp = []
							this.$broadcast('$InfiniteLoading:noMore');
						} else {
							this.temp = result.data.datalist;
						}
					})
					this.prizeData = this.prizeData.concat(this.temp);
					this.$broadcast('$InfiniteLoading:loaded');
				}.bind(this), 1000);
			},
		},
		data() {
			return {
				offset: 0,
				max: 15,
				temp: [],
				prizeData: []
			}
		}
	}
</script>