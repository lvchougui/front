<template>
	<div class="db-detail-top">

	 <!--  <div style="width:100%;height:64px;border-bottom:1px solid;border-color:rgb(220,220,220)"> 
	       <div style="position:relative">
	            <div style="line-height:64px;margin-left:40%;font-size:20px">0元起拍</div>
	       </div>
	   </div> -->
	   <div style="width:100%;height:200px"> 
	       <div style="position:relative">
	            <div>
	            	<img 
			          style="width:100%;height:200px; position:absolute" 
			          :src="data.images[0]">
	            </div>
	       	    

	       </div>
	   </div>
</div>
	   <!-- title -->
	   <div style="background:white;font-size:19px;border-bottom:1px solid;border-color:rgb(220,220,220);text-align:center;line-height:40px;height:40px;">{{data.title}}</div>

	   <div style="margin:10px;border-bottom:1px solid;border-color:rgb(220,220,220);padding-bottom:10px">{{data.summary}}</div>

	   <div style="margin:10px" v-html = "data.content"></div>

	   <!-- 顶部返回按钮 -->
	   <div class="topView" style="background-color:rgba(0,0,0,0.0);">
		<!--     <img  
		    class="backImg" 
		    src="../../assets/img/icon_back_circle.png"
		    @click = "backButtonDidClick"> -->
		</div>


</template>

<script>
	import Swiper from 'vux/dist/components/swiper'
	import SwiperItem from 'vux/dist/components/swiper-item'
	import XButton from 'vux/dist/components/x-button'

	export default {
		components: {
			Swiper,
			SwiperItem,
			XButton,
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'艺趣详情',back:true}])
			this.getDefaultData();
		},
		methods: {
			getDefaultData:function(){
				this.$http.post('',{
					act: 'microblog_getInfo',
					id: this.$route.params.id,
				}).then(function (result) {
					let primaryResp = result.data;
					if (primaryResp.code == 200) {
						let data = result.data.data;
						this.data = data;
						// alert("请求数据成功");
					}else{
						alert("请检查你的网络状态");
					}
				});

			},
            backButtonDidClick:function(){
            	alert("返回");
            }

		},
		data:function(){
			return {
				payStage: 0,
				payNumber: 1,
				payMethod: 'a',
				productImgs:['1','1','1'],
				data: {
					id:'', 
					content:'',  //正文
					summary:'',  //简介
					iscollection:'',  //是否收藏
					title:'',
					author:{},   //作者的信息
					images:[]  //图片的信息
				},
				userDatas:['1','12'],
				time1:'2016-08-04 22:54:00'
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
		position: fixed;
		top:0px;left:0px;
		width:100%;
		height:50px;
		background-color:rgba(0,0,0,0.0);
	}

	.topView .backImg{

	   height:30px;
	   width:30px;
	   margin-top:10px;
	   margin-left:10px;
	}


	

</style>