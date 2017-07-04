<template>
	<div class="see-more" v-if="canLoad == 'can'" @click="toSee">
		查看更多
	</div>
	<div class="see-more" v-if="canLoad == 'loading'">
		加载中
	</div>
	<div class="see-nomore" v-if="canLoad == 'cant'">
		已加载全部
	</div>
</template>

<script>
	export default {
		name: 'see-more',
		data () {
			return {
				canLoad: 'loading',
				automatic: true
			}
		},
		props: {
			onSee: {
				type: Function,
        		required: true,
			}
    	},
    	ready() {
    		this.onSee()
    		if(this.automatic){
    			window.addEventListener('scroll', this.handleScroll);
    		}
    	},
    	methods: {
    		toSee () {
    			this.canLoad = 'loading'
    			this.onSee()
    		},
    		handleScroll () {
    			var countDown = document.body.clientHeight - window.scrollY - window.innerHeight;
    			if (this.automatic && countDown == 0 && this.canLoad == 'can'){
    				this.canLoad = 'loading'
    				this.onSee();
    			}
  			}
    	},
		events: {
			'$InfiniteLoading:loaded': function () {
				this.canLoad = 'can'
			},
			'$InfiniteLoading:noMore': function () {
				this.canLoad = 'cant'
			}
		}
	}
</script>

<style scoped>
	.see-more {
    	margin: 8px auto 16px auto;
    	height: 30px;
    	width: 90px;
    	border-radius: 15px;
    	background-color: #fafafa;
    	box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12), 0px 6px 6px 0px rgba(0, 0, 0, 0.12);
    	font-size: 12px;
    	line-height: 30px;
    	text-align: center;
    	color: #646464;
	}

	.see-nomore {
		margin: 8px auto 16px auto;
    	height: 30px;
    	width: 90px;
    	font-size: 12px;
    	line-height: 30px;
    	text-align: center;
    	color: #646464;
	}
</style>