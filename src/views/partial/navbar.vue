<template>
	<x-header>{{title}}</x-header>
</template>

<script>
	import XHeader from 'vux/dist/components/x-header'

	export default {
		components: {
			XHeader
		},
		data(){
			return {
				title:document.title
			}
		}
	}
</script>