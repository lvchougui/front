<template>
  <div class="cell">
   <!-- <div class="header">
   </div> -->

   <div class="main">
	    <img class="logo" :src="logo" />
	    <div style="padding-top:15px;height:75px;">
		    <p class="name brandName">{{name}}</p>
		    <p class="name address_num">来自{{address}}  {{num}}件作品</p>
	    </div>
	    <hr style="clear:left;border:0;height:1px;background-color:#eeeeee;size:10;margin-left:10px;margin-right:10px;"></hr>
	    <p class="desc">{{desc}}</p>

	    <div class="parent">
		     <div class="row">
		        <div class="item">
			        <img :src="list[0].img" class="lot"></img>
		        </div>
		        <div class="item">
			        <img :src="list[1].img" class="lot"></img>
		        </div>
		        <div class="item">
			        <img :src="list[2].img" class="lot"></img>
		        </div>
		    </div> 
	    </div>
   </div>

   <!-- <div class="footer">
   </div> -->
</template>

<style>
    .header {
    	width: 100%;
    	height: 10px;
    	/*border: 1px #F00 solid;*/
    	background-color: gray;
    }
    .main {
        width:100%;
        /*height:300px;*/
        /*border:1px #F00 solid;*/
        background-color: white;
    }
    .footer {
        width:100%;
        height:20px;
        /*border:1px #F00 solid;*/
        background-color: black;
    }
	.cell {
		/*background-color: red;*/
		/*display: flex;
		flex-direction: column;*/
	}
	.logo {
		/*background-color: yellow;*/
		/*width: 50px;
		height: 50px;*/
		width: 75px;
		height: 75px;
		padding: 15px;
		float: left;
	}
	.name {
		overflow: hidden;
		display: flex;
        flex-direction: column;
        align-content:space-between; 
        margin-left: 20px;
        /*align-items: center;*/
        vertical-align: center;

		/*position: relative;
	    height: 50px;
	    line-height: 25px;
	    overflow: hidden;*/

		 /*word-wrap: break-word;*/
	/*	width: 80%;
		height: 10%;*/
		/*display: inline-block;
		vertical-align: middle;*/
		/*margin-left: 75px;*/
		/*float: right;*/
		/*background-color: orange;*/
	}
	.brandName {
		/*margin: 0 auto;*/
/*		text-align: center;*/
        /*height: 40px;
		font-size: 15px;
		padding: 10px;
		background-color: gray;*/

        text-align: left;
        color: rgb(47,47,47);
        font-size: 17px;
        padding-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 10px;
        margin-right: 10px;
	}
	.address_num {
		/*height: 20px;
		font-size: 13px;
		background-color: yellow;*/

        text-align: left;
        color: rgb(47,47,47);
        font-size: 15px;
        padding-right: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 3px;
	}
	.desc {
		color: gray;
		padding: 10px;
		/*background-color: green;*/
	}
	.parent{align-items: center;margin-top: 10px;margin-bottom: 10px;} 
	.row{height:33%;display:flex;} 
	.item{width:33%;margin-left:10px;margin-right: 10px;}
	.lot {width:100%;height: 100%;}
</style>

<script>
    import Toast from 'vux/dist/components/toast'
	// import InfiniteLoading from 'vue-infinite-loading'
	import SeeMore from '../partial/see-more'
	import {
		isLogined
	}
	from '../../lib/auth'
	export default {
		name: 'hall-cell',
		props: {
			act: {
				type: String
			}
		},
		components: {
			Toast,
			// InfiniteLoading,
			SeeMore
		},
		ready() {
			this.coverHeight = (window.innerWidth - 34) / 2 + 'px';
			this.imgWH = ((window.innerWidth - 40) / 3).toFixed(0) + 'px';
			// log(this.list)
		},
		methods: {

	    },
	    props: {
	    	/*type 可以是下面原生构造器：String Number Boolean Function Object Array*/
	    	name: String,
	    	num: {
	    		type: Number,
	    		default: 0
	    	},
	    	address: {
	    		type: String,
	    		// required: true
	    	},
	    	logo: String,
	    	desc: String,
	    	// 数组／对象的默认值应当由一个工厂函数返回
		    list: {
		      type: Array,
		    },
	    },
	    data() {
			return {
				logo: '',
				name: '',
				address: '',
				num: 0,
				desc: '',
				list: []
			}
		}
	}
    
</script>