<template>
	<div class="bg">
		<div style="position:relative">
            <img src="http://cdn.tiangongyipin.com/2017tea/1-1.png" class="bg"></img>
            <img src="http://cdn.tiangongyipin.com/2017tea/1-2.png" class="bg"></img>
            <img src="http://cdn.tiangongyipin.com/2017tea/yaoqing.png"  @click="commendToFriends" class="bg"></img>
            <img src="http://cdn.tiangongyipin.com/2017tea/1-3.png" class="bg"></img>
            <img src="http://cdn.tiangongyipin.com/2017tea/1-4.png" class="bg"></img>
            <img src="http://cdn.tiangongyipin.com/2017tea/1-5.png" style="display: inherit" class="bg"></img>


            <div class="gift-bg">
				<input type="number" v-model="phoneNumber" placeholder="输入手机号码" class="gift-phone"></input>
				<button class="content-button" @click="receiveGift">点击领取大礼包</button>
			</div>

            <img src="http://cdn.tiangongyipin.com/2017tea/1-6.png" class="bg" style="margin-bottom:-8px;"></img>
            <img src="http://cdn.tiangongyipin.com/2017tea/1-7.png" class="bg"></img>

	    </div>
	</div>

	<div v-if="step == 'addAddress'" class="float-cover" @click="hideFloatWindow">
	</div>

    <div v-if="step == 'addAddress'" class="float-window">
		<div class="float-title">添加收货地址</div>
		
		<div>
			<p class="float-tint">联系人</p>
			<input class="float-input" placeholder="名字" v-model="receiverName"></input>
			<div style="clear:left;width:100%;text-align:centre;background-color:rgb(240,240,240);height:0.5px;margin:0 auto;"></div>
		</div>

		<div>
			<p class="float-tint">手机号码</p>
			<input type="number" class="float-input" placeholder="11位手机号码" v-model="receiverPhone"></input>
			<div style="clear:left;width:100%;text-align:centre;background-color:rgb(220,220,220);height:0.5px;margin:0 auto;"></div>
		</div>
        
        <div style="margin-top:5px;">
			<address title="选择地址" :value.sync="selectAddress" raw-value :list="addressData" style="text-align:left;"></address>
			<div style="clear:left;width:100%;text-align:centre;background-color:rgb(240,240,240);height:0.5px;margin:0 auto;"></div>
		</div>

		<div>
			<p class="float-tint">详细地址</p>
			<input class="float-input" placeholder="街道门牌号码" v-model="receiverDetail"></input>
			<div style="clear:left;width:100%;text-align:centre;background-color:rgb(240,240,240);height:0.5px;margin:0 auto;"></div>
		</div>
		<br>
		<div class="float-confirmBtn" @click="commitMethod">确定提交</div>
	</div>

	<toast :show.sync="payToast" type="text" width="12em">{{payTips}}</toast>
</template>

<style type="text/css">
	.bg {
		width: 100%;
		background-color: #e1ebe0;
		margin-top: -8px;
	}
	img {
		display: inline;
	}
	.invite-bg {
		width: 92.75%;
		margin: 0 auto;
		background: #fff;
	}
	.gift-bg {
		width: 92.76%;
		background-color: #fff;
		margin: 0 auto;
		padding-top: 20px;

		/*background: url(../../assets/img/tea-activity/invite.png);*/
		/*background-size: cover;*/
		/*margin-top: -8px;*/
	}
	.gift-phone {
		width: 80%;
		margin-left: 10%;
		height: 40px;
		font-size: 14px;
		text-align: center;
		background-color: rgb(217,230,215);
		color: rgb(68,94,27);
		border-radius: 20px;
		border: none;
	}
	.content-invite {
		width: 80%;
		height: 40px;
		font-size: 16px;
		text-align: center;
		background-color: rgb(217,230,215);
		color: rgb(68,94,27);
		border-radius: 20px;
	}
	.content-button {
		width: 80%;
		margin-left: 10%;
		height: 40px;
		margin-top: 10px;
		margin-bottom: 10px;
		font-size: 14px;
		text-align: center;
		background-color: rgb(68,94,27);
		color: white;
		border-radius: 20px;
		border: 1px solid rgb(255,255,255);
	}
	.content-input {
		width: 70%;
		height: 60%;
		font-size: 14px;
		text-align: center;
		margin: 0 auto;
		background-color: rgb(217,230,215);
		color: rgb(68,94,27);
		border-radius: 40px;
		border: none;
	}
	.float-window {
    	width: 100%;
    	height: 360px;
    	/*border: 1px solid rgb(88,188,154);*/
    	position: fixed;
    	bottom: 0px;
    	background-color: rgb(255,255,255);
    	z-index: 999;
    }
    .float-title {
    	text-align: center;
    	font-size: 18px;
    	color: rgb(47,47,47);
    	line-height: 50px;
    }
    .float-close {
    	margin-top: 20px;
    	float: right;
    	width: 20px;
    	height: 20px;
    	margin-top: 15px;
    	margin-right: 20px;
    }
    .float-payCount {
    	color: rgb(88,188,154);
    	font-size: 16px;
    	margin-left: 10px;
    	margin-top: 20px;
    	line-height: 20px;
    }
    .float-phone {
    	color: rgb(47,47,47);
    	font-size: 16px;
    	margin-left: 10px;
    	margin-top: 5px;
    	line-height: 20px;
    }
    .float-resend {
    	float: right;
    	width: 25%;
    	height: 40px;
    	background-color: rgb(88,188,154);
    	margin: 10px;
    	line-height: 40px;
    	text-align: center;
    	font-size: 16px;
    	color: white;
    }
    .float-tint {
    	float: left;
    	font-size: 14px;

    	margin: 10px;
    	margin-left: 15px;
    	width: 20%;
    	line-height: 30px;
    	/*background-color: yellow;*/
    }
    .float-input {
    	padding-left: 10px;
    	padding-right: 10px;
    	width: 60%;
    	margin-top: 10px;
    	margin-right: 10px;
    	margin-bottom: 10px;
    	/*margin: 10px;*/
    	float: right;
    	font-size: 14px;
    	height: 30px;
    	line-height: 30px;
    	/*border: 1px solid rgb(255,255,255);*/
    	border: none;
    	/*background-color: orange;*/

    	/*width: 100%;*/
    	/*margin-left: 10px;*/
    	/*margin-right: 10px;*/
    }
    .float-confirmBtn {
    	clear: left;
    	text-align: center;
    	margin:0 auto;
    	background-color: rgb(33,33,33);
    	border: 1px solid white;    	
    	width: 95%;
    	height: 50px;
    	line-height: 50px;
    	font-size: 16px;
    	color: white;
    }
    .float-cover {
    	width: 100%;
    	height: 100%;
    	/*border: 1px solid rgb(88,188,154);*/
    	position: fixed;
    	top: 0px;
    	background-color: rgba(0,0,0,0.5);
    	z-index: 888;
    }


</style>

<script type="text/javascript">
	import XInput from 'vux/dist/components/x-input'
	import Toast from 'vux/dist/components/toast'
	import browserUtils from '../../lib/browser-helper'
	import Address from 'vux/dist/components/address'
	import AddressChinaData from 'vux/src/components/address/list.json'
	import value2name from 'vux/src/filters/value2name.js'

    export default {
    	components: {
    		Address,
    		XInput,
			Toast,
			browserUtils,
		},
    	ready: function() {
    		// this.getToken();
    		this.getUserId();
		},
		beforeDestroy(){
		},
		data: function() {
			return {
				phoneNumber: '',
				receiverName: '',
				receiverPhone: '',
				receiverRegion: '',
				receiverDetail: '',
				addingReceiverAddress: false,
				step: '',
				addedAddress: false,//是否已经提交过收获地址
				token: '',
				payToast: false,
				payTips: '',
				userId: 0,
				failMsg: '',
				defaultAddressId: 0,//默认收货地址ID

				addressData: AddressChinaData,
				selectAddress: [],
				default: false,

				receiver: '',
				phone: '',
				state: '',
				city: '',
				region: '',
				address: '',
				primary: '',
				postCode: '',
			}
		},
		methods: {
			getName(value) {
				return value2name(value, AddressChinaData)
			},
			hideFloatWindow() {
				this.addingReceiverAddress = false;
				this.step = '';
				// log(this.step);
			},
			commendToFriends() {
				// log('commendToFriends')
				this.getToken();
				if (this.token == '') {
					// this.payTips = '未登录';
	    //         	this.payToast = true;
				} else {
					// this.payTips = '已登录';
	    //         	this.payToast = true;

	            	this.$http.post('', {
	            		act: 'share_shareGetInfo',
	            		userid: this.userId,
	            	}).then((result) => {
		        		// log(result.data);
			        	if(result.data.code == 200){
			            	if (typeof(JsBridge) != 'undefined') {
			            		var dataDict = result.data.data;
			            		var title = dataDict.title;
			            		var desc = dataDict.summary;
			            		var img = dataDict.img;
			            		var url = dataDict.url;
			            		JsBridge.shareInNative(title,desc,img,url);
			            	} else {
			            		// this.$route.router.go({name: 'auction_order'});
			            	}
			        	} else {
			        		this.failMsg = result.data.message;
			        		this.payTips = this.failMsg;
			            	this.payToast = true;
			        		// this.payFailed = true;
			        	}
		        	});
				}
			},
			receiveGift() {
				this.addingReceiverAddress = true;
				this.getToken();
				if (this.token == '') {
						// this.payTips = '未登录';
		    //         	this.payToast = true;
		            	this.getToken();
				} else {
					// this.payTips = '已登录';
	    //         	this.payToast = true;

	                // this.getUserId();

	            	if (this.phoneNumber == '') {
	            		this.payTips = '请输入手机号码';
		            	this.payToast = true;
	            	}  else if (this.phoneNumber.length != 11) {
	            		this.payTips = '请输入正确的手机号码';
		            	this.payToast = true;
	            	}  else {
	            		if (this.addedAddress) {
	            			this.$http.post('', {
			            		act: 'prize_prize',
			            		// userid: this.userId,
			            		phone: this.phoneNumber,
			            		address: this.receiverRegion + this.receiverDetail,
			            		name: this.receiverName,
			            		receiverphone: this.receiverPhone,
			            	}).then((result) => {
				        		// log(result.data);
					        	if(result.data.code == 200){
					        		this.payTips = '领取成功!';
					        		this.payToast = true;

					        		window.userinfo = {
			                            token: this.token,
			                            phone: this.phoneNumber
			                        };

					        		//跳转到红茶礼包
			                		this.$route.router.go({
										name: 'tea_coupon'
									});

					            	if (typeof(JsBridge) != 'undefined') {
					            		// JsBridge.close();
					            	} else {
					            		// this.$route.router.go({name: 'auction_order'});
					            	}
					        	} else {
					        		this.failMsg = result.data.message;
					        		// log(this.failMsg);
					        		this.payTips = this.failMsg;
					            	this.payToast = true;
					        	}
				        	});
	            		} else {
	            			// this.getDefaultAddress();
	            			this.step = 'addAddress';
							// log('receiveGift:' + this.phoneNumber);
	            		}
	            	}
				}
			},
			commitMethod() {
                    let rawAddress = this.getName(this.selectAddress);
					let rawAddressArray = rawAddress.split(/(\s+)/);

					this.state = rawAddressArray[0];
					this.city = rawAddressArray[2];
					this.region = rawAddressArray[4];

					this.receiverRegion = this.state + this.city + this.region;
					// this.payTips = '地区信息（省、市、区）' + this.receiverRegion + '😄';
	            	// this.payToast = true;

	            	// setTimeout(function(){
              //   		this.waitForPay = false;
              //       	this.payStep = 'conform';
            		// }.bind(this), 5000)

					if (this.receiverName == '') {
						this.payTips = '请填写联系人';
		            	this.payToast = true;
					} else if (this.receiverPhone == '') {
						this.payTips = '请填写手机号码';
		            	this.payToast = true;
					} else if (this.receiverPhone.length != 11) {
						this.payTips = '请填写正确的手机号码';
		            	this.payToast = true;
					} else if (this.receiverRegion == '' || this.state == undefined || this.city == undefined || this.region == undefined) {
						this.payTips = '请选择地址（省、市、区）';
		            	this.payToast = true;
					} else if (this.receiverDetail == '') {
						this.payTips = '请填写详细地址（街道、门牌）';
		            	this.payToast = true;
					} else {
						this.addedAddress = true;
						this.hideFloatWindow();

						//要求直接领取
                        this.$http.post('', {
		            		act: 'prize_prize',
		            		// userid: this.userId,
		            		phone: this.phoneNumber,
		            		address: this.receiverRegion + this.receiverDetail,
		            		name: this.receiverName,
		            		receiverphone: this.receiverPhone,
		            	}).then((result) => {
			        		// log(result.data);
				        	if(result.data.code == 200){
				        		this.payTips = '领取成功!';
				        		this.payToast = true;

				        		window.userinfo = {
		                            token: this.token,
		                            phone: this.phoneNumber
		                        };

				        		//跳转到红茶礼包
		                		this.$route.router.go({
									name: 'tea_coupon'
								});

				            	if (typeof(JsBridge) != 'undefined') {
				            		// JsBridge.close();
				            	} else {
				            		// this.$route.router.go({name: 'auction_order'});
				            	}
				        	} else {
				        		this.failMsg = result.data.message;
				        		// log(this.failMsg);
				        		this.payTips = this.failMsg;
				            	this.payToast = true;
				        	}
			        	});

                        return;
						//不通过设置默认收货地址来获取奖品领取地址
						let rawAddress = this.getName(this.selectAddress);
						let rawAddressArray = rawAddress.split(/(\s+)/);

						this.state = rawAddressArray[0];
						this.city = rawAddressArray[2];
						this.region = rawAddressArray[4];

						this.primary = 1;

                        if (this.defaultAddressId == 0) {//新增默认地址
                            var obj = {
								act: 'address_add',
								userid: window.userinfo.userid,
								receiver: this.receiverName,
								phone: this.receiverPhone,
								state: this.state,
								city: this.city,
								region: this.region,
								address: this.receiverDetail,
								primary: this.primary,
							};

	                        // log(obj);

                        	this.$http.post('', obj).then((result) => {
								if (result.data.code == 200) {
									// this.added = true;
									// window.history.back()
									// if (browserUtils.versions().ios) {
									// 	JsBridge.close();
									// }
                    
									this.payTips = '添加默认收货地址成功！';
									this.payToast = true;
									this.addedAddress = true;
									this.hideFloatWindow();

								} else{
									this.failMsg = result.data.message;
					        		// log(this.failMsg);
					        		this.payTips = this.failMsg;
					            	this.payToast = true;
								}
							})
                        } else {//修改默认地址
                        	var obj = {
                        		act: 'address_update',
								id: this.defaultAddressId,
								userid: window.userinfo.userid,
								receiver: this.receiverName,
								phone: this.receiverPhone,
								state: this.state,
								city: this.city,
								region: this.region,
								address: this.receiverDetail,
								primary: this.primary,
                        	}
                        	// log(obj);
                        	this.$http.post('', obj).then((result) => {
								if (result.data.code == 200) {

								this.payTips = '修改默认收货地址成功！';
								this.payToast = true;
								this.addedAddress = true;
								this.hideFloatWindow();

									// this.$route.router.go({
									// 	name: 'address-list'
									// });
									// this.added = true;
								} else {
									this.failMsg = result.data.message;
					        		// log(this.failMsg);
					        		this.payTips = this.failMsg;
					            	this.payToast = true;
								}
							})
                        }

						
					}
			},
			getToken(){
	            if(!window.userinfo){
	                if (typeof(JsBridge) != 'undefined'){
	                    var qToken = this.$route.query.token;
	                    var nToken = JsBridge.getTokenFromNative();
	                    if(qToken){
	                		this.noAddress = true;
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
	                	// this.$route.router.go('/duobao/phone');
	                	this.$route.router.go({name: 'login'});
	                } else {
	                    this.$route.router.go({name: 'login'});
	                    // if (browserUtils.versions().ios) {
                     //        window.location.href="yipai://com.tiangong.yipai/login";
                     //    }else{
                     //        JsBridge.getTokenFromNative();
                     //    }
	                }
	            }else{
	                this.token = window.userinfo.token;
	            }

	            this.getUserId();
	        },
	        getUserId() {
	        	// 得到用户ID
	            this.$http.post('', {
	                act: 'user_getUserByToken',
	            }).then((result) => {
	                if (result && result.data && result.data.code == 200) {
	                    this.userId = result.data.data.userid;
	                    // log(this.userId);
	                }
	            })
	        },
	        getDefaultAddress() {
	        	// 得到用户ID
	            this.$http.post('', {
	                act: 'address_getDefaultAddress',
	            }).then((result) => {
	                if (result && result.data && result.data.code == 200) {
	                    // log(result.data.data);
	                    var addressDict = result.data.data;
	                    this.receiverName = addressDict.receiver;
	                    this.receiverPhone = addressDict.phone;
	                    this.receiverRegion = addressDict.state + addressDict.city + addressDict.region;
	                    this.receiverDetail = addressDict.address;

	                    this.defaultAddressId = addressDict.id;

	                    // log(this.defaultAddressId);

               //          this.payTips = '已设置收获地址：' + this.receiverName  + '|' + this.receiverPhone + '|'  + this.receiverRegion + '|'  + this.receiverDetail;
		            	// this.payToast = true;

	                    this.selectAddress = [addressDict.state, addressDict.city, addressDict.region];

	                    // log(this.selectAddress);

						this.state = addressDict.state;
						this.city = addressDict.city;
						this.region = addressDict.region;

						this.receiverRegion = this.state + this.city + this.region;

						// this.payTips = '已设置收获地址：' + this.receiverName  + '|' + this.receiverPhone + '|'  + this.receiverRegion + '|'  + this.receiverDetail;
		    //         	this.payToast = true;

		            	// log(this.userId);

		            	this.step = 'addAddress';
						// log('receiveGift:' + this.phoneNumber);
	                    
	                } else {
	                	this.step = 'addAddress';
						// log('receiveGift:' + this.phoneNumber);
	                }
	            })
	        },
		}
	}
</script>