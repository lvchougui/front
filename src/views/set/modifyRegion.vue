<template>

       <!-- 顶部返回按钮 -->
   <div class="topView" >
       <div style="float:left">
	       	<img  
		    class="backImg" 
		    src="../../assets/img/icon_back.png"
		    @click = "onBack">
       </div>
       <div class="setfont">设置</div>
	</div>

	


	
</template>

<script>
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'
	import Textarea from 'vux/dist/components/x-textarea'
	import Radio from 'vux/dist/components/radio'
	import Devtip from 'vux/dist/components/dev-tip'
	import Address from 'vux/dist/components/address'
	import XInput from 'vux/dist/components/x-input'
	import XButton from 'vux/dist/components/x-button'


	export default {
		components: {
			Cell,
			Group,
			Textarea,
			Radio,
			Devtip,
			Address,
			XInput,
			XButton
		},
		data(){
			return {
				data:[],
				
			}
		},
		/*个人资料页面*/
		ready:function(){
		    this.$dispatch.apply(this,['onTitleChanged',{title:'修改地区',back:true}])			
			this.getUserInfo();
		},

		methods: {


			getUserInfo:function(){	
 			this.$http.post('',{
				act: 'user_getInfo',
				uid: '1' //  this.$route.params.id,   //用户的id
				}).then(function (result) {
					let primaryResp = result.data;
					if (primaryResp.code == 200) {
						let data = result.data.data;
						this.data = data;
					}else{
						alert("请求数据失败");
					}
				});

			}
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