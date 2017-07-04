<template>
	<div style="margin-bottom:70px;">
		<!-- <div v-if="loginStep == 'login'">
		    <div style="margin-top:40px">
				<x-input name="phone" placeholder="请输入手机号" is-type="china-mobile" :value.sync="loginData.phone" class="login-input"></x-input>
				<x-input name="password" placeholder="请输入密码" type="password" :value.sync="loginData.pwd" class="login-input"></x-input>
			</div>

		    <div style="margin:10px;">
				<p class="login-prompt">忘记密码？</p>
			</div>

			<div style="margin-left:10px;margin-right:10px;">
				<button @click="login" type="primary" class="login-btn">登录</button>
			</div>
		<div> -->

		<!-- <div v-if="loginStep == 'register'">
		    <div style="margin-top:40px">
				<x-input name="phone" placeholder="请输入手机号" is-type="china-mobile" :value.sync="registerData.phone" class="login-input"></x-input>
				<x-input name="password" placeholder="请输入密码" type="password" :value.sync="registerData.pwd" class="login-input"></x-input>
				<div class="captcha_item">
					<x-input placeholder="请输入验证码" :value.sync="registerData.captcha" class="captcha_input"></x-input>
					<x-button class="captcha_btn" slot="right" mini :disabled="disable" @click="getCaptcha">发送</x-button>
				</div>
			</div>

			<div style="margin-left:10px;margin-right:10px;margin-top:40px;">
				<button @click="register" type="primary" class="login-btn">注册</button>
			</div>
		<div> -->

	    <div v-if="loginStep == 'forget'">
		    <div style="margin-top:40px">
				<x-input name="modify_phone" placeholder="请输入手机号" is-type="china-mobile" :value.sync="forgetData.phone" class="login-input"></x-input>
				<x-input name="modify_password" placeholder="请输入新密码" type="password" :value.sync="forgetData.pwd" class="login-input"></x-input>
				<div class="captcha_item">
					<x-input placeholder="请输入验证码" :value.sync="forgetData.captcha" class="captcha_input"></x-input>
					<x-button class="captcha_btn" slot="right" mini :disabled="disable" @click="getCaptcha" name="captcha_send_btn">{{captchaHint}}</x-button>
				</div>
				
			</div>

			<div style="margin-left:20px;margin-right:20px;margin-top:40px;">
				<button @click="modify" type="primary" class="login-btn">确认</button>
			</div>
		<div>
	</div>

	<div class="float-btns" v-if="loginStep == 'login'">
		<button @click="login" type="primary" class="wx-login">微信登录</button>
		<div class="login-verticle-line"></div>
		<button @click="login" type="primary" class="user-register">用户注册</button>
	</div>

	<!-- <div class="login-box">
		<tab>
			<tab-item @click='tab=1' selected>注册</tab-item>
			<tab-item @click='tab=2'>登录</tab-item>
		</tab>
		<div v-show="tab==1">
			<Group style="margin-top:-21px">
				<x-input name="phone" placeholder="手机号" is-type="china-mobile" :value.sync="registerData.phone"></x-input>
				<x-input name="password" placeholder="密码" type="password" :value.sync="registerData.pwd"></x-input>
				<x-input placeholder="验证码" :value.sync="registerData.captcha">
					<x-button class="captcha-btn" slot="right" mini :disabled="disable" @click="getCaptcha">发送验证码</x-button>
				</x-input>
			</Group>
			<box gap="16px 8px 8px 8px">
				<x-button @click="register" type="primary">注册</x-button>
			</box>
		</div>
		<div v-show="tab==2">
			<Group style="margin-top:-21px">
				<x-input name="phone" placeholder="手机号" is-type="china-mobile" :value.sync="loginData.phone"></x-input>
				<x-input name="password" placeholder="密码" type="password" :value.sync="loginData.pwd"></x-input>
			</Group>
			<box gap="16px 8px 8px 8px">
				<x-button @click="login" type="primary">登录</x-button>
			</box>
		</div>
	</div> -->

	<toast :show.sync="wrongPhone" type="cancel">手机号码错误</toast>
	<toast :show.sync="wrongPassword" type="cancel">密码错误</toast>
	<toast :show.sync="loginFailed" type="cancel">登录失败</toast>
	<toast :show.sync="registerFailed" type="cancel">注册失败</toast>
	<toast :show.sync="registerSuccess">注册成功</toast>
	<toast :show.sync="modifySuccess">修改密码成功</toast>
	<toast :show.sync="getCaptchaSuccess" type="text">验证码已发送</toast>
	<toast :show.sync="captchaIsNull" type="text">请输入验证码</toast>
</template>

<script>
	import Group from 'vux/dist/components/group'
	import Cell from 'vux/dist/components/cell'
	import XInput from 'vux/dist/components/x-input'
	import XButton from 'vux/dist/components/x-button'
	import Toast from 'vux/dist/components/toast'
	import Tab from 'vux/dist/components/tab'
	import TabItem from 'vux/dist/components/tab-item'
	import Box from 'vux/dist/components/box'

	import storage from '../lib/storage-helper'

	export default {
		route:{
            data(){
                document.title="忘记密码";
            }
        },
		components: {
			Group, Cell, XInput, XButton, Toast, Tab, TabItem, Box
		},
		data() {
			return {
				tab: 1,
				registerData: {},
				loginData: {},
				forgetData: {},
				wrongPhone: false,
				wrongPassword: false,
				loginFailed: false,
				registerFailed: false,
				registerSuccess: false,
				getCaptchaSuccess: false,
				captchaIsNull: false,
				modifySuccess: false,
				captchaHint: '发送',
				remaintime: 60,
				Interval: null,

				loginStep: 'login',//默认为登录步骤
			}
		},
		ready: function () {
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '天工艺品',
				back: true
			}])

			this.loginStep = 'forget';
			log(this.loginStep);
		},

		methods: {
			getCaptcha () {
				var captchaType;
				if (this.loginStep == 'register') {
					captchaType = 1;//注册
				} else if (this.loginStep == 'forget') {
					captchaType = 2;//忘记密码
				} else {
					captchaType = 3;//交纳保证金余额支付/解绑、绑定手机和微信
				};
				var captchaPhone;
				if (this.loginStep == 'register') {
					captchaPhone = this.registerData.phone;//注册
				} else if (this.loginStep == 'forget') {
					captchaPhone = this.forgetData.phone;//忘记密码
				};
				if (captchaPhone == undefined){
					alert('请输入手机号');
					return;
				} 
				if (captchaPhone.length != 11) {
					if (captchaPhone.length == 0) {
						alert('请输入手机号');
					} else {
						alert('请输入正确的手机号');
					}
					return;
				}
				this.$http.post('',{
					act:'captcha_getCaptcha',
					phone: captchaPhone,
					type: captchaType
				}).then((result)=>{
					log(result.data.code);
					if (result.data.code == 200) {
						log("发送成功");
						this.getCaptchaSuccess = true;

						var btns = document.getElementsByName("captcha_send_btn");
		                var captcha_send_btn = btns[0];
		                captcha_send_btn["disabled"] = true;
		                // captcha_send_btn.style.backgroundColor = "#"+Math.floor(Math.random()*0xffffff).toString(16);
		                captcha_send_btn.style.backgroundColor = 'gray';
						this.startTimer();
					} else {
						var failMsg = result.data.message;
						log(failMsg);
						if (failMsg != undefined) {
							alert(failMsg);
						} else {
							alert("获取验证码失败，请稍后再试");
						}
					};
				});
			},
			modify() {
				if (this.forgetData.phone == undefined || this.forgetData.phone.length != 11) {
					alert('请输入正确的手机号');
					return;
				};
				if (this.forgetData.pwd == undefined || this.forgetData.pwd == '') {
					alert('请输入新密码');
					return;
				};
				if (this.forgetData.captcha == undefined || this.forgetData.captcha == '') {
					this.captchaIsNull = true;
					return;
				};
				this.$http.post('',{
					act: 'user_modifyPass',
					phone: this.forgetData.phone,
					pwd: this.forgetData.pwd,
					captcha: this.forgetData.captcha,
				}).then((result)=>{
					log(result);
					if (result.data.code == 200) {
						this.modifySuccess = true;
						// this.loginStep = "login";
						// this.$route.router.go({name: 'login'});
						setTimeout(function(){
                            window.history.back();
                        }.bind(this), 1000) 
					} else {
						var failMsg = result.data.message;
						if (failMsg != undefined) {
							alert(failMsg);
						} else {
							alert("修改密码失败，请稍后再试");
						}
					};
				});
			},
			register: function () {
				if (this.registerData.captcha == undefined || this.registerData.captcha == '') {
					this.captchaIsNull = true;
					return;
				};
				this.$http.post('', {
					act: 'user_register',
					phone: this.registerData.phone,
					pwd: this.registerData.pwd,
					captcha: this.registerData.captcha,
				}).then((result) => {
					if (result.data.code == 200) {
						this.registerSuccess = true;
						// this.tab = 2;
						this.loginStep = "login";
					} else if (result.data.code == 231) {
						this.wrongPhone = true;
					} else if (result.data.code == 232) {
						this.wrongPassword = true;
					} else {
						this.registerFailed = true;
					}
				})
			},
			login: function () {
				this.$http.post('', {
					act: 'user_login',
					phone: this.loginData.phone,
					pwd: this.loginData.pwd,
					uniquecode: 'o'
				}).then((result) => {
					var resp = result.data;
					if (resp.code == 200) {
						window.userinfo = resp.data;
						storage.save('userinfo',resp.data);
						window.history.back();
					} else if (resp.code == 231) {
						this.wrongPhone = true;
					} else if (resp.code == 232) {
						this.wrongPassword = true;
					} else {
						this.loginFailed = true;
					}
				})
			},
			update () {
				// alert(this.remaintime);
	            if(this.remaintime <= 0) 
	            {
	                this.remaintime = 60;

	                this.captchaHint = '发送';
	                var btns = document.getElementsByName("captcha_send_btn");
	                var captcha_send_btn = btns[0];
	                captcha_send_btn["disabled"] = false;
	                captcha_send_btn.style.backgroundColor = "#58BC9A";

	                clearInterval(this.Interval);
	            }
	            else{
	                this.remaintime--;
	                this.captchaHint = this.remaintime + 's';
	            }
	        },
	        startTimer () {
	            this.Interval = setInterval(this.update,1000);    
	        },
		}
	}
</script>

<style scoped>
	.login-box {
		margin: 16px;
		background-color: #fafafa;
		border: 1px solid rgb(220, 220, 220);
		border-radius: 6px;
		overflow: hidden;
	}
	.login-input {
		height: 20px;
		font-size: 14px;
		border: 0.5px solid #888888;
		margin-top: 20px;
		margin-left: 20px;
		margin-right: 20px;
	}
	.login-btn {
		width: 100%;
		border: none;
		height: 43px;
		line-height: 43px;
		font-size: 15px;
		color: #FFFFFF;
		background-color: black;
		font-family: "SimSun";
	}
	.login-prompt {
		margin-left: auto;
		text-align: right;
		width: 70px;
		font-size: 13px;
		/*font-family: "PingFang SC";*/
		font-family: "SimSun";
		color: #58BC9A;
	}
	.float-btns {
		position: fixed;
		bottom: 0px;
		z-index: 9999999;
		width: 100%;
		height: 70px;
		flex-direction: row;
		display: flex;
		background-color: white;
	}
	.wx-login {
		/*margin-right: 50%;*/
		padding-right: 10px;
		width: 49%;
		height: 50px;
		text-align: right;
		color: #58BC9A;
		font-size: 14px;
		background-color: white;
		border: none;
		font-family: "SimSun";
	}
	.user-register {
		/*margin-left: 50%;*/
		padding-left: 10px;
		width: 49%;
		height: 50px;
		text-align: left;
		color: #58BC9A;
		font-size: 14px;
		background-color: white;
		border: none;
		font-family: "SimSun";
	}
	.login-verticle-line{
		height: 20px;
		width: 1px;
		margin-top: 15px;
		margin-bottom: 5px;
		background-color: #58BC9A;
	}
	.captcha_item {
		margin-top: 20px;
		flex-direction: row;
		display: flex;
	}
	.captcha_input {
		width: 60%;
		margin-left: 20px;
		height: 20px;
		border: 0.5px solid #888888;
		font-size: 14px;
	}
	.captcha_btn {
		margin-left: 20px;
		margin-right: 20px;
		width: 40%;
		height: 42px;
		color: white;
		background-color: #58BC9A;
		font-family: "SimSun";
		/*border: 1px solid rgb(220, 220, 220);*/
	}
</style>