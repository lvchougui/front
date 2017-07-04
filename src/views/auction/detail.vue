<template>
    <dialog class="deposit-dialog" :show.sync="bidConfirmDialog">
        <img src="../../assets/img/closed_btn.png" style="width:15px;height:15px;float: right;"  @click="bidConfirmDialog = false">
        <div class="dialog-content">
            <img src="../../assets/img/baozhenjin.png" style="width:50px;height:50px;">
            <div style="margin-top:10px;font-size:14px;">出价：¥{{willPayPrice}}</div>
            <div style="font-size:14px;">一锤定音 举手无悔</div>
            
            <div style="width:100%;height:40px;background-color:black;color:white;font-size:14px;text-align:center;line-height:40px;margin-top:15px;" @click="bidConfirm">确认</div>
        </div>
    </dialog>
    <dialog class="deposit-dialog" :show.sync="depositDialog">
        <img src="../../assets/img/closed_btn.png" style="width:15px;height:15px;float: right;"  @click="depositDialog = false">
        <div class="dialog-content">
            <img src="../../assets/img/baozhenjin.png" style="width:50px;height:50px;">
            <div style="margin-top:5px;font-weight:600;font-size:15px;color:black;">拍卖保证金</div>
            <div style="margin-top:10px;font-size:14px;">本场已缴纳：¥{{deposit.deposit}}</div>
            <div style="font-size:14px;">本场需补缴：<span style="color:#58bc9a;font-size:14px;">¥{{deposit.needdeposit}}</span></div>
            <div style="width:100%;height:1px;background-color:#e7e7e7;margin-top:10px;"></div>
            <div style="margin-top:15px;display:flex;flex-direction:row;width:100%;">
                <img src="../../assets/img/weixin.png" style="width:25px;height:25px;margin-left:10px;">
                <div style="flex:1;margin-left:15px;line-height:25px;text-align:left;font-size:14px;">微信支付</div>
                <input  type="radio"  checked style="width:15px;height:15px;margin-right:10px;margin-top: 5px;" />
            </div>
            <div style="width:100%;height:40px;background-color:black;color:white;font-size:14px;text-align:center;line-height:40px;margin-top:15px;" @click="donate">立即缴纳</div>
        </div>
    </dialog>
    <!-- <floatbtn></floatbtn> -->
    <img :src="data.cover" class="product-cover">
    <div style="display:flex;flex-direction:row;">
        <div class="label-text" style="font-weight:bold;flex:1;">竞拍信息</div>
        <div class="deposit-label" v-if="data.needDeposit&&data.needDeposit>0">¥ 保证金</div>
    </div>
    

    <div class="auction-prop" >
        <span class="prop-key">拍品</span>
        <span class="prop-value">{{data.name}}</span>
    </div>
    <div class="auction-prop">
        <div class="prop-key">起拍价</div>
        <div class="prop-value">¥{{data.initPrice}}</div>
    </div>
    <div class="auction-prop">
        <div class="prop-key">加幅价</div>
        <div class="prop-value">¥{{data.stepPrice}}</div>
    </div>
    <div class="auction-prop">
        <div class="prop-key">开拍时间</div>
        <div class="prop-value">{{data.openTime}}</div>
    </div>
    <div class="auction-prop">
        <div class="prop-key">结拍时间</div>
        <div class="prop-value">{{data.trueCloseTime}}</div>
    </div>

    <div class="label-text" style="font-weight:bold;">匠人故事</div>
    <div style="width:100%;height:auto;align-items:center">
        <img class="master-logo" :src="master.logo">
    </div>
    <div class="master-name">{{master.nickname}}</div>
    <div class="master-brand">{{master.brandName}}</div>
    <div class="divider"></div>
    <div class="product-desc">{{{data.desc}}}</div>
    <div class="divider"></div>
    <div class="label-text" style="font-weight:bold;">温馨提示</div>

    <div class="hint-list" v-for="item in hints">
        <div class="hint-item">
            <div style="font-size:12px;font-weight:bold;">{{item.key}}:</div>
            <div style="font-size:12px;color:#9fa0a0;margin-top:5px;">{{item.value}}</div>
        </div>
    </div>
    <div class="divider" style="margin-top:20px;"></div>
    <div style="margin-top:10px;align-items:center;font-weight:bold;font-size:14px;text-align:center;">客服电话</div>
    <div style="align-items:center;color:#58bc9a;margin-top:5px;margin-bottom:10px;font-size:13px;text-align:center;">400-820-8820</div>
    <div class="divider" style="margin-bottom:45px;"></div>


    <div class="auction-record-kai" v-if="showRecord==1" transition="fall">
        <div class="profile">
            <!-- <img :src="logo" class="logo" /> -->
            <div class="name" v-if="bidList&&bidList.length!=0">竞拍人：{{lastBidding.nickname}}</div>
            <div class="name" v-if="!bidList||bidList.length==0">竞拍人：暂无</div>
            <div class="my-bid">
                <div class="now">当前出价:</div>
                <div class="price" style="color:#58bc9a;">¥{{data.currentPrice}} 元</div>
            </div>
        </div>
        <div class="no-bid" v-if="!bidList||bidList.length==0">还没有人出价</div>
        <ul class="bid-list" :style="{height: bidHeight}" id="chatContainer">
            <li v-for="item in bidList" :class="{'bids': item.userid!=userid, 'my-bids': item.userid==userid}">
                <img :src="item.logo" />
                <div class="name">{{item.nickname}}</div>
                <div class="price">
                    <div class="triangle" style="color:#58bc9a;"></div>
                    出价 {{item.price}} 元
                </div>
            </li>
        </ul>
    </div>
    
    <!--拍卖中-->
    <div class="auction-bid-btm" v-if="data.status == 1">
        <div @click="triggleShowRecord" style="padding-left:25px;padding-right:15px;">现场</div> 
        <div style="flex-grow:1;display:flex;flex-direction:row;">
            <div @click="ninuxPrice" style="font-size:1.5em;padding-left:10px;padding-right:10px;"> - </div>
            <div style="flex-grow:1;text-align:center;">¥{{willPayPrice}}</div>
            <div @click="addPrice" style="font-size:1.5em;padding-left:10px;padding-right:10px;"> + </div>
        </div>
        <div @click="goOfferPrice" style="padding-left:15px;padding-right:25px;">出价</div> 
    </div>
    
    <!-- 预热中-->
    <div class="auction-btm" v-if="data.status == 2"  @click="remind">
        <div v-if="data.isRemind != 1">提醒我</div>
        <div v-if="data.isRemind == 1">已提醒</div>
    </div>
    <!-- 其他状态 -->
    <div class="auction-btm" v-if="data.status == 3 || data.status == 4" @click="triggleShowRecord">
        拍卖回放
    </div>
    <div class="remind-btn" v-if="data.isRemind!=1" @click="remind">
        <img src="../../assets/img/time_btn.png" style="width:15px;height:15px;">
        <div style="margin-left:5px;color:#58bc9a;font-size:12px;line-height:15px;">设置提醒</div>
    </div>
    <div class="cancel-remind-btn" v-if="data.isRemind==1" @click="cancelRemind">
        <img src="../../assets/img/time_btn.png" style="width:15px;height:15px;">
        <div style="margin-left:5px;color:#58bc9a;font-size:12px;line-height:15px;">取消提醒</div>
    </div>
    <toast :show.sync="showToast" type="text">{{toastMsg}}</toast>
    
</template>
<style>
    body{
        line-height: 1.6;
    }
    .deposit-dialog .weui_dialog{
        padding: 12px;
        width: 70%;
    }
    .dialog-content{
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }

    .btn_bid{
        height: 100%;
        text-align: center;
        color: white;
        font-size: 1.5em;
    }
    .product-cover{
        width: 100%;
        height: auto;
    }
    
    .auction-prop{
        flex-direction: row;
        margin-top: 10px;
        margin-left: 20px;
        margin-right: 20px;
    }
    
    .prop-key{
        font-size: 13px;
        width: 100px;
        color: #2f2f2f;
        display: inline-block;
        line-height: 1;
    }
    .prop-value{
        font-size: 13px;
        color: #9fa0a0;
        display: inline-block;
        line-height: 1;
    }

    .label-text{
        color: #000000;
        padding: 10px;
        font-size: 14px;
        font-weight: bold;
        margin: 10px;
    }
    
    .master-logo{
        display:flex;   
        width: 80px;
        height: 80px;
        justify-content:center;
        margin: 0 auto;
    }
    .master-name{
        padding: 5px;
        align-items: center;
        color: #2f2f2f;
        font-size:14px;
        margin-top: 5px;
        text-align: center;
    }
    .master-brand{
        align-items: center;
        color: #9fa0a0;
        font-size: 13px;
        margin-bottom: 20px;
        text-align: center;
    }
    .divider{
        width: 100%;
        height: 10px;
        background-color: #efefef;
    }
    .product-desc{
        padding: 10px;
        margin: 10px;
        height: auto;
    }
    .hint-list{
        margin-top: 0;
        margin-right: 10px;
        margin-left: 10px;
        margin-bottom: 0;
        padding: 10px;
        height: auto;
    }
    .auction-btm{
        background-color: black;
        text-align: center;
        font-size: 1.5em;
        color: white;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
    }
    .auction-bid-btm{
        background-color: black;
        font-size: 15px;
        color: white;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 44px;
        line-height: 44px;
        display: flex;
        flex-flow: row;
    }
    .deposit-label{
        border: 1px solid #58bc9a;
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 5px;
        padding-bottom: 5px;
        border-radius: 3px;
        color: #58bc9a;
        margin:16px;
    }
    .remind-btn{
        position: fixed;
        border-top: 1px solid #e7e7e7;
        border-bottom: 1px solid #e7e7e7;
        border-left: 1px solid #e7e7e7;
        border-bottom-left-radius: 25px;
        border-top-left-radius: 25px;
        background-color: white;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        flex-direction: row;
        padding-top: 8px;
        padding-bottom: 8px;
        bottom: 70px;
        right: 0;
        line-height: 1;
    }
    .cancel-remind-btn{
        position: fixed;
        border-top: 1px solid #e7e7e7;
        border-bottom: 1px solid #e7e7e7;
        border-left: 1px solid #e7e7e7;
        border-bottom-left-radius: 25px;
        border-top-left-radius: 25px;
        background-color: white;
        padding-left: 10px;
        padding-right: 10px;
        display: flex;
        flex-direction: row;
        padding-top: 8px;
        padding-bottom: 8px;
        bottom: 70px;
        right: 0;
        line-height: 1;
    }
</style>
<script>
    import floatbtn from '../../components/floatbtn'
    import Clocker from 'vux/dist/components/clocker'
    import Toast from 'vux/dist/components/toast'
    import constants from '../../const'
    import storage from '../../lib/storage-helper'
    import {
        isLogined
    }
    from '../../lib/auth'
    import browserUtils from '../../lib/browser-helper'
    import { configShare } from '../../lib/wxclient'
    import Dialog from 'vux/dist/components/dialog'
    import wx from 'weixin-js-sdk'
    export default {
        route: {
            data() {
                document.title = "拍品详情";
            }
        },
        components: {
            floatbtn,
            Clocker,
            Toast,
            configShare,
            Dialog,
            constants
        },
        ready: function() {


            this.id = this.$route.params.id;
            // 微信授权回传code
            this.code = this.$route.query.code;
            if (this.code) {
                this.getOpenId(this.code);
            }
            this.$dispatch.apply(this, ['onTitleChanged', {
                title: '拍品详情',
                back: true
            }]);
            if (window.userinfo) {
                this.logo = window.userinfo.logo;
                this.nickname = window.userinfo.nickname;
                this.userid = window.userinfo.userid;
            };
            this.getDefaultData();
            this.getBidList();
            this.bidHeight = window.innerHeight-160 + 'px';
            this.getShareInfo();

        },
        data: function() {
            return {
                code:'',
                id: '',
                data:{},
                master:{},
                hints:[],
                logo: '',
                nickname: '',
                userid: '',
                showRecord: 0,
                bidHeight: '',
                lastPrice: '',
                willPayPrice: '',
                alertTitle: '',
                timePoor: '',
                closeTime: '',
                bidList: [],
                bids: false,
                showToast: false,
                toastMsg: '',
                lastBidding:{},
                bidConfirmDialog:false,
                depositDialog:false,
                deposit:{}
            }
        },
        methods: {
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
                        // if (window.userinfo) {
                            var userinfo = storage.getUserInfo();
                            userinfo.wxopenid = result.data.wxopenid;
                            storage.saveUserInfo(userinfo);
                        // }else{
                        //     window.userinfo = {
                        //         wxopenid:result.data.wxunionid
                        //     };
                        //     log(window.userinfo);
                        //     storage.saveUserInfo(window.userinfo);
                        // }
                        
                    }

                });
            },

        //得到默认的数据
        getDefaultData: function() {
            this.$http.post('', {
                act: 'tgAuction_getAuctionInfo',
                id: this.$route.params.id,
            }).then((result) => {
                this.data = result.data.data;
                this.master = this.data.userId;
                this.hints = this.data.hints;
                this.willPayPrice = parseInt(this.data.currentPrice) + this.data.stepPrice;
                if (this.data.needDeposit>0) {
                    this.$route.router.go({
                        name: 'auctionDeposit_item',
                        query: {
                            r:1,
                            aid:this.$route.params.id
                        }
                        // params: {
                        //     id: this.$route.params.id
                        // }
                    });
                }
                
            });

        },

        triggleShowRecord: function() {
            if (this.showRecord == 0) {
                this.showRecord = 1;
                document.body.style.overflow = 'hidden';
                setTimeout(function(){
                    var container = document.getElementById("chatContainer");
                    log(container);
                    if (container) {
                        container.scrollTop = container.scrollHeight;
                    }
                },500);
            } else if (this.showRecord == 1) {
                this.showRecord = 0;
                document.body.style.overflow = 'visible';
            }
        },


        getBidList() {
            this.$http.post('', {
                act: 'bids_getBidsList',
                aid: this.$route.params.id
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    this.bidList = result.data.datalist.reverse();
                    if (this.bidList&&this.bidList.length>0) {
                        this.lastBidding = this.bidList[this.bidList.length-1];
                    }

                }
            })
        },

        //减价
        ninuxPrice: function() {
            var minPrice;
            if(this.data.currentPrice != 0){
                minPrice = parseInt(this.data.currentPrice)
            } else {
                minPrice = parseInt(this.data.initPrice)
            }
            if (parseInt(this.willPayPrice) <= minPrice) {
                this.toastMsg = "不能低于当前价";
                this.showToast = true;
            } else {
                this.willPayPrice = parseInt(this.willPayPrice) - parseInt(this.data.stepPrice);
            }
        },
        //加价
        addPrice: function() {
            //加价之后刷新界面
            this.willPayPrice = parseInt(this.willPayPrice) + parseInt(this.data.stepPrice);
        },

        //出价按钮
        goOfferPrice: function() {
            // this.depositDialog = true;
            // log(this.depositDialog);
            if (!isLogined(this)) {
                return;
            };
            
            if (this.showRecord == 0) {
                this.showRecord = 1;
                document.body.style.overflow = 'hidden';
                setTimeout(function(){
                    var container = document.getElementById("chatContainer");
                    log(container);
                    if (container) {
                        container.scrollTop = container.scrollHeight;
                    }
                },500);
            } 

            this.bidConfirmDialog = true;
            return;
            
        },
        bidConfirm:function(){
            this.bidConfirmDialog = false;
            this.$http.post('', {
                act: 'bids_addByDeposit',
                aid: this.$route.params.id,
                price: this.willPayPrice,
            }).then((result) => {
                if (result.data.code == 952) {
                    this.deposit = result.data.data;
                    if (!storage.getUserInfo() || !storage.getUserInfo().wxopenid) {
                        var state = '123';
                        var path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + constants.tgyp.appid +'&redirect_uri=' + constants.redirect_deposit_uri + this.id+ '&response_type=code&scope=snsapi_base&state=' + state + '#wechat_redirect';
                        window.location = path;
                        return;
                    }
                    this.depositDialog = true;
                }else{
                    this.toastMsg = result.data.message;
                    this.showToast = true;
                    this.getDefaultData();
                    this.getBidList();
                    this.willPayPrice = this.willPayPrice + this.data.stepPrice;
                }
            })
        },
        //提醒
        remind: function() {
            if (!isLogined(this)) {
                return;
            }
            this.$http.post('', {
                act: 'remind_addRemind',
                aucid: this.$route.params.id
            }).then((result) => {
                if (result.data.code == 200) {
                    this.toastMsg = "设置提醒成功";
                    this.showToast = true;
                    this.data.isRemind = 1;
                }
            })

        },

        cancelRemind:function(){
            if (!isLogined(this)) {
                return;
            }
            this.$http.post('', {
                act: 'remind_remove',
                artworkid: this.$route.params.id
            }).then((result) => {
                if (result.data.code == 200) {
                    this.data.isRemind = 0;
                }
            })
        },

        donate:function(){
            var h5_obj = {
                act: 'bids_buy',
                paytype: 'h5wxpay',
                id:this.data.stageid,
                amount:this.deposit.needdeposit,
                openid: storage.getUserInfo().wxopenid,
            };

            this.$http.post('', h5_obj).then((result) => {
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
                            setTimeout(function() {
                                this.toastMsg = "缴纳成功";
                                this.showToast = true;
                                this.depositDialog = false;
                            }, 2000)
                        }
                    };
                    wx.chooseWXPay(obj);
                }else {
                    this.toastMsg = result.data.message;
                    this.showToast = true;
                }
            });
        },

        getShareInfo() {
            this.$http.post('', {
                act: 'share_getInfo',
                type: 'artwork',
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
                    // alert(JSON.stringify(shareInfo));
                    configShare(shareInfo);
                }
            })
        }
        
    },
}
</script>

