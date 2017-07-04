<template>
	<div class="content">
		<img src="../../assets/img/meilin-1.jpg" class="bg">
		<div class="bg bg-center">
			<img src="../../assets/img/meilin-4.png" class="bg" v-if="!success">
			<img src="../../assets/img/meilin-5.png" class="bg" v-if="success">
			<img src="../../assets/img/meilin-6.png" class="bg" style="margin-top: 10px">
			<div class="inputBtn" @click="useIt" v-if="success" style="margin-top: 10px">立即使用</div>
			<img src="../../assets/img/meilin-7.png" class="bg" style="margin-top: 10px">
			<input type="tel" placeholder="输入手机号码" class="inputPhone" v-model="phone" v-if="!success">
			<div class="inputBtn" @click="getIt" v-if="!success">点击领取</div>
		</div>
		<img src="../../assets/img/meilin-3.jpg" class="bg">
	</div>
	<loading :show="loading" text="正在处理"></loading>
	<toast :show.sync="toast" type="text">{{msg}}</toast>
</template>

<script>
	import Loading from 'vux/dist/components/loading'
	import Toast from 'vux/dist/components/toast'
	import browserUtils from '../../lib/browser-helper'
	import config from '../../appConfig'

	export default {
		components: {
			Loading,
			Toast
		},
		ready() {
			document.title = "才貌双全，探囊取物";
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '才貌双全，探囊取物',
				back: true
        	}]);
			this.$dispatch('hideNavBar');
			
			if (this.$route.query.c) {
				this.code = this.$route.query.c
			}
		},
		methods: {
			getIt() {
					var body = {
						act: "meilin_act",
						group: "activity"
					}

					if (!this.code) {
						this.msg = '请扫描二维码后领取'
						this.toast = true
						return
					} else {
						body.code = this.code
					}

					if (this.phone.length != 11) {
						this.msg = "请输入正确的手机号码"
						this.toast = true
						return
					} else {
						body.phone = this.phone
					}

					this.loading = true
					this.$http.post('', body).then((result) => {
						if (result && result.data && result.data.code == 200) {
							this.loading = false
							this.success = true
						} else {
							this.loading = false
							this.msg = result.data.message
							this.toast = true
						}
					})
				},
				useIt() {
					window.location = "http://m2.yipaiquan.com/"
				}
		},
		data() {
			return {
				code: null,
				phone: '',
				msg: '',
				toast: false,
				loading: false,
				success: false
			}
		},
	}
</script>

<style type="text/css" scoped>
	.bg {
		width: 100%;
		height: auto;
		display: block;
	}
	
	.bg-center {
		display: block;
		background-image: url(../../assets/img/meilin-2.jpg);
		background-size: 100% auto;
		text-align: center;
		padding-top: 10px;
	}
	
	.inputPhone {
		height: 36px;
		line-height: 36px;
		border-radius: 18px;
		border: none;
		font-size: 16px;
		text-align: center;
		width: 75%;
		margin: 8px auto 8px auto;
		background-color: #e6e6e6;
	}
	
	.inputBtn {
		height: 36px;
		line-height: 36px;
		border-radius: 18px;
		font-size: 16px;
		margin: 0 auto 0 auto;
		text-align: center;
		width: 75%;
		background-color: #7B1211;
		color: #fff;
	}
</style>