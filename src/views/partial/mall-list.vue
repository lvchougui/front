<style type="text/css">
	.product-list {
		overflow: hidden;
	}
	.product-list .product-item {
		width: 50%;
		float: left;
	}
	.product-list .product-item div {
		border: 1px solid #ddd;
		margin: 6px;
	}
	.product-list .product-item div img {
		width: 100%;
		height: auto;
	}
	.product-list .product-item .info {
		padding: 4px;
		background: #fff;
	}
	.product-list .product-item .title {
		height: 36px;
		line-height: 18px;
		font-size: 14px;
	}
	.product-list .product-item .price {
		color: #58bc9a;
	}
	.ximg-error {
	  background-color: #ccc;
	}
</style>
<template>
	<ul class="product-list">
		<li v-for="item in data" class="product-item">
			<a v-link="{name:'mallDetail_item', params:{id:item.id}}">
				<div>
					<!-- <img :src="item.goods_icon"> -->
					<x-img :src="item.goods_icon" @on-success="success" @on-error="error" error-class="ximg-error" :offset="300"></x-img>

					<p class="info title">{{item.name}}</p>
					<h4 class="info price">¥{{item.price}}</h4>
				</div>
			</a>
		</li>
	</ul>
	<infinite-loading :distance="60" :on-infinite="loadmore" v-if="hasMore"></infinite-loading>
</template>

<script type="text/javascript">
	
	import InfiniteLoading from 'vue-infinite-loading';
	import XImg from 'vux/dist/components/x-img'
	
	export default {
		props:{
			name:{
				type:String
			},
			data:{
				type:Array,
				default:[]
			},
			hasMore:{
				type:Boolean,
				default:true
			}
		},
		components:{
			InfiniteLoading, XImg
		},
		methods:{
			loadmore(){
				setTimeout(function(){
					this.$dispatch.apply(this,['onLoadMore',this.name]);
				}.bind(this),10);
			},
		    success (src, ele) {
		      log('success load', src)
		    },
		    error (src, ele, msg) {
		      log('error load', msg, src)
		    }
		},
		watch: {
			data () {
				this.$broadcast('$InfiniteLoading:loaded');
			},

			hasMore () {
				this.$broadcast('$InfiniteLoading:loaded');
			}
		}
	}
</script>