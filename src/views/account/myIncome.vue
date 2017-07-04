<template>
	<ul class="deposit-record">
		<li>
			<div class="name">{{item.name}}</div>
			<div class="time">{{item.time}}</div>
			<div class="amount">{{item.amount}}</div>
			<div class="type">
				<template v-if="item.type==200">单品拍卖</template>
				<template v-if="item.type==210">专场拍卖</template>
				<template v-if="item.type==100">大师入驻</template>
				<template v-if="item.type==210">经销商入驻</template>
				<template v-if="item.type==300">退还保证金</template>
			</div>
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
				title: '保证金纪录',
				back: true
				}]);
			this.getList();
		},

		methods: {
			getList() {
					this.$http.post('', {
						act: 'deposit_getList',
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
							act: 'deposit_getList',
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