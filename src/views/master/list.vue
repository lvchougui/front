<style type="text/css">
	.master-list {
		margin-bottom: 16px;
	}
	.master-list .master-item{
		padding: 6px 0;
	}
	.master-list .item-btm {
		background-color: #fff;
		padding: 8px;
	}
	.master-list .item-btm span {
		display: inline-block;
		height: 25px;
		line-height: 20px;
		text-overflow: ellipsis;
	}
</style>
<template>
	<ul class="master-list">
		<li class="master-item" v-for="master in masters">
			<a v-link="{ name:'master_detail', params:{ id: master.userId.id } }">
				<div>
					<img :src="master.imgUrl" style="width:100%;display:inherit;">
					<div class="item-btm">
						<span style="width:70%" >{{master.title}}</span>
						<span style="float:right;">粉丝 {{master.fens}}</span>
					</div>
				</div>
			</a>
		</li>
	</ul>
	<see-more :on-see="loadmore"></see-more>
	<!-- <infinite-loading :distance="60" :on-infinite="loadmore" v-if="hasMore"></infinite-loading> -->
</template>
<script>
	
	const PAGE_SIZE = 8;
	// import InfiniteLoading from 'vue-infinite-loading';
	import SeeMore from '../partial/see-more'
	import { log } from '../../lib/log-util'

	export default {
		route:{
			data(){
				document.title="匠心堂";
			}
		},
		components:{
			// InfiniteLoading,
			SeeMore
		},
		ready() {
			this.$dispatch.apply(this,['onTitleChanged',{title:'匠心堂',back:true}])
			this.getData();
		},
		data() {
			return {
				page:1,
				hasMore:true,
				masters: []
			}
		},
		methods: {
			getData () {
				this.$http.post('',{
					act:'master_getList',
					offset:(this.page - 1) * PAGE_SIZE,
					max:PAGE_SIZE
				}).then((result)=>{
					var resp = result.data;
					if(resp.datalist.length < PAGE_SIZE){
						this.hasMore = false;
					}
					log(resp);
					this.masters.push(...resp.datalist);					
				})
			},
			loadmore(){
				this.page++;
				this.getData();
			}
		},
		watch: {
			masters () {
				this.$broadcast('$InfiniteLoading:loaded');
			},

			hasMore () {
				this.$broadcast('$InfiniteLoading:loaded');
			}
		}
	}
</script>