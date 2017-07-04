<template>
	<!-- <navbar></navbar> -->
	<div class="content">
		<router-view></router-view>
	</div>
</template>

<script>
	import Navbar from './partial/navbar';

	export default {
		components: {
			navbar: Navbar,
		}
	}
</script>