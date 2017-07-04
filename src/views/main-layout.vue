<template>
	<div class="main-content">
		<router-view></router-view>
	</div>
	<tabbar :selected="position"></tabbar>
</template>

<script>
	import Tabbar from './partial/tabbar';

	export default {
		components: {
			tabbar: Tabbar
		},
		data(){
			return {
				position:1
			}
		},
		ready(){
			var name = this.$route.name;
			if (name == 'home') {
				this.position = 1
			}
			else if(name == 'auction'){
				this.position = 2
			}
			else if(name == 'shop_index'){
				this.position = 3
			}
			else if(name == 'brand_index'){
				this.position = 4
			}
			else if(name == 'my'){
				this.position = 5
			}
		}
	}
</script>

<style>
	.main-content {
		padding-bottom: 51px;
	}
</style>