<template>
	<div class="gift-content">
		<div style="position: relative;display: flex;flex-direction: column;">
			<img src="../../assets/img/giftbag/1.png" style="width: 100%;display: block;">
			<div style="width:100%;position: absolute;bottom: 10px;text-align: center;">
				<img src="../../assets/img/icon.png" class="gift-avatar">
			</div>
		</div>
		<div class="gift-title">不可思议！您获得了颜值级别最高的红包！</div>
		<img src="../../assets/img/giftbag/2.png" style="width: 100%;display: block;">	
		<div class="gift-friend" v-if="members && members.length>0">
			<div style="margin-left:10px;margin-bottom:5px;font-size:16px;color:black;font-weight:600;">红包PK榜</div>
			
			<div class="gift-member" v-for="item in members">
				<img :src="item.logo" class="gift-member-avatar">
				<div class="member-desc">
					<div style="display:flex;flex-direction:row;line-height:65px;">
						<div style="flex:1;font-size:14px;color:#777777;">{{item.nickname}}</div>
						<div style="color:#e1524a;font-size:15px;font-weight:600;margin-right:5px;">¥245</div>
					</div>
					<div style="width:100%;height:1px;background-color:#e7e7e7;"></div>
				</div>
			</div>
		</div>
		<img src="../../assets/img/giftbag/3.png" style="width: 100%;display: block;">

		<div class="claim-part">
			<img src="../../assets/img/giftbag/4.png" style="width: 100%;display: block;">
			<input class="phone-input-box" v-model="phone" type="number" name="phone" placeholder="请输入手机号">
			<div class="verify-part">
				<input class="verify-input-box" v-model="authcode" style="width:80px;" type="number" name="authcode" placeholder="输入验证码">
				<div class="verify-code-btn"  @click="getCaptcha" v-if="!isSend">获取验证码</div>
				<div class="verify-code-btn-send" v-if="isSend">{{timer}}s后重发</div>
			</div>
			<div class="claim-btn" @click="register">验证手机，立即放入账户</div>
		</div>
	</div>
	<toast :show.sync="wrongPhone" type="cancel">手机号码错误</toast>
	<toast :show.sync="toast" type="text" width="12em">{{tips}}</toast>
</template>
<style type="text/css">
	.gift-content{
		background-color: #fffcf7;
		width: 100%;
		height: 100%;
		padding-bottom: 250px;
	}
	.gift-avatar{
		width: 80px;
		height: 80px;
		border-radius: 40px;
	}
	.gift-title{
		width: 100%;
		text-align: center;
		color: black;
		font-size: 16px;
		font-weight: 600;
	}
	.gift-friend{
		margin:7px;
		padding: 10px;
		border:1px dashed #efefef; 
		background-color: white;
		display: flex;
		flex-direction: column;
	}
	.gift-member{
		display: flex;
		flex-direction: row;
		height: 70px;
		align-items: center;
	}
	.gift-member-avatar{
		width: 50px;
		height: 50px;
		border-radius: 25px;
	}
	.member-desc{
		margin-left: 15px;
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.claim-part{
		position: fixed;
		display: flex;
		flex-direction: column;
		bottom: 0;
		background-color: #fffcf7;
		padding-bottom: 10px;
	}
	.phone-input-box{
		outline:none;
		margin: 10px;
		line-height: 45px;
		height: 45px;
		padding-left: 10px;
		border:1px solid #e7e7e7;
		background-color: white;
	}
	.verify-part{
		margin-left: 10px;
		margin-right: 10px;
		border:1px solid #e7e7e7;
		background-color: white;
		display: flex;
		height: 45px;
		flex-direction: row;
		padding-left: 10px;
		padding-right: 10px;
	}
	.verify-input-box{
		background-color: transparent;
		border:none;
		flex: 1;
	}
	.verify-code-btn{
		color: #e1524a;
		border:1px solid #e1524a;
		padding-left: 8px;
		padding-right: 8px;
		height: 30px;
		font-size: 12px;
		line-height: 30px;
		margin-top: 7px;
	}
	.verify-code-btn-send{
		color: grey;
		border:1px solid grey;
		padding-left: 8px;
		padding-right: 8px;
		height: 30px;
		font-size: 12px;
		line-height: 30px;
		margin-top: 7px;
	}
	.claim-btn{
		margin:10px;
		height: 45px;
		line-height: 45px;
		text-align: center;
		color: white;
		font-size: 14px;
		background-color: #e1524a;
	}
</style>
<script>
	import Toast from 'vux/dist/components/toast'

	export default {
		components: {
			Toast,
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'老带新有礼',back:true}]);
			this.uid = this.$route.query.uid;
			this.getGiftMembers();
		},
		route:{
			data(){
				document.title = "老带新有礼";
			}
		},
		data() {
			return {
				uid:'',
				phone:'',
				authcode:'',
				wrongPhone:false,
				isSend:false,
				authText:'',
				timer:60,
				toast:false,
				tips:'',
				Interval:null,
				members:[]
			}
		},
		methods: {
			getCaptcha () {
				var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
				if(this.phone.length==0||this.phone.length!=11||!myreg.test(this.phone)) { 
					this.wrongPhone = true;
					return;
				}

				this.wrongPhone = false;
				this.$http.post('',{
					act:'captcha_getCaptcha',
					phone:this.phone,
					type: 1
				}).then((result)=>{
					log(result);
					if (result.data.code!=200) {
						this.tips = result.data.message;
						this.toast = true;
					}else{
						this.startTimer();
						this.isSend = true;
					}
				});
			},
			update () {
				if(this.timer <= 0) 
				{
					this.timer = 60;
					this.isSend = false;
					clearInterval(this.Interval);
				}
				else{
					this.timer--;
				}
			},
			startTimer () {
				this.Interval = setInterval(this.update,1000);    
			},
			getGiftMembers(){
				this.$http.post('', {
					act: 'user_getUserList',
					uid:23
				}).then((result) => {
					log(result);
					this.members = result.data.datalist;
				})
			},
			register: function () {
				if (!this.authcode||this.authcode.length<=4) {
					this.tips = "请输入正确的验证码";
					this.toast = true;
				}
				this.$http.post('', {
					act: 'wchat_inviteregister',
					phone: this.phone,
					captcha: this.authcode,
					id:this.uid
				}).then((result) => {
					log(result);
					if (result.data.code == 200) {
						window.location = "http://wxx.tiangongyipin.com/appdownload.php";
					} else{
						this.tips = result.data.message;
						this.toast = true;
					}
				})
			},
		},
	}

</script>