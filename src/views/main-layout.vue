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
			
		}
	}
</script>

<style>
	.main-content {
		
	}
</style>