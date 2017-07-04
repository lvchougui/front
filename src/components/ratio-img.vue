<template>
	<img :src="url" v-bind:style="{width: width, height:height}"/>
</template>
<script>
	export default {
		props:{
			url:{
				type:String,
				default:''
			}
		},
		data(){

			return {
				width:'100%',
				height:'100%',
			}
		},
		ready(){

			var w = this.$el.width;
			var h = this.$el.height;
			this.height = w+'px';
		}
	}
</script>