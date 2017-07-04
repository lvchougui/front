<template>
    <div class="header">
        <img src="../../assets/img/order/zhifuzhognxin.png" style="width=30%;height:30%;padding-top:40px;"></img>
        <br></br>
        <span class="header-title">支付中心<span>
    </div>

    <div>
    <span class="order-info">订单编号：{{id}}</span>
        <span class="order-info">付款总额：¥{{couponDict.coupon_amount == undefined ? orderInfo.total : orderInfo.total - couponDict.coupon_amount}}</span>
    </div>
    <div class="divider"></div>
    <div style="width:100%;height:60px;" @click="chooseCoupon">
        <img src="../../assets/img/order/narrow_more_btn.png" style="width=15px;height:20px;text-align:centre;float:right;padding-top:20px;padding-right:20px;" v-if="orderInfo.couponStr != nil && couponBinded == false"></img>
        <span class="order-info" style="height:20px;padding-rigth:80px;padding-top:5px;">{{orderInfo.couponStr==nil ? "暂无可用优惠券" : orderInfo.couponStr}}</span>
        <!-- <span class="order-info" style="heigth:20px;padding-rigth:80px;">优惠金额：¥{{orderInfo.couponPrice == nil ? 0 : orderInfo.couponPrice}}</span> -->
        <span class="order-info" style="heigth:20px;padding-rigth:80px;">优惠金额：¥{{couponDict.coupon_amount == nil ? (orderInfo.coupon == undefined ? 0 : orderInfo.coupon.couponPrice) : couponDict.coupon_amount}}</span>
    </div>
    <div class="divider"></div>
    <div>
        <div style="padding-top:10px;padding-bottom:10px;" v-if="canBalancePay == true" @click="chooseBalancePay">
            <img src="../../assets/img/order/zhanghuyue.png" style="width=35px;height:35px;text-align:centre;float:left;padding-left:20px;"></img>
            <span style="padding-left:20px;heigth:35px;line-height:35px;font-size:15px;color:rgb(60,60,60);">账户余额</span>
            <!-- <img src="../../assets/img/radio_on.png" style="width=20px;height:20px;text-align:centre;float:right;padding-right:20px;padding-top:10px;"></img> -->
            <label style="text-align:centre;float:right;padding-right:20px;padding-top:10px;">
                <input name="PayWay" type="radio" value="0" v-mode="inputdata" checked="PayWay === 0 ? checked : unchecked" style="width=20px;height:20px;" />
            </label>
        </div>
        <div style="width:90%;text-align:centre;background-color:rgb(200,200,200);height:1px;margin:0 auto;" v-if="canBalancePay == true"></div>
        <div style="padding-top:10px;padding-bottom:10px;" v-if="canWXpay == true" @click="chooseWXPay">
            <img src="../../assets/img/order/weixinzhifu.png" style="width=35px;height:35px;text-align:centre;float:left;padding-left:20px;"></img>
            <span style="padding-left:20px;heigth:35px;line-height:35px;font-size:15px;color:rgb(60,60,60);">微信支付</span>
            <!-- <img src="../../assets/img/radio_on.png" style="width=20px;height:20px;text-align:centre;float:right;padding-right:20px;padding-top:10px;"></img> -->
            <label style="text-align:centre;float:right;padding-right:20px;padding-top:10px;">
                <input name="PayWay" type="radio" value="1" checked="PayWay === 1 ? checked : unchecked" style="width=20px;height:20px;" />
            </label>
        </div>
        <div style="width:90%;text-align:centre;background-color:rgb(200,200,200);height:1px;margin:0 auto;" v-if="canWXpay == true"></div>
        <div style="padding-top:10px;padding-bottom:10px;" v-if="canAliPay == true" @click="chooseAliPay">
            <img src="../../assets/img/order/zhifubaozhifu.png" style="width=35px;height:35px;text-align:centre;float:left;padding-left:20px;"></img>
            <span style="padding-left:20px;heigth:35px;line-height:35px;font-size:15px;color:rgb(60,60,60);">支付宝支付</span>
            <!-- <img src="../../assets/img/radio_on.png" style="width=20px;height:20px;text-align:centre;float:right;padding-right:20px;padding-top:10px;"></img> -->
            <label style="text-align:centre;float:right;padding-right:20px;padding-top:10px;">
                <input name="PayWay" type="radio" value="2" checked="PayWay === 2 ? checked : unchecked" style="width=20px;height:20px;" />
            </label>
        </div>
        <div>
            <div style="text-align:center;margin:0 auto;width:90%;height:40px;background-color:black;margin-top:40px;margin-bottom:40px;" @click="buyIt">
                <div>
                    <span style="font-size:14px;color:white;line-height:40px;">立即支付</span>
                </div>
            </div>
            <!-- <div class="divider"></div> -->
            <div v-if="payStep == 'captcha'" class="float-cover" @click="hideFloatWindow">
            </div>
            <div v-if="payStep == 'captcha'" class="float-window">
                <img src="../../assets/img/coupon/deposit_close_btn.png" class="float-close" @click="hideFloatWindow"></img>
                <div class="float-title">余额支付</div>
                <div style="width:100%;text-align:centre;background-color:rgb(220,220,220);height:1px;margin:0 auto;"></div>
                <div class="float-payCount">付款金额：¥{{couponDict.coupon_amount == undefined ? orderInfo.total : orderInfo.total - couponDict.coupon_amount}}</div>
                <div class="float-phone">手机号：{{orderPhone}}</div>
                <div class="captcha">
                    <input type="text" v-model="captcha" placeholder="请输入验证码" class="float-input" />
                </div>
                <span class="float-resend" @click="getCaptcha">重新发送</span>
                <div class="float-confirmBtn" @click="balance_pay">确认支付</div>

                <template v-if="payStep == 'conform'">
                    <div class="title">确认您已完成支付?</div>
                    <div class="pay-btn pay-complete" @click="missionComplete">是的</div>
                    <div class="pay-btn pay-complete" @click="missionAbort">不支付了</div>
                </template>
            </div>
            <toast :show.sync="paySuccess">支付成功</toast>
            <toast :show.sync="payToast" type="text" width="12em">{{payTips}}</toast>
</template>
<style type="text/css">
.float-window {
    width: 100%;
    height: 240px;
    position: fixed;
    bottom: 0px;
    background-color: rgb(255, 255, 255);
}

.float-title {
    text-align: center;
    font-size: 18px;
    color: rgb(47, 47, 47);
    line-height: 50px;
    width: 50%;
    margin: 0 auto;
}

.float-close {
    margin-top: 20px;
    float: right;
    width: 20px;
    height: 20px;
    margin-top: 15px;
    margin-right: 2.5%;
}

.float-payCount {
    color: rgb(88, 188, 154);
    font-size: 16px;
    margin-left: 2.5%;
    margin-top: 10px;
    line-height: 20px;
}

.float-phone {
    color: rgb(47, 47, 47);
    font-size: 16px;
    margin-left: 2.5%;
    margin-top: 5px;
    line-height: 20px;
}

.float-resend {
    float: right;
    width: 30%;
    height: 40px;
    background-color: rgb(88, 188, 154);
    border: 1px solid rgb(88, 188, 154);
    margin-right: 2.5%;
    margin-top: 10px;
    margin-bottom: 10px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    color: white;
}

.float-input {
    padding-left: 0.5%;
    padding-right: 0.5%;
    width: 60%;
    margin-left: 2.5%;
    margin-top: 10px;
    margin-bottom: 10px;
    float: left;
    font-size: 16px;
    height: 40px;
    border-radius: 0px;
    border: 1px solid rgb(220, 220, 220);
}

.float-confirmBtn {
    clear: left;
    background-color: rgb(88, 188, 154);
    border: 1px solid rgb(88, 188, 154);
    text-align: center;
    width: 95%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: white;
    margin: 2.5%;
}

.float-cover {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.5);
}

.header {
    width: 100%;
    height: 200px;
    background-color: rgb(88, 188, 154);
    text-align: center;
}

.order-info {
    margin-top: 5px;
    margin-bottom: 5px;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 15px;
    overflow: hidden;
}

.header-title {
    font-size: 15px;
    color: white;
}

.section-title {
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    text-align: left;
    font-size: 16px;
    font-weight: bold;
}

.divider {
    width: 100%;
    height: 10px;
    background-color: #efefef;
}

.logo {
    width: 75px;
    height: 75px;
    padding: 15px;
    float: left;
}

.order-info {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    margin-left: 20px;
    vertical-align: center;
}

.orderName {
    text-align: left;
    color: rgb(47, 47, 47);
    font-size: 15px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 15px;
    margin-right: 10px;
}

.price {
    text-align: left;
    color: rgb(47, 47, 47);
    font-size: 15px;
    padding-right: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 5px;
    margin-right: 10px;
}

.num {
    width: 50px;
    height: 20px;
    float: right;
    margin-top: 30px;
    margin-right: 10px;
    text-align: right;
    color: rgb(47, 47, 47);
    font-size: 15px;
}

.addressBlock {
    margin: 10px;
    padding: 10px;
    border: 1px solid rgb(200, 200, 200);
}

.remarks {
    margin: 10px;
    padding: 10px;
    width: 85%;
    border: 1px solid rgb(200, 200, 200);
    font-size: 13px;
}

.negotiate {
    font-size: 15px;
}

.bottom-buy {
    background-color: #40434a;
    height: 45px;
    flex-direction: row;
    display: flex;
}

.bottom-buy-price {
    width: 50%;
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
    width: 50%;
    height: 100%;
    text-align: center;
    font-size: 15px;
    color: #fff;
    line-height: 45px;
}
</style>
<script type="text/javascript">
import floatbtn from '../../components/floatbtn'
import Loading from 'vux/dist/components/loading'
import Toast from 'vux/dist/components/toast'
import PayModule from '../partial/pay-module'
import {
    isLogined
}
from '../../lib/auth'
import storage from '../../lib/storage-helper'
import {
    configShare
}
from '../../lib/wxclient'

import browserUtils from '../../lib/browser-helper'
import wx from 'weixin-js-sdk'
import constants from '../../const'
import Alert from 'vux/dist/components/alert'

import XInput from 'vux/dist/components/x-input'

import {
    orderPaying,
    getOrderAddress,
    getOrderCoupon
} from '../../vuex/getters'
import {
    setOrderAddress,
    setOrderCoupon
} from '../../vuex/actions'

export default {
    components: {
        floatbtn,
        Loading,
        Toast,
        PayModule,
        Alert,
        XInput,
        browserUtils,
        constants
    },
    vuex: {
        actions: {
            setOrderAddress,
            setOrderCoupon
        },
        getters: {
            order: orderPaying,
            // selectedAddress: getOrderAddress,
            getOrderCoupon
        }
    },
    ready() {
        document.title = "支付中心";
        this.id = this.$route.params.id;
        // 检查页面是需要重载，微信以第一次打开页面的URL当做着陆页，history mode 微信有问题，所有在第一次进入当前页面时，重载刷新一遍
        // 解决在支付时提示当前页面URL未注册问题
        var r = this.$route.query.r;
        if (r) {
            var loc = window.location;

            window.location = loc.protocol + '//' + loc.hostname + loc.pathname;
            return;
        }
        this.$dispatch.apply(this, ['onTitleChanged', {
                title: '支付中心',
                back: true
            }])
            /*{"name":"pay-centre","path":"/pay?id=2017041016291911795","query":{"id":"2017041016291911795"},"params":{},"matched":{"0":{"handler":{"name":"pay-centre","path":"/pay","fullPath":"/pay"},"params":{},"isDynamic":false},"queryParams":{"id":"2017041016291911795"},"length":1}}*/
            //微信H5支付需要配置安全域名，只能使用get方式传递参数

        document.body.style.overflow = 'visible';
        document.body.style.position = 'relative';
        if (browserUtils.versions().android) {
            this.isAndroid = true;
        }
        if (!isLogined(this)) {
            return;
        };

        // 微信授权回传code
        var code = this.$route.query.code;

        if (!window.userinfo.openid && !code) {
            var state = '123';
            var path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + constants.tgyp.appid + '&redirect_uri=' + constants.redirect_uri + this.id + '&response_type=code&scope=snsapi_base&state=' + state + '#wechat_redirect';
            window.location = path;
            return;
        }

        if (code) {
            this.getOpenId(code);
        }

        // this.getToken();
        this.getDefaultData();
        this.getAllPayType();

    },
    beforeDestroy() {
        // 清除已选择的优惠券
        // this.setOrderAddress(undefined);
        this.setOrderCoupon(undefined);
        this.couponDict = {};
    },
    data: function() {

        var selectedCoupon = this.getOrderCoupon;
        log(this.getOrderCoupon);

        return {
            id: '', //订单编号
            orderInfo: {},
            remarks: '',
            PayWay: 0, //默认为账户余额（0：账户余额，1：微信支付；2：支付宝支付）
            canBalancePay: false, //是否可以使用账户余额支付
            canWXpay: false, //是否可以使用微信支付
            canAliPay: false, //是否可以使用支付宝支付
            inputdata: false,
            couponDict: selectedCoupon == undefined ? {} : selectedCoupon, //优惠券信息
            paySuccess: false, //是否支付成功
            buyInfo: '', //支付信息
            data: '',
            couponBinded: false,
            orderBalance: 0,
            orderPhone: '',
            payToast: false,
            payTips: '',
            captcha: '',
            payStep: 'choose',

            inApp: false,
            isAndroid: false,
            alipayEnable: true,
            addressData: '',
            selectedAddress: '',
            chooseingAddress: false,
            token: '',
            payMethod: 'w',
            haveEnoughBalance: false,

            waitForPay: false,

            noAddress: false,
            payFailed: false,
            failMsg: ''
        }
    },
    methods: {
        // 根据code获取openid
        getOpenId(code) {
            this.payTips = '请稍候'
            this.payToast = true;

            this.$http.post('', {
                act: 'wchat_getOpenid',
                app: 'mp_tgyp',
                code: code
            }).then((resp) => {
                var result = resp.data;

                if (result && result.code == 200) {
                    window.userinfo.openid = result.data.wxopenid;
                    storage.saveUserInfo(window.userinfo);
                    // var loc = window.location;
                    // var id = this.$route.query.id;
                    // window.location = loc.protocol + '//' + loc.hostname + loc.pathname + '?id=' + id;
                    // return;
                }
                this.payTips = ''
                this.payToast = false;
            });
        },
        //得到默认的数据
        getDefaultData: function() {
            this.$http.post('', {
                act: 'commonOrder_getOrderInfoByNew',
                oid: this.id,
            }).then((result) => {
                this.orderInfo = result.data.data;

                if (this.orderInfo.coupon != undefined) {
                    this.couponBinded = true;
                };

                log(this.orderInfo);

                // this.getToken();
                // this.getAddress();
                // if(this.orderInfo.address.receiver != ''){
                //  this.selectedAddress = this.orderInfo.address;
                //  this.chooseingAddress = false;
                // }
            });

            //得到余额
            this.$http.post('', {
                    act: 'balance_getInfo',
                }).then((result) => {
                    if (result && result.data && result.data.code == 200) {
                        this.orderBalance = result.data.data.availableBalance;
                        log(this.orderBalance);
                    }
                })
                // 得到手机号
            this.$http.post('', {
                act: 'user_getUserByToken',
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    this.orderPhone = result.data.data.phone;
                    log(this.orderPhone);
                }
            })

            if (window.userinfo != undefined) {
                log(window.userinfo.phone);
                log(window.userinfo.wxopenid);
            };
        },

        getAllPayType() {
            this.$http.post('', {
                act: 'payType_getList',
            }).then((result) => {
                var dict = result.data.data
                log(dict);
                if (dict.balance === 1) {
                    this.canBalancePay = true;
                };
                if (dict.wxpay === 1) {
                    this.canWXpay = true;
                };
                if (dict.alipay === 1) {
                    this.canAliPay = true;
                };
                // this.PayWay = 1;
                log(this.PayWay);
                log(this.inputdata);

                this.checkIfAliPayEnable();
            });
        },
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
        checkIfAliPayEnable() {
            if (browserUtils.versions().weixin) {
                log('微信打开，不可以使用支付宝支付');
                this.canAliPay = false;
            } else {
                log('非微信打开，可以使用支付宝支付');
            }
        },
        getPayWay() {
            var radio = document.getElementsByName("PayWay");
            for (var i = 0; i < radio.length; i++) {
                if (radio[i].checked == true) {
                    this.PayWay = radio[i].value;
                    break;
                }
            }
            log(this.PayWay);
        },
        chooseBalancePay() {
            // this.payTips = '选择余额支付';
            // this.payToast = true;
            this.PayWay = 0;

            var radio = document.getElementsByName("PayWay");
            for (var i = 0; i < radio.length; i++) {
                if (radio[i].value == 0) {
                    radio[i].checked = 1;
                } else {
                    radio[i].checked = 0;
                }
            }
        },
        chooseWXPay() {
            // this.payTips = '选择微信支付';
            // this.payToast = true;
            this.PayWay = 1;

            var radio = document.getElementsByName("PayWay");
            for (var i = 0; i < radio.length; i++) {
                if (radio[i].value == 1) {
                    radio[i].checked = 1;
                } else {
                    radio[i].checked = 0;
                }
            }
        },
        chooseAliPay() {
            // this.payTips = '选择支付宝支付';
            // this.payToast = true;
            this.PayWay = 2;

            var radio = document.getElementsByName("PayWay");
            for (var i = 0; i < radio.length; i++) {
                if (radio[i].value == 2) {
                    radio[i].checked = 1;
                } else {
                    radio[i].checked = 0;
                }
            }
        },
        buyIt() {
            // if (!isLogined(this)) {
            //  return;
            // };
            this.getPayWay();
            this.bindCoupon();


        },
        chooseCoupon() {
            if (this.couponBinded || this.orderInfo.couponStr == undefined) { //已绑定优惠券，不可点击
                return;
            };

            var type = 1;
            if (this.orderInfo.type == 'auction') {
                type = 2;
            }
            // this.$route.router.go('/coupons/minecoupon?mode=1&type=1&amount=' + this.orderInfo.total);

            log('couponUrl:http://' + window.location.host + '/minecoupon?type=' + type + '&amount=' + this.orderInfo.total + '&skuid=' + this.orderInfo.bizid);

            this.$route.router.go('/minecoupon?type=' + type + '&amount=' + this.orderInfo.total + '&skuid=' + this.orderInfo.bizid);
        },
        bindCoupon() {
            log(this.couponDict.id);
            if (this.couponDict.id > 0 && this.couponBinded == false) {
                this.$http.post('', {
                    act: 'commonOrder_addCoupon',
                    ordersn: this.id,
                    cid: this.couponDict.id
                }).then((result) => {
                    if (result && result.data && result.data.code == 200) {
                        log('绑定优惠券成功');
                        this.couponBinded = true;
                        this.getPayInfo();
                    } else {
                        log('绑定优惠券失败');
                        this.payTips = '绑定优惠券失败';
                        this.payToast = true;
                    }
                });
            } else {
                log('无需绑定优惠券');
                this.getPayInfo();
            }
        },
        balance_pay() {
            if (this.captcha == '') {
                this.payTips = "请输入验证码";
                this.payToast = true;
            } else {
                var obj = {
                    act: 'payment_getInfo',
                    oid: this.id,
                    otype: this.orderInfo.type,
                    ptype: 'balance',
                    cid: this.couponDict.id,
                    captcha: this.captcha,
                };
                //       this.payTips = JSON.stringify(obj);
                // this.payToast = true;

                this.$http.post('', obj).then((result) => {
                    log(result.data);
                    if (result.data.code == 200) {
                        this.hideFloatWindow();

                        this.paySuccess = true;

                        setTimeout(function() {
                            if (typeof(JsBridge) != 'undefined') {
                                JsBridge.close();
                            } else {
                                this.$route.router.go({
                                    name: 'wait_deliver_orders'
                                });
                            }
                        }.bind(this), 1000)
                    } else {
                        this.failMsg = result.data.message;
                        this.payTips = this.failMsg;
                        this.payToast = true;
                        // this.payFailed = true;
                    }
                });
            }
        },
        getPayInfo() {

            // if (!window.userinfo.openid) {
            //     var state = '123';
            //     var path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + constants.tgyp.appid + '&redirect_uri=' + constants.redirect_uri + this.id + '&response_type=code&scope=snsapi_base&state=' + state + '#wechat_redirect';
            //     window.location = path;
            //     return;
            // }


            setTimeout(function(){
                this.payStep = 'conform';
            }.bind(this), 5000)

            var h5_obj = {
                act: 'payment_getInfo',
                oid: this.id,
                otype: this.orderInfo.type,
                ptype: 'h5wxpay',
                openid: window.userinfo.openid,
            };

            this.$http.post('', h5_obj).then((result) => {
                log('payInfo:' + JSON.stringify(result.data));
                if (result && result.data && result.data.code == 200) {

                    var data = result.data.data;

                    var that = this;

                    var obj = {
                        timestamp: data.timeStamp,
                        nonceStr: data.nonceStr,
                        package: data.package,
                        signType: data.signType,
                        paySign: data.sign,
                        success: function(res) {
                            // alert('success:' + res.errMsg);
                            setTimeout(function() {
                                that.$route.router.go({
                                    name: 'wait_deliver_orders'
                                });
                            }, 2000)
                            
                            // 支付成功后的回调函数
                            // if (res.errMsg.indexOf("ok")!=-1) {
                            //     alert('支付成功1');
                            //     this.paySuccess = true;
                            //     if (typeof(JsBridge) != 'undefined') {
                            //         JsBridge.close();
                            //     } else {
                            //         alert('支付成功2');

                            //         this.$route.router.go({
                            //             name: 'wait_deliver_orders'
                            //         });
                            //     }
                            // } else {
                            //     alert('支付失败');
                            // }
                        }
                    };

                    wx.chooseWXPay(obj);



                } else {
                    this.failMsg = result.data.message;
                    alert(this.failMsg);
                }
            });

        },
        getCaptcha() {
            //获取手机号
            this.$http.post('', {
                phone: this.orderPhone,
                act: 'captcha_getCaptcha',
                type: 3
            }).then((result) => {
                log(result.data);
                if (result.data.code == 200) {
                    var resp = result.data;
                    this.payTips = '验证码已发送，请注意查收';
                    this.payToast = true;
                } else {
                    this.failMsg = result.data.message;
                    this.payTips = this.failMsg;
                    this.payToast = true;
                    // this.payFailed = true;
                }
            });
        },
        hideFloatWindow() {
            this.payStep = '';
            this.captcha = '';
        }
    },
    events: {
        'missionAbort': function() {
            // this.buying = 'off';
            alert('您已取消支付');
            document.body.style.overflow = 'visible';
            // this.getDefaultData();
        },
        'missionComplete': function() {
            // this.buying = 'off';
            document.body.style.overflow = 'visible';
            // JsBridge.close();
            alert('支付成功');
            this.paySuccess = true;
            this.$route.router.go({
                name: 'wait_deliver_orders'
            });
            // this.getDefaultData();
        },
        'missionTruelyComplete': function() {
            // this.buying = 'off';
            this.paySuccess = true;
            document.body.style.overflow = 'visible';
            // this.getDefaultData();
        }
    },
}
</script>
