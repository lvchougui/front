<template>
	<ul class="redeem-record">
		<li v-for="item in mainData">
			<div class="name">{{item.purpose}}</div>
			<div class="time">{{item.givenTime}}</div>
			<div class="count">+{{item.integral}}</div>
		</li>
	</ul>
	<infinite-loading :on-infinite="loadList"></infinite-loading>
</template>

<script>
	import InfiniteLoading from 'vue-infinite-loading';
	
	export default {
		components: {
			InfiniteLoading
		},

		ready() {
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '积分纪录',
				back: true
				}]);
			this.getList();
		},
		
		methods: {
			getList() {
				this.$http.post('', {
					act: 'integral_getList',
					page: this.page,
					size: this.size
				}).then((result) => {
					this.mainData = result.data.datalist;
				})
			},
			loadList: function () {
					setTimeout(function () {
						this.page = this.page + this.size;
						this.$http.post('', {
							act: 'integral_getList',
							page: this.page,
							size: this.size
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
		},
		
		data() {
			return {
				page: 1,
				size: 15,
				temp: [],
				mainData: []
			}
		}
	}
</script>