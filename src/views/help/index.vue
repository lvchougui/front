<template>
	<div class="top-margin-line" style="height:5px;"></div>
	<div class="help-content">
		<ul v-for = "(index, item) in data" class="help-item">
			<div class="help-cell">
				<div class="cell-left" @click="seeAll(item)">
					<!-- <img class="left-img" src="../../assets/img/coupon/received.png" />  -->
					<div class="text-img-center">
						<!-- <li class="left-title">{{keys[index]}}</li> -->
						<li class="left-title">{{item.name}}</li>
						<img class="left-img-float" src="../../assets/img/hint-indicator.png" /> 
					</div>
				</div>
				<div class="cell-right">
					<ul v-for = "question in item.list" @click="onSelect(question)" class="question">
						<p class="question-title">{{question.title}}</p>
					</ul>
				</div>
			</div>
			
			<div class="float-bottom">
				<div class="bottom-btn" :class="browserType == 'web' ? 'help-bottom-twoparts' : 'help-bottom-threeparts'" @click="userFeedback">
					<img class="bottom-img" src="../../assets/img/pencil.png" /> 
					<p class="bottom-title">留言反馈</p>
					<!-- <p class="bottom-subtitle">(09:00-24:00)</p> -->
				</div>
				<div class="bottom-btn" :class="browserType == 'web' ? 'help-bottom-twoparts' : 'help-bottom-threeparts'" @click="contactService" ref="inlineService" v-if="browserType == 'web' ? false : true">
					<img class="bottom-img" src="../../assets/img/service_btn_black.png" /> 
					<p class="bottom-title">在线客服</p>
					<!-- <p class="bottom-subtitle">(09:00-24:00)</p> -->
				</div>
				<a class="bottom-btn" :class="browserType =='web' ? 'help-bottom-twoparts' : 'help-bottom-threeparts'" href="tel:400-600-9650">
					<img class="bottom-img" src="../../assets/img/call_btn_black.png" /> 
					<p class="bottom-title">咨询电话</p>
					<!-- <p class="bottom-subtitle">(400-600-9650)</p> -->
				</a>
			</div>
		</ul>
	</div>

	<toast :show.sync="payToast" type="text" width="12em">{{payTips}}</toast>
</template>

<style>
	/**{padding:0;margin:0;}*/
	ul,li {margin:0;padding:0;}
	.top-margin-line {
		background-color: rgb(239, 239, 239);
		/*height: 10px;*/
		width: 100%;
	}
	.help-content {
		padding-bottom: 60px;
		margin-bottom: 70px;
	}
	.help-item {
		font-size: 15px;
		/*list-style-type:none;*/
		background-color: white;
		margin: 0;
		overflow:hidden;
		position:relative;
	}
	.help-cell {
		display: flex;
		height: 90px;
	}
	.cell-left {
		flex: 0.3;
		border-color: rgb(239,239,239);
		border-style: solid;
		border-left-width: 0px;
		border-top-width: 0px;
		border-right-width: 1px;
		border-bottom-width: 5px;

		text-align: center;
		vertical-align:middle;
		/*display: flex;*/
	}
	.left-img {
		margin-top: 10px;
		width: 40px;
		height: 40px;
		/*background-color: yellow;*/
	}
	.text-img-center {
		flex-direction:row;
		display:flex;
		/*text-align:center;*/
		justify-content: center;/*column的横竖排列和row是相反的:justify-content或align-items*/
		margin: 0 auto;
		/*background-color: orange;*/
	}
	.left-title{
		/*text-align: right;*/
		text-align: center;
		color: rgb(88,188,154);
		font-size: 15px;
		/*line-height: 20px;*/
		line-height: 90px;
		/*background-color: blue;*/
		/*margin-right: 50px;*/
		/*float: right;*/

		/*line-height: 90px;*/
	}
	.left-img-float {
		margin-top: 40px;
		width: 6px;
		height: 10px;
		margin-left: 3px;
		/*background-color: yellow;*/
		/*float: right;*/
	}
	.cell-right {
		flex: 0.7;
		border-color: rgb(239,239,239);
		border-style: solid;
		border-left-width: 0px;
		border-top-width: 0px;
		border-right-width: 1px;
		border-bottom-width: 5px;
	}
	.question {
		display: inline-block;
		flex-direction: column;

		border-top-width: 0px;
		border-left-width: 1px;
		border-right-width: 1px;
		border-bottom-width: 2px;
		border-style: solid;
		border-color: rgb(239,239,239);
		/*border: 1px solid rgb(239,239,239);*/
		height: 43px;
		width: 49%;
		text-overflow:ellipsis; 
		white-space: nowrap; 
		overflow: hidden;
		vertical-align: bottom;/*解决设置overflow: hidden;后基线对齐问题*/

	}
	.question-title {
		color: rgb(47,47,47);
		font-size: 13px;
		text-align: center;
		line-height: 43px;
	}
	.float-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		z-index: 100;

		height: 70px;
		background-color: white;

		display: flex;
		flex-direction: row;

		border-style: solid;
		border-top-width: 1px;
		border-color: rgb(239,239,239);
	}
	.bottom-btn {
		/*width: 50%;*/
		/*flex: 0.33;*/
		display: flex;
		flex-direction:column;
		/*vertical-align: center;*/
		/*align-items: center;*/
		justify-content: center;
		/*text-align: center;*/
	}
	.bottom-img {
		margin-left: auto;
		margin-right: auto;
		margin-top: 5px;
		width: 25px;
		height: 25px;
		overflow: hidden;
		-webkit-tap-highlight-color: none;
	}
	.bottom-title {
		font-size: 12px;
		color: rgb(47,47,47);
		text-align: center;
		margin-top: 4px;
	}
	.bottom-subtitle {
		font-size: 12px;
		color: gray;
		text-align: center;
	}
	.help-bottom-twoparts {
		flex: 0.5;
		/*background-color: orange;*/
	}
	.help-bottom-threeparts {
		flex: 0.33;
		/*background-color: yellow;*/
	}
	.hide-btn {
		display: none;
	}
	.show-btn {
		display: inline;
	}
</style>

<script>
	// import Vue from 'vue'
	import {
		isLogined
	}
	from '../../lib/auth'
	import browser from '../../lib/browser-helper'
	import Toast from 'vux/dist/components/toast'
	export default {
		components: {
			browser,Toast,
		},
		ready() {
			document.title = "帮助与客服";

			if (typeof(JsBridge) != 'undefined'){
				JsBridge.setTitle('帮助与客服');
			}
			
			// if (this.data.length > 0) {
			// 	for (var i = 0; i < this.data.length; i++) {
			// 		var item = this.data[i];

			// 		this.keys = this.keys.concat(Object.keys(item));
			// 		this.values = this.values.concat(Object.values(item));
			// 	};
			// };
			
			// log(JSON.stringify(this.keys));
			// log(JSON.stringify(this.values));

			this.loadData();


			// if (browser.versions().ios || browser.versions().android) {
			// 	this.browserType = "native";
			// } else {
			// 	this.browserType = "web";
			// }
			// alert(this.browserType);

			const self = this;
			setTimeout(function() {
				if (window.JsBridge.type == 'web') {
					// alert('web');
					self.browserType = "web";
				} else if (window.JsBridge.type == undefined){
					// alert('iOS');
					self.browserType = "native";
				} else if (window.JsBridge.type == 'native') {
					// alert('android');
					self.browserType = "native";
				}
			}, 1000);
		},
		methods: {
			loadData() {
				// this.$http.post('',{
					
				// }).then(function (result) {
				// 	log(result);
				// });

				var url = "http://121.40.154.32:3001/api/article/all";
				this.$http.get(
					url
					)
				.then((res) => {

					if (res.status == 200) {

					};
				})
				.catch((res) => {
					log("error:" + JSON.stringify(res));
				});



				// $.ajax({
	   //              headers: {
	   //                  // 'X-Yipai-Key': "c9da02a7b35c2bf0d98f818c0b85e914",
	   //                  'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
	   //              },
	   //              contentType:"application/x-www-form-urlencoded; charset=UTF-8",
	   //              type: "get",
	   //              url: url,
	   //              // data: "data=" + JSON.stringify(body),
	   //              data: "",
	   //              dataType: "json",
	   //              success: function(result){
	   //              	log(result);
	   //              }
	   //          });
	},
	seeAll(item) {
		log(JSON.stringify(Object.keys(item)[0]));
		this.$route.router.go({
			name: 'questions',
			params: {
			},
			query: {
				title: item.name,
				id: item.id,
			}
		});
	},
	onSelect(question) {
		this.$route.router.go({
			name: 'answer',
			query: {
				id: question.id,
			}
		});
	},
	contactService(item) {
				// if (!isLogined(this)) {
				// 	return;
				// };
				log('browserType:' + this.browserType);

				if (this.browserType == 'web') {
					this.payToast = true;
					this.payTips = "暂未开放";
				}  else {
					//无需登录
					// let token = JsBridge.getTokenFromNative();
					// if (token != undefined) {
						JsBridge.contactCustomerService();
					// } else {
					// 	this.unLogined();
					// }
				}
			},
			userFeedback(item) {
				if (this.browserType == 'web') {
					if (!isLogined(this)) {
						return;
					};
					this.$route.router.go({name: 'userFeed'});
				} else {
					let token = JsBridge.getTokenFromNative();
					// alert(token);
					if (token != undefined) {
						JsBridge.userFeedback();
					} else {
						this.unLogined();
					}
				}
			},
			unLogined(){
				if (this.browserType == 'web') {
					this.$route.router.go('/login');
				} else {
					window.location.href = "yipai://com.tiangong.yipai/login";
				}
			}
		},
		data() {
			return {
				browserType: '',
				// data: [{"订单问题" : ["修改订单","取消订单","差价问题","缴税后如何报销"]}, {"售后问题" : ["申请售后退货","商品破损处理","退货运费承担","退货后何时退款"]}, {"支付问题" : ["解绑银行卡","支付方式","为何无法微信支付","付款后显示待支付"]},{"物流问题" : ["催促发货","催促物流","能否包邮","更改收件地址"]},{"优惠券问题" : ["如何获取优惠券","如何使用优惠券","优惠券会过期吗","优惠券无法使用"]}],
				data: [],
				payToast: false,
				payTips: '',
				// keys: [],
				// values: [],
			}
		}
	}
</script>