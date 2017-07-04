<template>
    <!-- <floatbtn></floatbtn> -->
    <img :src="detail.cover" class="product-cover">
    <div class="label-text" style="font-weight:bold;">{{detail.name}}</div>
    <!-- <div class="product-price">¥{{detail.price}}</div> -->
    <div style="margin-left:20px;margin-right:20px;height:1px;background-color:#efefef;"></div>
    <div v-if="skuList && skuList.length>1" style="margin-top:10px;">
        <div style="margin-left:20px;font-size:15px;">规格</div>
        <ul class="stage-detail-list activity-good-list sku-list">
            <li v-for="item in skuList"  @click="chooseSku(item)">
                <div class="card sku-item" :class="{'sku-selected': selectSku == item.id}">
                    {{item.name}}
                </div>
            </li>
        </ul>
    </div>
    <div style="display:flex;flex:1;height:30px;margin-top:10px;margin-bottom:0px;margin-right:20px;text-align:center;">
        <p style="flex:1;text-align:left;line-height:30px;margin-left:20px;">数量</p>
        <div style="float:right;flex-direction:row;display:flex;">
            <img class="number_img_minus" src="../../assets/img/order/ordernum_minus.png" @click="minusNum"/>
            <p class="confirm_order_num">{{buycount}}</p>
            <img class="number_img_plus" src="../../assets/img/order/ordernum_plus.png" @click="addNum"/>
        </div>
    </div>
    <div class="label-text" style="font-weight:bold;">匠人&amp;品牌</div>
    <div style="width:100%;height:auto;align-items:center">
        <img class="master-logo" :src="master.logo">
    </div>
    <div class="master-name">{{master.nickname}}</div>
    <div class="master-brand">{{master.brandName}}</div>
    <div class="divider"></div>
    <div class="product-desc">{{{detail.desc}}}</div>
    <div class="divider"></div>
    <div class="label-text" style="font-weight:bold;">温馨提示</div>
    <div class="list" v-for="item in hints">
        <div class="item">
            <div style="font-size:12px;font-weight:bold;">{{item.key}}:</div>
            <div style="font-size:12px;color:#9fa0a0;margin-top:5px;">{{item.value}}</div>
        </div>
    </div>
    <div class="divider" style="margin-top:20px;"></div>
    <div style="margin-top:10px;align-items:center;font-weight:bold;font-size:14px;text-align:center;">客服电话</div>
    <div style="align-items:center;color:#58bc9a;margin-top:5px;margin-bottom:55px;font-size:13px;text-align:center;">400-820-8820</div>
    <div class="divider"></div>
    <div class="bottom-buy" style="margin-bottom:0px;">
        <div class="bottom-buy-price">¥{{buyPrice}}</div>
        <div class="verticle-line"></div>
        <div class="bottom-buy-btn" @click="buyIt" v-if="detail.availableStock!=0">立即购买</div>
        <div class="bottom-buy-btn" v-if="detail.availableStock==0">已售罄</div>
    </div>
    <!-- 	<div class="scrim" v-if="buying == 'on'" @click="missionAbort" @touchstart="missionAbort"></div>
	<pay-module :data="buyInfo" mode="activity" v-if="buying == 'on'" transition="rise"></pay-module>
	<toast :show.sync="paySuccess">支付成功</toast> -->
    <toast :show.sync="orderSuccess">下单成功</toast>
    <toast :show.sync="payToast" type="text" width="12em">{{payTips}}</toast>
    <toast :show.sync="toast" type="text" width="12em">{{tips}}</toast>
</template>
<style>
    .product-cover {
        width: 100%;
        height: auto;
    }

    .auction-prop {
        flex-direction: row;
        margin-top: 10px;
        margin-left: 20px;
        margin-right: 20px;
    }

    .product-price {
        color: #58bc9a;
        font-size: 13px;
        margin-left: 20px;
        margin-bottom: 10px;
        margin-top: 0;
        margin-right: 20px;
    }

    .prop-key {
        font-size: 13px;
        width: 100px;
        color: #2f2f2f;
        display: inline-block;
        line-height: 1;
    }

    .prop-value {
        font-size: 13px;
        color: #9fa0a0;
        display: inline-block;
        line-height: 1;
    }

    .bottom-buy {
        background-color: #40434a;
        height: 45px;
        flex-direction: row;
        display: flex;
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 9999999;
    }

    .bottom-buy-price {
        width: 40%;
        height: 100%;
        font-size: 16px;
        color: #fff;
        text-align: center;
        line-height: 45px;
    }

    .verticle-line {
        height: 35px;
        width: 1px;
        margin-top: 5px;
        margin-bottom: 5px;
        background-color: #ffffff;
    }

    .bottom-buy-btn {
        width: 59%;
        height: 100%;
        text-align: center;
        font-size: 15px;
        color: #fff;
        line-height: 45px;
    }

    .label-text {
        color: #000000;
        padding: 10px;
        font-size: 14px;
        font-weight: bold;
        margin: 10px;
    }

    .master-logo {
        display: flex;
        width: 80px;
        height: 80px;
        justify-content: center;
        margin: 0 auto;
    }

    .master-name {
        padding: 5px;
        align-items: center;
        color: #2f2f2f;
        font-size: 14px;
        margin-top: 5px;
        text-align: center;
    }

    .master-brand {
        align-items: center;
        color: #9fa0a0;
        font-size: 13px;
        margin-bottom: 20px;
        text-align: center;
    }

    .divider {
        width: 100%;
        height: 5px;
        background-color: #efefef;
    }

    .product-desc {
        padding: 10px;
        margin: 10px;
    }

    .list {
        margin-top: 0;
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 0;
        padding: 10px;
    }
    .sku-list{
        padding-left: 15px;
        padding-right: 15px;
    }
    .sku-list li .sku-item{
        line-height: 35px;
        border:1px solid #e7e7e7;
        background-color: white;
        color: grey;
        text-align: center;
        font-size: 14px;
        margin: 3px;
        padding: 0;
        box-shadow: none;
    }
    .sku-selected{
        border:1px solid #58bc9a !important;
        color: #58bc9a !important;
        background-color: white;
        color: #58bc9a !important;
    }
    .confirm_order_num {
        text-align: center;
        margin-left: 10px;
        margin-right: 10px;
        line-height: 30px;
    }
    .number_img_plus {
        width: 15px;
        height: 15px;
        padding: 7.5px;
        background-color: #F5F5F5;
    }
    .number_img_minus {
        width: 15px;
        height: 4px;
        padding-left: 7.5px;
        padding-right: 7.5px;
        padding-top: 13px;
        padding-bottom: 13px;
        background-color: #F5F5F5;
    }
</style>
<script>
    import floatbtn from '../../components/floatbtn'
    import browserUtils from '../../lib/browser-helper'
    import Loading from 'vux/dist/components/loading'
    import Toast from 'vux/dist/components/toast'
    import PayModule from '../partial/pay-module'
    import {
        isLogined
    }
    from '../../lib/auth'
    import {
        configShare
    }
    from '../../lib/wxclient'
    export default {
        components: {
            floatbtn,
            Loading,
            Toast,
            browserUtils,
            PayModule
        },
        route: {
            data() {
                document.title = "商品详情";
            }
        },
        ready: function() {
            this.$dispatch.apply(this, ['onTitleChanged', {
                title: '商品详情',
                back: true
            }]);
            this.id = this.$route.params.id;
            this.selectSku = this.id;
            document.body.style.overflow = 'visible';
            document.body.style.position = 'relative';
        // this.getToken();
        this.getDefaultData();
        this.getShareInfo();
    },
    data: function() {
        return {
            id: '',
            detail: {},
            master: {},
            hints: [],
            buying: 'off',
            buyInfo: '',
            paySuccess: false,
            orderSuccess: false,
            token: '',
            payToast: false,
            payTips: '',
            skuList:[],
            selectSku:0,
            buycount:1,
            toast:false,
            tips:'',
            buyPrice:0
        }
    },
    methods: {
        addNum: function() {
            if (this.buycount >= this.detail.availableStock) {
                this.buycount = this.detail.availableStock;
                this.toast = true;
                this.tips = "超过可购数量";
                return;
            };
            this.buycount = this.buycount + 1;
            this.buyPrice += this.detail.price;
        },
        minusNum: function() {
            if (this.buycount <= 1) {
                this.buycount == 1;
                this.toast = true;
                this.tips = "最低可购买一件";
                return;
            };
            this.buycount = this.buycount - 1;
            this.buyPrice -= this.detail.price;
        },
        //Pay methods
        getToken() {
            if (!window.userinfo) {
                if (typeof(JsBridge) != 'undefined') {
                    var qToken = this.$route.query.token;
                    var nToken = JsBridge.getTokenFromNative();
                    if (qToken) {
                        this.noAddress = true;
                        this.token = qToken;
                        window.userinfo = {
                            token: qToken
                        };
                    } else if (nToken) {
                        this.token = nToken;
                        window.userinfo = {
                            token: nToken
                        };
                    } else {
                        this.$route.router.go({name: 'login'});
                    }
                } else if (browserUtils.versions().weixin) {
                    this.$route.router.go({
                        name: 'login'
                    });
                } else {
                    this.$route.router.go({
                        name: 'login'
                    });
                }
            } else {
                this.token = window.userinfo.token;
            }
        },

        //得到默认的数据
        getDefaultData: function() {
            this.$http.post('', {
                act: 'mall_getMallGoodInfo',
                group: 'mall',
                id: this.$route.params.id,
            }).then((result) => {
                this.detail = result.data.data;
                this.master = this.detail.master;
                this.hints = this.detail.hints;
                this.skuList = this.detail.list;
                this.buyPrice = this.detail.price;
            });

        },
        chooseSku(skuItem){
            this.buycount = 1;
            this.selectSku = skuItem.id;
            this.detail.cover = skuItem.cover;
            this.detail.price = skuItem.price;
            this.buyPrice = skuItem.price;
        },
        buyIt() {

            if (!isLogined(this)) {
                return;
            };

            // this.getToken();
            // if (this.token == '') {
            // 	this.getToken();
            // 	return;
            // }

            //修改下单逻辑
            this.goConfirmOrder(this.selectSku);
            return;
            
            // this.payTips = '正在下单...';
            // this.payToast = true;

            // this.buying = "pending";
            // this.$http.post('', {
            //     act: 'mall_buy',
            //     group: 'mall',
            //     id: this.id,
            // }).then((result) => {
            //     log(result);
            //     if (result && result.data && result.data.code == 200) {
            //         this.buyInfo = result.data.data;
            //         log(this.buyInfo);
            //         this.orderSuccess = true;
            //         // this.buying = 'on';
            //         // document.body.style.overflow = 'hidden';

            //         this.goConfirmOrder(this.buyInfo.orderId);
            //     } else {
            //         // alert(result.data.message);
            //         this.payTips = result.data.message;
            //         this.payToast = true;
            //     }
            // });
        },
        missionAbort: function() {
            this.buying = 'off';
            document.body.style.overflow = 'visible';
        },
        goConfirmOrder(id) {
            // if (typeof(JsBridge) != 'undefined') {
            // 		JsBridge.openMallProductDetail(item.id);
            // 		return;
            // 	};
            var pnum = this.buycount;
            this.$route.router.go({
                name: 'confirm_order',
                query: {
                    num : pnum
                },
                params: {
                    id : id
                }
            });
        },
        getShareInfo() {
            this.$http.post('', {
                act: 'share_getInfo',
                type: 'good',
                id: this.id
            }).then((resp) => {
                log(resp);
                if (resp && resp.data) {
                    log('ddd')
                    if (resp.data.code == 200) {
                        log('eee')

                        var result = resp.data.data;

                        var share_info = {
                            title: result.title,
                            desc: result.summary,
                            link: window.location.href,
                            imgUrl: result.img
                        };
                        setTimeout(configShare(share_info), 3000);

                    }
                }
            })
        },
    },
    events: {
        'missionAbort': function() {
            this.buying = 'off';
            document.body.style.overflow = 'visible';
            this.getDefaultData();
        },
        'missionComplete': function() {
            this.buying = 'off';
            document.body.style.overflow = 'visible';
            JsBridge.close();
            this.getDefaultData();
        },
        'missionTruelyComplete': function() {
            this.buying = 'off';
            this.paySuccess = true;
            document.body.style.overflow = 'visible';
            this.getDefaultData();
        }
    },
}
</script>
