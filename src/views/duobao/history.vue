<template>
	<ul class="db-prize-list">
		<li class="db-record" v-for="history in historyData">
			<div class="top">
				<img class="logo" :src="history.logo"/>
				<h4>{{history.username}}</h4>
				<p>{{history.time}}</p>
			</div>
			<div class="mid">
				<p>参与了{{history.num}}次</p>
			</div>
			<div class="bottom">
				<ul>
					<li v-for="code in history.codes">
						<p>{{code}}</p>
					</li>
				</ul>
			</div>
		</li>
	</ul>
	<!-- <infinite-loading :on-infinite="loadHistory"></infinite-loading> -->
	<see-more :on-see="loadHistory"></see-more>
</template>

<script>
	// import InfiniteLoading from 'vue-infinite-loading'
	import SeeMore from '../partial/see-more'

	export default {
		components: {
			// InfiniteLoading
			SeeMore
		},
		ready() {
			this.id = this.$route.params.id;
			this.getHistoryData();
			document.title = '夺宝纪录';
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '夺宝纪录',
				back: true
        	}]);
		},
		methods: {
			getHistoryData() {
					this.$http.post('', {
						act: 'record_getHistoryList',
						group: 'cloud',
						id: this.id,
						offset: this.offset,
						max: this.max
					}).then((result) => {
						let histories = result.data.datalist;
						histories.forEach(function (obj) {
							obj['collapse'] = 0;
						});
						this.historyData = histories;
					})
				},

				loadHistory: function () {
					setTimeout(function () {
						this.offset = this.offset + this.max;
						this.$http.post('', {
							act: 'record_getHistoryList',
							group: 'cloud',
							id: this.id,
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
						this.historyData = this.historyData.concat(this.temp);
						this.$broadcast('$InfiniteLoading:loaded');
					}.bind(this), 1000);
				},
		},
		data() {
			return {
				id: '',
				offset: 0,
				max: 15,
				temp: [],
				historyData: []
			}
		}
	}
</script>