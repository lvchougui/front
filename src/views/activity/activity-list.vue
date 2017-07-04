<template>
	<activity-list></activity-list>
	<div class="db-fab" v-link="{name:'activity_order'}">
		<!-- <i class="material-icons">arrow_forward</i> -->
		<div class="material ic_assignment"></div>
	</div>
</template>

<script>
	import ActivityList from '../partial/activity-list'

	export default {
		route: {
        	data() {
            	document.title = '专题购';
        	}
    	},
		components: {
			ActivityList
		},
		ready() {
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '专题购',
				back: true
			}]);
		},
		methods: {},
		data() {
			return {}
		}
	}
</script>

<style type="text/css">
	.db-fab .material {
		margin: 16px;
	}

	.fab-left {
		left: 16px !important;
	}
</style>