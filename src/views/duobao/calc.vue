<template>
	<group title="计算公式">
		<div class="db-fomula">[(数值A + 数值B) / 该商品总需人次得到的余数] + 原始数 100000001</div>
	</group>
	<group title="数值A">
	
	</group>
</template>

<script>
	import Group from 'vux/dist/components/group'
	import Cell from 'vux/dist/components/cell'

	export default {
		components: {
			Group,
			Cell
		},
		ready() {},
		methods: {},
		data() {
			return {
				offset: 1,
				max: 15,
				calcData: {
					'record': {
						'nickname': 'aaa',
						'time': 'bbbbbb'
					},
					'count': ['1111', '2222', '3333'],
					'lottery': {
						'expect': '1',
						'opencode': '2',
						'record': '3'
					}
				}
			}
		}
	}
</script>

<style>
	.db-fomula {
		margin: 8px;
		padding: 8px;
		border-radius: 6px;
		background-color: rgb(230,230,230);
		font-size: 0.875em;
	}
</style>