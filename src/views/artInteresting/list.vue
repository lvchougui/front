<template>
	<div class="yiqu-sort"></div>
	<yiqu-list act="microblog_getPostList"></yiqu-list>
</template>

<script>
	import YiquList from '../partial/yiqu-list'

	export default {
		components: {
			YiquList
		},
		ready() {
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '艺趣',
				back: false
			}]);
		},
		methods: {},
		data() {
			return {}
		}
	}
</script>