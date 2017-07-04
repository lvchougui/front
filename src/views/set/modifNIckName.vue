<template>

	   <!-- 输入框 -->
	   <div style="margin-top:0px;height:60px">
	   	   <textarea 
	   	   :rows = 3
	   	   :placeholder = "placeholder"
	   	   v-model = "nickname"
	   	   ></textarea>
	   </div>

	   <div style="margin-top:20px;width:90%;margin-left:5%">
	   	 <x-button type="warn" @click = "submit">提交</x-button>
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
				},
				nickname:'',
				placeholder:'请输入新的昵称',
				rows:3,
				cols:50,
			}
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'修改昵称',back:true}])
			this.getDefaultData();
		},
		methods: {
			//获取默认昵称
			getDefaultData:function(){
			this.$http.post('',{
				act: 'user_getInfo',
				id: '1' //  this.$route.params.id,   //用户的id
				}).then(function (result) {
					let primaryResp = result.data;
					if (primaryResp.code == 200) {
						let data = result.data.data;
						this.data = data;
						this.sign = data.nickname;
						alert("请求数据成功");
					}else{
						alert("请求数据失败");
					}
				});

			},

			submit:function(){
			}

          }

		}
</script>

<style>
	
</style>