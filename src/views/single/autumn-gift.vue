<template>
	<div class="content">
		<img src="http://appimage2.tiangongyipin.com/autumn/autumn-1.jpg" class="bg">
		<img src="http://appimage2.tiangongyipin.com/autumn/autumn-2.jpg" class="bg">
		<img src="http://appimage2.tiangongyipin.com/autumn/autumn-3.jpg" class="bg">
		<img src="http://appimage2.tiangongyipin.com/autumn/autumn-4.jpg" class="bg">
		<img src="http://appimage2.tiangongyipin.com/autumn/autumn-5.jpg" class="bg" @click="getIt">
		<div class="scrim" v-if="enterAddress" @click="cancel" @touchstart="cancel"></div>
		<div class="pay-module" v-if="enterAddress" transition="rise">
			<div class="pay-background">
				<div class="pay-card">
					<div class="pull-down" @click="cancel">
						<div class="bar"></div>
					</div>
					<i class="material-icons clear" @click="cancel">clear</i>
					<div class="title" style="background-image:none">填写收货地址</div>
					<div class="pay-cellgroup">
						<div class="pay-cell">
							<div class="pay-icon material ic_autumn_name"></div>
							<input type="text" class="pay-input" placeholder="请输入您的姓名" v-model="name" :style="{width: inputWidth}">
						</div>
						<div class="pay-cell">
							<div class="pay-icon material ic_autumn_phone"></div>
							<input type="text" class="pay-input" placeholder="请输入您的手机号码" v-model="phone" :style="{width: inputWidth}">
						</div>
						<div class="pay-cell">
							<div class="pay-icon material ic_autumn_address"></div>
							<input type="text" class="pay-input" placeholder="请输入您的收货地址" v-model="address" :style="{width: inputWidth}">
						</div>
					</div>
					<div class="pay-btn" @click="submitAddress">提交</div>
				</div>
			</div>
		</div>
	</div>
	<loading :show="loading" text="正在处理"></loading>
	<toast :show.sync="toast" type="text">{{msg}}</toast>
</template>

<script>
	import Loading from 'vux/dist/components/loading'
	import Toast from 'vux/dist/components/toast'
    import browserUtils from '../../lib/browser-helper'

	export default {
		components: {
			Loading,
			Toast
		},
		ready() {
			document.title = "天工商城好礼送到家";
			this.$dispatch.apply(this, ['onTitleChanged', {
            	title: '天工商城好礼送到家',
            	back: true
        	}]);
        	this.inputWidth = window.innerWidth - 80 + 'px';
        	setTimeout(()=>{this.getToken},1000);
		},
			methods: {
				cancel() {
					this.enterAddress = false
				},
				getToken(){
            		if(!window.userinfo){
            		    if (typeof(JsBridge) != 'undefined'){
            		        var qToken = this.$route.query.token;
            		        var nToken = JsBridge.getTokenFromNative();
            		        if(qToken){
            		            this.token = qToken;
            		            window.userinfo = {
            		                token:qToken
            		            };
            		        }else if(nToken){
            		            this.token = nToken;
            		            window.userinfo = {
            		                token:nToken
            		            };
            		        }else{
            		            this.$route.router.go({name: 'login'});
            		        }
            		    }else if(browserUtils.versions().weixin){
            		    	this.$route.router.go('/duobao/phone');
            		    } else {
            		        this.$route.router.go({name: 'login'});
            		    }
            		}else{
            		    this.token = window.userinfo.token;
            		}
        		},
        		getIt(){
                    this.getToken()
        			this.loading = true
        			this.$http.post('', {
                	    act: 'activityWinners_doCheck'
                	}).then((result) => {
                	    if (result && result.data && result.data.code == 200) {
                	        if(result.data.data.isReceive == 1) {
                	        	this.enterAddress = true
                	        } else if (result.data.data.isReceive == 2) {
                	        	this.msg = '您已经领取过了'
                	        	this.toast = true
                	        } else if (result.data.data.isReceive == 3) {
                	        	this.msg = '您没有领取资格'
                	        	this.toast = true
                	        }
                	    } else {
                	    	this.msg = result.data.data.message;
                	    	this.toast = true;
                	    }
                	})
                	this.loading = false
        		},
        		submitAddress(){
        			if(this.name == ''){
        				this.msg = '请填写姓名';
                	    this.toast = true;
                	    return
        			}
        			if(this.phone == ''){
        				this.msg = '请填写手机号码';
                	    this.toast = true;
                	    return
        			}
        			if(this.address == ''){
        				this.msg = '请填写收货地址';
                	    this.toast = true;
                	    return
        			}
        			this.$http.post('', {
                	    act: 'activityWinners_doComplete',
                	    receiver: this.name,
                	    receiverPhone: this.phone,
                	    address: this.address
                	}).then((result) => {
                		this.msg = result.data.message;
                	    this.toast = true;
                	})
        		}
			},
			data() {
				return {
					enterAddress: false,
					inputWidth: '',
					token: '',
					name: '',
					phone: '',
					address: '',
					msg: '',
					toast: false
				}
			}
	}
</script>

<style type="text/css" scoped>
	.bg {
		width: 100%;
		height: auto;
		display: block;
	}
	.pay-input {
    	appearance: none;
    	border: none;
		display: block;
		height: 44px;
		font-size: 0.875em;
	}

	.clear {
		position: absolute;
		right: 4px;
		top: 4px;
		color: #c8c8c8;
	}
</style>