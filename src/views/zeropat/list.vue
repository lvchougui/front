<template>
	<div class="db-detail-top">

	<!--  <div style="width:100%;height:44px;border-bottom:1px solid;border-color:rgb(220,220,220)"> 
	       <div style="position:relative">
	            <div style="line-height:44px;margin-left:40%;font-size:20px ">0元起拍</div>
	       </div>
	   </div> -->

    <!-- 0元拍列表只有预热和拍卖中的 -->
	<div v-for = "item in data.datalist">
		<div
		style="float:left;width:50%;">
		  <div style="border:1px solid;border-color:rgb(200,200,200); margin:8px">
		   <div style=" position:relative" @click = "pushPatDetail(item.id)">
		   		 <img 
		           style="width:100%"  :style="{height: imgSize} "
		           :src= "item.pics[0]" >
		           <!-- 拍卖中 -->
		           <clocker 
		           v-if = "item.status == 1"
		           style="position:absolute;margin-top:0px;color:white;top:0;left:0;font-size:11px;margin-left:11%;margin-top:3px"
		           :time = "item.trueCloseTime">
		           </clocker>
		           <!-- 预热中 -->
		           <div
		           v-if = "item.status == 2">
		            <div style="float:left">
		            	<span 
			           style="position:absolute;margin-top:0px;color:white;top:0;left:0;font-size:11px;margin-left:11%;margin-top:3px">{{item.openTime}}开拍</span>
		                <span>
		            </div>
		           	 
		           </div>
		          
		   </div>
		   <!-- 拍品的名称 -->
		   <div style="margin-top:10px;height:30px">
		   	   <span class="masterNameColor" style="margin-left:10px;font-size:13px">{{item.name}}</span>
		   </div>

		   <div style="margin-top:5px;height:20px">
		   	   <span class="redFontColor" style="margin-left:10px; float:left; ont-size:14px">¥&nbsp</span>
		   	   <span class="redFontColor" style="float:left;font-size:17px;font-size:14px">{{ item.lastBidding ? item.lastBidding.price : item.initPrice}}</span>
		   	   <span style="margin-left:5px;float:left;font-size:10px;margin-top:5px" v-if = "item.status != 2">当前价</span>
		   	   <span style="margin-left:5px;float:left;font-size:10px;margin-top:5px" v-if = "item.status == 2">起拍价</span>
		   	   <!-- 预热中 -->
		   	   <div  
		   	      v-if = "item.status == 1">
			   	   	<span style="margin-right:5px;float:right;font-size:10px;margin-top:5px">次出价</span>
			   	    <span class="redFontColor" style="margin-right:0px; float:right;font-size:10px;margin-top:5px">{{item.bidCount}}</span>
		   	   </div>
		   	   <!-- 拍卖中 -->
		   	   <div v-if = "item.status == 2">
			   	   	<span style="margin-right:5px;float:right;font-size:10px;margin-top:5px">加幅价</span>
			   	    <span class="redFontColor" style="margin-right:0px; float:right;font-size:10px;margin-top:5px">{{item.stepPrice}}</span>
			   	    <span class="redFontColor" style="margin-right:0px; float:right;font-size:10px;margin-top:5px">¥</span>
		   	   </div>
		     </div>

		     <div style="height:35px;border-top:1px solid;border-color:rgb(200,200,200);"
		      @click = "pushMasterDetail(item.userId.userid)"
		     >
		        <div style="float:left">
		        	<img
		        	   style = "width:25px;height:25px;margin-left:5px;margin-top:5px;border-radius:25px" 
		        	   :src="item.userId.logo">
		        </div>
		         <div style="float:left;margin-top:10px;margin-left:5px">{{item.userId.nickname}}
		         </div>
		     </div>
		  
		</div>
	</div>

		    <!-- 顶部返回按钮 -->
	<!--    <div class="topView" >
	       <div style="float:left">
		       	<img  
			    class="backImg" 
			    src="../../assets/img/icon_back.png"
			    @click = "backButtonDidClick">
	       </div>
	       <div style="float:left;line-height:44px;margin-left:32%">0元起拍</div>
		</div> -->

</div>

</template>

<script>
	import Swiper from 'vux/dist/components/swiper'
	import SwiperItem from 'vux/dist/components/swiper-item'
	import XButton from 'vux/dist/components/x-button'
	import Box from 'vux/dist/components/box'
	import Clocker from 'vux/dist/components/clocker'

	export default {
		route:{
			data(){
				document.title = "0元起拍";
			}
		},
		components: {
			Swiper,
			SwiperItem,
			XButton,
			Clocker
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'0元起拍',back:true}])
			this.getDefaultData();
			this.imgSize = (window.innerWidth - 24) / 2 + 'px';
		},
		methods: {

			//type == 1 ;顺序拍
			//type == 2 ;同步拍
			getDefaultData:function(){
				this.$http.post('',{
					act: 'auction_getList',
					type:'0'
				}).then(function (result) {
					let resp = result.data;
					if (resp.code == 200) {
						this.data = resp.data;
					}
				});

			},

			// 跳转到大师详情
			pushMasterDetail:function(masterid){
				this.$route.router.go({name: 'master_detail', params: {id: masterid}})
			},
			// 跳转到期次详情
			pushPatDetail:function(patid){
				this.$route.router.go({name: 'auctionDetail_item', params: {id: patid}})
				//跳转到拍品详情
			}
		},
		data:function(){
			return {
				imgSize:'',
				payStage: 0,
				payNumber: 1,
				payMethod: 'a',
				productImgs:['1','1','1'],
				data: {
				},
				
				userDatas:['1','12'],
				time1:'2016-08-05 22:54'
			}
		}
	}
</script>

<style>
	.db-detail-top {
		background-color: #fafafa;
		border-bottom: 1px solid rgb(220, 220, 220);
	}
	
	.db-detail-top .db-detail-title {
		display: table-cell;
		vertical-align: middle;
		height: 56px;
		line-height: 28px;
		font-size: 1em;
		font-weight: 600;
		padding: 0 8px 0 20px
	}

	.backImage {
		background-image:url(../../assets/img/icon_blue.png);
	}

	.masterNameColor{
		color: rgb(101,102,103);
	}
	.redFontColor{
		color: rgb(216,84,86);
	}

	.topView{
		position:fixed;
		top:-2px;
		left:0px;
		width:100%;
		height:44px;
		background-color:white;
	}



	

</style>