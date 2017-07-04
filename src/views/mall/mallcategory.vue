<template>
	<ul class="stage-detail-list activity-good-list">
		<li v-for="item in datalist">
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
	<see-more :on-see="loadmore"></see-more>
</template>

<style type="text/css">
	
</style>

<script type="text/javascript">
	import SeeMore from '../partial/see-more'
	export default {
		components: {
			SeeMore,
		},
		ready() {
			// this.id = this.$route.params.id;
			document.body.style.overflow = 'visible';
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '',
				back: false
			}]);
			var name = this.$route.query.name;
			if (name != undefined) {
				document.title = name;
			} else {
				document.title = "好物分类";
			}
			
			// this.loadData();
		},
		data() {
			return {
				datalist: [],
				offset: 0,
				max: 4,
			}
		},
		methods: {
			loadData: function() {
				setTimeout(function() {
	                this.$http.post('', {
	                    act: 'mall_getMallSkuInfoByTagid',
	                    group: 'mall',
	                    id: this.$route.params.id,
	                    offset: this.offset,
						max: this.max
	                }).then((result) => {
	                    log('getBrandHallList', result)
	                    if (result && result.data && result.data.code == 200) {
	                    	var temp = result.data.datalist;
	                    	this.datalist = this.datalist.concat(temp);
	                    } else {
	                    	this.$broadcast('$InfiniteLoading:noMore');
	                    }

	                    this.offset += this.max;
	                });


					this.$broadcast('$InfiniteLoading:loaded');
				}.bind(this), 1000);
				
            },
            loadmore(){
				this.loadData();
			},
			goGood: function (item) {
				if (typeof(JsBridge) != 'undefined') {
					JsBridge.openMallProductDetail(item.id);
					return;
				};
				this.$route.router.go({
					name: 'mallProductDetail_item',
					params: {
						id: item.id
					}
				});
			},
		}
	}
</script>