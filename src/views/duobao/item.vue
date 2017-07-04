<template>
    <div class="db-detail-top">
        <img :src="mainData.cover">
        <h1 class="db-detail-title">{{mainData.name}}</h1>
        <div class="db-detail-progress">
            <p>期号: {{mainData.stage}}</p>
            <div class="bar">
                <div class="bar-inner" :style="{width: (mainData.total-mainData.available)/mainData.total*100+'%'}"></div>
            </div>
            <p style="float:left">总需: {{mainData.total}}人次</p>
            <p style="float:right">剩余: <span style="color: #64b5f6">{{mainData.available}}</span></p>
        </div>
        <div class="db-detail-mod">
            <!-- <div class="login" v-show="!userinfo && !inApp" v-tap="login">
                <p><span style="color: #64b5f6">登录</span> 以查看你的夺宝号码~</p>
            </div> -->
            <template v-if="userinfo && mainData.userRecord==null">
                <div class="join">
                    <p>您没有参与本期夺宝哦!</p>
                </div>
            </template>
            <template v-if="mainData.status==4">
                <div class="ended">
                    <div class="top">期号: {{mainData.stage}}</div>
                    <div class="mid">
                        <div class="profile">
                            <img :src="mainData.user.logo" />
                            <p>获得者: <span style="color: #64b5f6">{{mainData.user.nickname}}</span></p>
                        </div>
                        <div class="status">
                            <p>本期参与: <span style="color:#58bc9a">{{mainData.user.num}}</span>人次</p>
                            <p>揭晓时间: {{mainData.endTime}}</p>
                        </div>
                    </div>
                    <div class="bottom">
                        <p>幸运号码: <big>{{mainData.code}}</big></p>
                    </div>
                    <div class="goShow" v-if="canShow" @click="goShow">
                        <!-- <i class="material-icons">arrow_forward</i> -->
                        <div class="ic_add_a_photo material material-white"></div>
                        <div>去晒单</div>
                    </div>
                </div>
            </template>
            <template v-if="mainData.userRecord!=null">
                <div class="joined">
                    <p>您参与了: <span style="color:#58bc9a">{{mainData.num}}</span>人次</p>
                    <p>夺宝号码: <span v-for="code in mainData.userRecord">{{code}}  </span></p>
                </div>
            </template>
        </div>
    </div>
    <div class="db-detail-bottom">
        <div class="db-cellgroup">
            <div class="db-cell" @click="goHistory(mainData.id)">
                <p>本期所有参与纪录 ({{mainData.record == undefined ? 0 : mainData.record.length}})</p>
                <div class="icon icon-chevron-right"></div>
            </div>
        </div>
    </div>
    <div class="db-intro">
        <h4>简介</h4> {{{descData.desc}}}
        <ul>
            <li v-for="pic in mainData.pics" track-by="$index">
                <img :src="pic">
            </li>
        </ul>
    </div>
    <div class="scrim" v-if="payStage!=0" @click="payStage=0" @touchMove="payStage=0"></div>
    <div class="db-bottom-fix" v-show="mainData.status == 1">
        <box gap="4px 8px 0 8px">
            <x-button type="primary" v-show="payStage==0" @click="goChooseNumber">立即购买</x-button>
            <x-button type="primary" v-show="payStage==1" @click="callPay">去付款</x-button>
        </box>
    </div>
    <div class="paysheet" v-show="payStage!=0" transition="sheetExpand">
        <div class="close-tab">
            <div class="icon icon-pulldown"></div>
        </div>
        <div class="select-number" v-show="payStage==1">
            <h4>参与人次</h4>
            <div class="inputNumber">
                <div class="minus" @="minus">
                    <i class="material-icons">remove</i>
                </div>
                <input type="text" v-model="payNumber" v-on:input="checkNumber" v-on:blur="checkNumberAgain" pattern="[0-9]*" :max="mainData.available" :min="mainData.limits" number/>
                <div class="plus" @click="plus">
                    <i class="material-icons">add</i>
                </div>
            </div>
            <box gap="4px 16px 0 16px">
                <flexbox>
                    <flexbox-item class="num-btn">
                        <x-button plain @click="buy(5)">5</x-button>
                    </flexbox-item>
                    <flexbox-item class="num-btn">
                        <x-button plain @click="buy(10)">10</x-button>
                    </flexbox-item>
                    <flexbox-item class="num-btn">
                        <x-button plain @click="buy(20)">20</x-button>
                    </flexbox-item>
                    <flexbox-item class="num-btn">
                        <x-button plain @click="payNumber = mainData.available">打包</x-button>
                    </flexbox-item>
                </flexbox>
            </box>
        </div>
    </div>

    <div class="scrim" v-if="buying == 'on'" @click="missionAbort" @touchstart="missionAbort"></div>
    <pay-module :data="buyInfo" mode="duobao" v-if="buying == 'on'" transition="rise"></pay-module>
    <toast :show.sync="paySuccess">支付成功</toast>
</template>
<script>
import Swiper from 'vux/dist/components/swiper'
import SwiperItem from 'vux/dist/components/swiper-item'
import XButton from 'vux/dist/components/x-button'
import Box from 'vux/dist/components/box'
import Flexbox from 'vux/dist/components/flexbox'
import FlexboxItem from 'vux/dist/components/flexbox-item'
import Toast from 'vux/dist/components/toast'

import PayModule from '../partial/pay-module'

import browserUtils from '../../lib/browser-helper'
import wx from 'weixin-js-sdk'
import constants from '../../const'
import {
    isLogined
} from '../../lib/auth'
import { configShare } from '../../lib/wxclient'

export default {
    route:{
        data(){
            document.title="一元夺宝"
        }
    },
    components: {
        Swiper,
        SwiperItem,
        XButton,
        Box,
        Flexbox,
        FlexboxItem,
        Toast,
        PayModule
    },
    ready() {
        document.body.style.overflow = 'visible';
        document.body.style.position = 'relative';
        this.id = this.$route.params.id;
        this.initToken();
        this.$dispatch.apply(this, ['onTitleChanged', {
            title: '一元夺宝',
            back: true
        }]);
        this.payStage = 0;
        this.getMainData();
        this.getDescData();
        this.getShareInfo();
        this.imgHeight = window.innerWidth + 'px'
    },
    data() {
        return {
            id: '',
            title: '',
            payStage: 0,
            payNumber: '',
            userinfo: '',
            mainData: {},
            descData: {},
            inApp: false,
            token: '',
            processing: false,
            shareInfo: '',
            buying: 'off',
            orderBalance: '',
            orderPhone: '',
            buyInfo: {},
            paySuccess: false,
            canShow: false,
            imgHeight: ''
        }
    },

    methods: {
        goHistory(id) {
            this.$route.router.go({
                name: 'duobao_history',
                params: {
                    id: id
                }
            });
        },
        initToken(){
            if(!window.userinfo){
                if (typeof(JsBridge) != 'undefined'){
                    var qToken = this.$route.query.token;
                    if(qToken){
                        this.token = qToken;
                        window.userinfo = {
                            token:qToken
                        };
                    }
                }
            }else{
                this.token = window.userinfo.token;
            }
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

        // 发起支付
        goChooseNumber() {
            this.payStage = 1;
            if (typeof(JsBridge) != 'undefined') {
                this.getToken();
                if(this.token){
                    window.userinfo = {
                        token: this.token
                    };
                };
            }else {
                if(!isLogined(this)){
                    return;
                }
            }
            //得到余额
            this.$http.post('', {
                    act: 'balance_getInfo',
                }).then((result) => {
                    if (result && result.data && result.data.code == 200) {
                        this.orderBalance = result.data.data.availableBalance;
                    }
                })
            //得到手机号
            this.$http.post('', {
                    act: 'user_getUserByToken',
                }).then((result) => {
                    if (result && result.data && result.data.code == 200) {
                        this.orderPhone = result.data.data.phone;
                    }
                })
        },
        callPay() {
            if (!isLogined(this)) {
                return
            };
            this.buyInfo = {
                price: this.payNumber,
                id: this.id,
                phone: this.orderPhone,
                balance: this.orderBalance
            };
            this.payStage = 0;
            this.buying = 'on';
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
        },
        getMainData() {
            this.$http.post('', {
                act: 'goods_info',
                group: 'cloud',
                id: this.id,
                token: this.token
            }).then((result) => {
                this.mainData = result.data.data;
                this.payNumber = result.data.data.limits;
                if(this.mainData.user && this.token){
                    this.$http.post('', {
                        act: 'user_getUserByToken',
                    }).then((result) => {
                        if (result && result.data && result.data.code == 200) {
                            if(result.data.data.phone == this.mainData.user.phone){
                                this.canShow = true
                            }
                        }
                    })
                }
                //设置title
                this.title = this.mainData.name;
                this.$dispatch.apply(this, ['onTitleChanged', {
                    title: this.title,
                    back: true
                }]);
                document.title = this.title;
                if (typeof (JsBridge) != 'undefined') {
                    JsBridge.setTitle(this.title);
                }
            })
        },

        minus: function() {
            let number = parseInt(this.payNumber);
            if (number > this.mainData.limits) {
                this.payNumber = number - 1;
            } else {
                this.payNumber = this.mainData.limits;
            }
        },
        plus: function() {
            let number = parseInt(this.payNumber);
            if (number < this.mainData.available) {
                this.payNumber = number + 1;
            } else {
                this.payNumber = this.mainData.available;
            }
        },
        buy: function(count) {
            if (this.mainData.available >= count) {
                if (count < this.mainData.limits) {
                    this.payNumber = this.mainData.limits;
                }else{
                    this.payNumber = count;
                }
            } else {
                this.payNumber = this.mainData.available;
            }
        },
        checkNumber: function() {
            let number = this.payNumber;
            if (number > this.mainData.available) {
                this.payNumber = this.mainData.available;
            }
        },
        checkNumberAgain: function() {
            let number = this.payNumber;
            if (number < this.mainData.limits) {
                this.payNumber = this.mainData.limits;
            }
        },
        getDescData: function() {
            this.$http.post('', {
                act: 'goods_desc',
                group: 'cloud',
                id: this.id
            }).then((result) => {
                this.descData = result.data.data;
            })
        },
        login: function(){
            this.$route.router.go({name: 'login'});
        },
        getShareInfo() {
            this.$http.post('', {
                act: 'share_getInfo',
                type: 'artcompete',
                id: this.$route.params.id
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
        goShow: function (id) {
            this.$route.router.go({
                name: 'duobao_show',
                params: {
                    id: this.id
                }
            });
        },
        missionAbort: function () {
            this.buying = 'off';
            document.body.style.overflow = 'visible';
            document.body.style.position = 'relative';
        }
    },
    events: {
        'inApp': function(){
            this.inApp = true;
        },
        'missionAbort': function () {
            this.buying = 'off';
            this.chooseAmount = false;
            document.body.style.overflow = 'visible';
            document.body.style.position = 'relative';
            this.getMainData();
        },
        'missionComplete': function () {
            this.buying = 'off';
            this.chooseAmount = false;
            document.body.style.overflow = 'visible';
            document.body.style.position = 'relative';
            this.getMainData();
        },
        'missionTruelyComplete': function () {
            this.buying = 'off';
            this.chooseAmount = false;
            this.paySuccess = true;
            document.body.style.overflow = 'visible';
            document.body.style.position = 'relative';
            this.getMainData();
        }
    }
}
</script>