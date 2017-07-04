<style type="text/css">
	
	.auction-list {
		/*background-color: #fafafa;*/
	}
	.auction-list a {
		color: rgb(100, 100, 100);
		text-decoration: none;
	}
	.auction-list .auction {
		font-size: 0.75em;
		position: relative;
		background-color: #fff;
		padding: 8px 8px;
		margin: 8px 0 8px 0;
		border: 1px solid rgb(220, 220, 220);
		border-left: none;
		border-right: none;
	}
	
/*	.auction-list .auction:last-child {
		border: none;
		padding: 0;
	}*/
	
	.auction-list .auction .auction-cover {
		width: 100%;
		height: auto;
	}
	
	.auction-list .auction p {
		float: left;
	}

	.auction .info {
		overflow: hidden;
		margin-bottom: 8px;
	}
	.auction .info .title {
		font-size: 14px;
	}
	.auction .info .status {
		color: #fff;
		display: inline-block;
		padding: 2px 5px;
	}
	.auction .info .status-3 {
		background-color: #aaa;
	}
	.auction .info .status-2 {
		background-color: #3e92c8;
	}
	.auction .info .status-1 {
		background-color: #58bc9a;
	}
</style>
<template>
	<ul class="auction-list">
		<li class="auction" v-for="stage in data">
			<a v-link="{name:'PeriodDetail_item', params:{id:stage.stageid}}">
				<div>
					<div class="info">
						<p class="title">{{stage.name}}</p>
						<p style="float:right" :class="'status status-'+stage.status">{{getStatus(stage)}}</p>
					</div>
					<div class="info">
						<p class="open-time" v-if="stage.status == 1">
							距结束：<clocker style="display:inline;" :time="stage.closeTime"></clocker>
						</p>
						<p class="open-time" v-if="stage.status == 2">{{getOpenTime(stage)}} 开拍</p>
						<p class="open-time" v-if="stage.status == 3">已结束</p>
						<p style="float:right">{{stage.onlookercount}}人围观</p>
					</div>
					<img :src="stage.coverimg" class="auction-cover" />
				</div>
			</a>
		</li>
	</ul>
</template>
<script>
	import Clocker from 'vux/dist/components/clocker'

	export default {
		name:'stage-list',
		props:{
			data:{
				type:Array,
				default:[]
			}
		},
		components:{
			Clocker
		},
		data(){
			return {
			}
		},
		methods: {
			getStatus(stage){
				switch(stage.status){
					case 1:
					return '竞拍中'
					case 2:
					return '预热中'
					case 3:
					return '已结束'
				}
			},
			getOpenTime(stage){
				let strs = stage.openTime.split(" ");
				let date = strs[0];
				let time = strs[1];
				let dateStrs = date.split('-');

				time = time.substr(0,5);

				return dateStrs[1]+'月'+dateStrs[2]+'日 '+time;
			}
		}
	}
</script>