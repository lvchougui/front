<template>
	<div class="activity-good">
		<div class="activity-cover">
			<img :src="good.cover">
		</div>
		<div class="data">
			<h1 class="good-name">{{good.name}}</h1>
			<p class="good-desc">{{{good.desc}}}
			</p>
		<img v-for="pic in good.pics" :src="pic" track-by="$index" class="mg-t-b-8" />
	</div>
	<div class="activity-bar" v-if="good.availableStock != 0">
		<template v-if="!chooseAmount">
			<div class="price">¥{{good.price}}</div>
			<div class="stock">(库存{{good.availableStock}}件)</div>
			<div class="buyIt" @click="goChooseAmount">
				<span v-if="buying == 'off'">立即购买</span>
				<div v-else class="material ic_query_builder" v-show="buying == 'pending' || buying == 'on'"></div>
			</div>
		</template>
		<div v-else class="chooseAmount">
			<div class="inputNumber">
				<div class="minus" @click="minus">
					<i class="material-icons">remove</i>
				</div>
				<input type="text" v-model="num" pattern="[0-9]*" number id="num"/>
				<div class="plus" @click="plus">
					<i class="material-icons">add</i>
				</div>
			</div>
			<div class="buyIt" @click="buyIt">
				<span v-if="buying == 'off'">提交订单</span>
				<div v-else class="material ic_query_builder" v-show="buying == 'pending' || buying == 'on'"></div>
			</div>
		</div>
	</div>
	<div class="activity-bar" v-else>
		<div class="offline">已售</div>
	</div>
	<div class="scrim" v-if="buying == 'on'" @click="missionAbort" @touchstart="missionAbort"></div>
	<pay-module :data="buyInfo" mode="sale" v-if="buying == 'on'" transition="rise"></pay-module>
	<toast :show.sync="paySuccess">支付成功</toast>
	<toast :show.sync="max" type="text">不能买更多了</toast>
</template>
<script>
	import Swiper from 'vux/dist/components/swiper'
	import SwiperItem from 'vux/dist/components/swiper-item'
	import Loading from 'vux/dist/components/loading'
	import Toast from 'vux/dist/components/toast'
	import PayModule from '../partial/pay-module'
	import {
		isLogined
	}
	from '../../lib/auth'
	import { configShare } from '../../lib/wxclient'

	export default {
		route: {
			data() {
				document.title = '商品详情';
			}
		},
		components: {
			Swiper,
			SwiperItem,
			Loading,
			Toast,
			PayModule
		},
		ready: function () {
			document.body.style.overflow = 'visible';
			document.body.style.position = 'relative';
			this.id = this.$route.params.id;
			this.title = this.$route.query.name;
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: this.title,
				back: true
        }]);
			this.getGood();
			this.getShareInfo();
		},
		data: function () {
			return {
				id: '',
				title: '',
				good: '',
				chooseAmount: false,
				num: 1,
				buying: 'off',
				buyInfo: '',
				title: '专题购',
				paySuccess: false,
				max: false
			}
		},
		methods: {
			getGood() {
				this.$http.post('', {
					act: 'bargain_getInfo',
					id: this.id,
				}).then((result) => {
					if (result && result.data && result.data.code == 200) {
						this.good = result.data.data;
						//设置title
						this.title = this.good.name;
						this.$dispatch.apply(this, ['onTitleChanged', {
                        	title: this.title,
                        	back: true
                    	}]);
                    	document.title = this.title;
						if (typeof (JsBridge) != 'undefined') {
							JsBridge.showShareBtn("bargain", this.good.id);
							JsBridge.setTitle(this.title);
						}
						this.shareWeChat();
					}
				})
			},
			minus: function() {
        	    let number = parseInt(this.num);
        	    if (number > 1) {
        	        this.num = number - 1;
        	    } else {
        	        this.num = 1;
        	    }
        	},
        	plus: function() {
        	    let number = parseInt(this.num);
        	    if (number < this.good.availableStock) {
        	        this.num = number + 1;
        	    } else {
        	        this.num = this.good.availableStock;
        	        this.max = true
        	    }
        	},
        	goChooseAmount: function () {
        		if (this.good.availableStock == 1) {
					this.num = 1;
					this.buyIt();
				} else {
					this.chooseAmount = true
				}
        	},
        	checkNumber: function() {
        		if (this.num >= this.good.availableStock) {
        			this.num = this.good.availableStock;
        		} else if (this.num <= 1) {
        			this.num = 1
        		}
        	},
			buyIt() {
				if (!isLogined(this)) {
					return;
				};
				this.checkNumber();
				this.buying = "pending";
				this.$http.post('', {
					act: 'bargain_buy',
					num: this.num,
					id: this.id,
				}).then((result) => {
					if (result && result.data && result.data.code == 200) {
						this.buyInfo = result.data.data;
						this.buying = 'on';
						document.body.style.overflow = 'hidden';
						document.body.style.position = 'fixed';
					}
				});
			},
			getShareInfo() {
        	    this.$http.post('', {
        	    	act: 'share_getInfo',
        	        type: 'bargain',
        	        id: this.id
        	    }).then((result) => {
        	        if (result && result.data && result.data.code == 200) {
        	            var stageInfo = result.data.data;
        	            var shareInfo = {
        	                title: result.data.data.title,
        	                desc: result.data.data.summary,
        	                link: result.data.data.url,
        	                imgUrl: result.data.data.img
        	            }
        	            configShare(shareInfo);
        	        }
        	    })
        	},
			missionAbort: function () {
				this.buying = 'off';
				this.chooseAmount = false;
				document.body.style.overflow = 'visible';
				document.body.style.position = 'relative';
			}
		},
		events: {
			'missionAbort': function () {
				this.buying = 'off';
				this.chooseAmount = false;
				document.body.style.overflow = 'visible';
				document.body.style.position = 'relative';
				this.getGood();
			},
			'missionComplete': function () {
				this.buying = 'off';
				this.chooseAmount = false;
				document.body.style.overflow = 'visible';
				document.body.style.position = 'relative';
				JsBridge.close();
				this.getGood();
			},
			'missionTruelyComplete': function () {
        	    this.buying = 'off';
        	    this.chooseAmount = false;
        	    this.paySuccess = true;
        	    this.getGood();
        	    document.body.style.overflow = 'visible';
        	    document.body.style.position = 'relative';
        	}
		},
		watch: {
			'num': function () {
        		if (this.num >= this.good.availableStock) {
        			this.num = this.good.availableStock;
        		} else if (this.num <= 1) {
        			this.num = 1
        		}
			}
		}
	}
</script>