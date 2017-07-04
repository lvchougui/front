<template>
	<ul class="activity-list">
		<li class="activity" v-for="activity in mainData">
			<div class="static-banner">
				<img :src="activity.cover" @click="goDetail(activity)"/>
			</div>
    		<ul class="platoon">
    		    <li v-for="good in activity.goods">
    		    	<div class="card" @click="goGood(good)">
    		        	<img :src="good.img" :style = "{height: itemHeight}"/>
    		        	<div class="name">{{good.name}}</div>
    		        	<div class="price">¥{{good.price}}</div>
    		        </div>
    		    </li>
    		</ul>
    	</li>
    </ul>
	<!-- <infinite-loading :on-infinite="loadActivityList"></infinite-loading> -->
	<see-more :on-see="loadActivityList"></see-more>
</template>

<script>
	// import InfiniteLoading from 'vue-infinite-loading'
	import SeeMore from '../partial/see-more'

	export default {
		name: 'activity-list',
		components: {
			// InfiniteLoading,
			SeeMore
		},
		ready() {
			this.getActivityList();
			this.itemHeight = window.innerWidth / 4 - 8 + 'px';
		},
		methods: {
			getActivityList() {
    			this.$http.post('', {
    			    act: 'activity_getList',
    			    group: 'special',
    			    offset: this.offset,
    			    max: this.max
    			}).then((result) => {
    			    var resp = result.data;
    			    if (result && result.data && result.data.code == 200) {
    			        this.mainData = result.data.datalist;
    			        this,$dispatch('loaded');
    			    }
    			})
    		},
				loadActivityList: function () {
					setTimeout(function () {
						this.offset = this.offset + this.max;
						this.$http.post('', {
							act: 'activity_getList',
    			    		group: 'special',
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
				goDetail: function (activity) {
					this.$route.router.go({
						name: 'activity_detail',
						params: {
							id: activity.id
						}
					});
				},
				goGood: function (good) {
					this.$route.router.go({
						name: 'activity_good',
						params: {
							id: good.id
						}
					});
				}
		},
		data() {
			return {
				offset: 0,
				max: 10,
				itemHeight: '',
				mainData: '',
				temp: []
			}
		}
	}
</script>