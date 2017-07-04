<template>

	<!-- 导航栏 -->
	<!--    <div class="topView" >
	       <div style="float:left">
		       	<img  
			    class="backImg" 
			    src="../../assets/img/icon_back.png"
			    @click = "backButtonDidClick">
	       </div>
	       <div class="setfont">个性签名</div>
	       <div @click = "submitSign"
	       class="" style="float:right;line-height:44px;margin-right:10px">
	       提交
	       </div>
	   </div>  -->

	   <!-- 输入框 -->
	   <div style="margin-top:10px;height:100px">
	   	   <textarea 
	   	   :rows = 5
	   	   :cols = "cols"
	   	   :placeholder = "placeholder"
	   	   :value.sync = "data.sign"
	   	   ></textarea>
	   </div>

	    <div style="margin-top:20px;width:90%;margin-left:5%">
	   	 <x-button type="warn" @click = "submitSign">提交</x-button>
	   </div> 

</template>

<script>
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'
	import Textarea from 'vux/dist/components/x-textarea'
	import XButton from 'vux/dist/components/x-button'
	export default {
		components: {
			Cell,
			Group,
			Textarea,
			XButton
		},
		data() {
			return {
				data: {
					sign:''
				},
				placeholder:'请输入新的签名,不能超过140字',
				rows:3,
				cols:50,
			}
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'个性签名',back:true}])

			this.getDefaultData();
		},
		methods: {
			getDefaultData:function(){
			this.$http.post('',{
				act: 'user_getInfo',
				id: '1' //  this.$route.params.id,   //用户的id
				}).then(function (result) {
					let primaryResp = result.data;
					if (primaryResp.code == 200) {
						let data = result.data.data;
						this.data = data;
						this.data.sign = data.sign;
						alert("请求数据成功");

					}else{
						alert("请求数据失败");
					}
				});
			},

          //个性签名
          submitSign:function(){
          	this.$http.post('',{
				act: 'user_update',
				sign:this.data.sign,
				}).then(function (result) {
					let primaryResp = result.data;
					if (primaryResp.code == 200) {
						alert("修改签名成功");
						this.$route.router.go({name:'userinfo'}); 
					}else{
						alert("修改签名失败");
					}
				});

			},

          }
	}
</script>

<style>
	
	
	
	.mymenu {
		position: absolute;
		width: 100%;
		top: 44px;
		margin-bottom: 76px;
	}
	
	.mymenu i {
		color: #969696;
		margin-right:5px;
		display: block;
	}
	.topView{
		position:fixed;
		top:0px;
		left:0px;
		width:100%;
		height:44px;
		background-color:white;
	}
	.setfont{
		float:left;
		line-height:44px;
		margin-left:32%;
	}

</style>