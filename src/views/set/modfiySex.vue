<template>

		<div style="margin-top:0px">
		<group title="请选择性别">
	      <radio :options="radio001" value="男" @on-change="change"></radio>
	    </group>
	    </div>

	    <div>
	   	 <x-button type="warn" @click = "submit">提交</x-button>
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
		
		/*个人资料页面*/
		ready:function(){
		this.$dispatch.apply(this,['onTitleChanged',{title:'修改性别',back:true}])				
			this.getDefaultData();
		},
		   data(){
			return {
				radio001: [ '男', '女' ],
				sex:'',
				data:{}
			}
		},
		methods: {

			getDefaultData:function(){	
 			this.$http.post('',{
				act: 'user_getInfo',
				uid: '1' //  this.$route.params.id,   //用户的id
				}).then(function (result) {
					if (primaryResp.code == 200) {
						let data = result.data.data;
						this.data = data;
					}else{
						alert("请求数据失败");
					}
				});
			},
			change (value) {
			  this.sex = value;
		    },

		    //个性签名
            submit:function(){
            	let gender = "m";
            	if (this.sex == '男') {
            		gender = 'm'
            	}else{
            		gender = 'f'
            	}
          	this.$http.post('',{
				act: 'user_update',
				gender:gender,
				}).then(function (result) {
					let primaryResp = result.data;
					if (primaryResp.code == 200) {
						alert("修改性别成功");
						this.$route.router.go({name:'userinfo'}); 
					}else{
						alert("修改性别失败");
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