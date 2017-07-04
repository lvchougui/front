<template>

		<group>
			<x-input title="原密码" name="oldPassword" placeholder="请输入原密码" type="password" :value.sync="oldPassowd" class="modify_input"></x-input>

			<x-input title="新密码" name="newPassword1" placeholder="请输入新密码" type="password" :value.sync="firstNewPassword" class="modify_input"></x-input>

			<x-input title="确认密码" name="newpassword2" placeholder="请再次输入新密码" type="password" :value.sync="secondNewPassword" class="modify_input"></x-input>
		</group>
	<box gap="32px 8px 0 8px">
		<x-button type="primary" @click="submitNewPassword">确认修改</x-button>
	</box>

</template>

<script>
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'
	import Textarea from 'vux/dist/components/x-textarea'
	import XInput from 'vux/dist/components/x-input'
	import XButton from 'vux/dist/components/x-button'
	import Box from 'vux/dist/components/box'


	export default {
		components: {
			Cell,
			Group,
			Textarea,
			XInput,
			XButton,
			Box
		},
		data() {
			return {
				data: {
					oldPassowd: '',
					firstNewPassword: '',
					secondNewPassword: ''
				}

			}
		},
		ready: function () {
			this.getDefaultData();
			document.title = "修改密码";
		},

		methods: {

			getDefaultData: function () {
				this.$http.post('', {
					act: 'user_getInfo',
					uid: window.userinfo.userid
				}).then(function (result) {
					if (result.data.code == 200) {
						let data = result.data.data;
						this.data = data;
					} else {
						alert("请求数据失败");
					}
				});
			},

			submitNewPassword: function () {

				if (this.firstNewPassword == this.secondNewPassword) {
					this.$http.post('', {
						act: 'user_update',
						oldpwd: this.oldPassowd,
						pwd: this.firstNewPassword,
					}).then(function (result) {
						if (result.data.code == 200) {
							alert("修改成功");
							//跳转到我的页面
							this.$route.router.go({
								name: 'my'
							});
						} else {
							alert("修改失败");

						}
					});
				} else {
					alert("两次输入密码不一样");
				}
			}

		}

	}
</script>

<style>
    .modify_input {
    	height: 30px;
    	font-size: 14px;
    }
</style>