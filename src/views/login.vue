<template>
    <div style="margin-bottom:70px;">
        <div v-if="loginStep == 'login'">
            <div style="margin-top:40px">
                <x-input name="phone" placeholder="请输入手机号" is-type="china-mobile" :value.sync="loginData.phone" class="login-input"></x-input>
                <x-input name="password" placeholder="请输入密码" type="password" :value.sync="loginData.pwd" class="login-input"></x-input>
            </div>
            <div style="margin-top:10px;margin-bottom:10px;margin-left:20px;margin-right:20px;">
                <p class="login-prompt" @click="forgetpassword">忘记密码？</p>
            </div>
            <div style="margin-left:20px;margin-right:20px;">
                <button @click="login" type="primary" class="login-btn">登录</button>
            </div>
            <div>
            </div>
            <div class="float-btns" v-if="loginStep == 'login'">
                <button @click="wxlogin" type="primary" class="wx-login">微信登录</button>
                <div class="login-verticle-line"></div>
                <button @click="toRegister" type="primary" class="user-register">用户注册</button>
            </div>
            <toast :show.sync="wrongPhone" type="cancel">手机号码错误</toast>
            <toast :show.sync="wrongPassword" type="cancel">密码错误</toast>
            <toast :show.sync="loginFailed" type="cancel">登录失败</toast>
            <toast :show.sync="registerFailed" type="cancel">注册失败</toast>
            <toast :show.sync="registerSuccess">注册成功</toast>
            <toast :show.sync="modifySuccess">修改密码成功</toast>
            <toast :show.sync="getCaptchaSuccess" type="text">验证码已发送</toast>
            <toast :show.sync="captchaIsNull" type="text">请输入验证码</toast>
            <toast :show.sync="captchaIsNull" type="text">请输入验证码</toast>
            <toast :show.sync="login_toast" type="text">请稍候</toast>
</template>
<script>
import Group from 'vux/dist/components/group'
import Cell from 'vux/dist/components/cell'
import XInput from 'vux/dist/components/x-input'
import XButton from 'vux/dist/components/x-button'
import Toast from 'vux/dist/components/toast'
import Tab from 'vux/dist/components/tab'
import TabItem from 'vux/dist/components/tab-item'
import Box from 'vux/dist/components/box'

import storage from '../lib/storage-helper'
import browserUtils from '../lib/browser-helper'
import helper from '../lib/browser-helper';
import constants from '../const'

export default {
    route: {
        data() {
            document.title = "登录";
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        XButton,
        Toast,
        Tab,
        TabItem,
        Box,
        browserUtils,
        helper,
    },
    data() {
        return {
            tab: 1,
            registerData: {},
            loginData: {},
            forgetData: {},
            wrongPhone: false,
            wrongPassword: false,
            loginFailed: false,
            registerFailed: false,
            registerSuccess: false,
            getCaptchaSuccess: false,
            captchaIsNull: false,
            modifySuccess: false,
            toast_tips: '',
            login_toast: false,
            loginStep: 'login', //默认为登录步骤
        }
    },
    ready() {
        this.$dispatch.apply(this, ['onTitleChanged', {
            title: '登录',
            back: true
        }])

        // this.loginStep = 'forget';
        log(this.loginStep);

        // 微信授权回传code
        var code = this.$route.query.code;
        // alert('query:' + JSON.stringify(this.$route.query));

        if (code) {
            this.getOpenId(code);
        }
    },

    methods: {
        getOpenId(code) {
            this.toast_tips = '请稍候';
            this.login_toast = true;
            this.$http.post('', {
                act: 'wchat_getOpenid',
                app: 'mp_tgyp',
                code: code
            }).then((resp) => {

                var result = resp.data;

                if (result && result.code == 200) {
                    // 用openid去登录
                    this.getUserInfo(code);
                }
            });
        },
        getCaptcha() {
            var captchaType;
            if (this.loginStep == 'register') {
                captchaType = 1; //注册
            } else if (this.loginStep == 'forget') {
                captchaType = 2; //忘记密码
            } else {
                captchaType = 3; //交纳保证金余额支付/解绑、绑定手机和微信
            };
            this.$http.post('', {
                act: 'captcha_getCaptcha',
                phone: this.registerData.phone,
                type: captchaType
            }).then((result) => {
                log(result.data.code);
                if (result.data.code == 200) {
                    log("发送成功");
                    this.getCaptchaSuccess = true;
                } else {
                    var failMsg = result.data.message;
                    log(failMsg);
                    if (failMsg != undefined) {
                        alert(failMsg);
                    } else {
                        alert("获取验证码失败，请稍后再试");
                    }
                };
            });
        },
        modify() {
            if (this.forgetData.captcha == undefined || this.forgetData.captcha == '') {
                this.captchaIsNull = true;
                return;
            };
            this.$http.post('', {
                act: 'user_modifyPass',
                phone: this.forgetData.phone,
                pwd: this.forgetData.pwd,
                captcha: this.forgetData.captcha,
            }).then((result) => {
                log(result);
                if (result.data.code == 200) {
                    this.modifySuccess = true;
                    this.loginStep = "login";
                } else {
                    var failMsg = result.data.message;
                    if (failMsg != undefined) {
                        alert(failMsg);
                    } else {
                        alert("获取验证码失败，请稍后再试");
                    }
                };
            });
        },
        register() {
            if (this.registerData.captcha == undefined || this.registerData.captcha == '') {
                this.captchaIsNull = true;
                return;
            };
            this.$http.post('', {
                act: 'user_register',
                phone: this.registerData.phone,
                pwd: this.registerData.pwd,
                captcha: this.registerData.captcha,
            }).then((result) => {
                if (result.data.code == 200) {
                    this.registerSuccess = true;
                    // this.tab = 2;
                    this.loginStep = "login";
                } else if (result.data.code == 231) {
                    this.wrongPhone = true;
                } else if (result.data.code == 232) {
                    this.wrongPassword = true;
                } else {
                    this.registerFailed = true;
                }
            })
        },
        login() {
            this.$http.post('', {
                act: 'user_login',
                phone: this.loginData.phone,
                pwd: this.loginData.pwd,
                uniquecode: 'o'
            }).then((result) => {
                var resp = result.data;
                if (resp.code == 200) {
                    window.userinfo = resp.data;
                    storage.saveUserInfo(window.userinfo);
                    window.history.back();
                } else if (resp.code == 231) {
                    this.wrongPhone = true;
                } else if (resp.code == 232) {
                    this.wrongPassword = true;
                } else {
                    var failMsg = result.data.message;
                    if (failMsg != undefined) {
                        alert(failMsg);
                    } else {
                        this.loginFailed = true;
                    }
                }
            })
        },
        // 微信登录
        wxlogin() {
            log("微信登录");
            window.location = this.getAuthUrl();
        },

        toRegister() {
            this.$route.router.go({
                name: 'register'
            });
        },
        forgetpassword() {
            this.$route.router.go({
                name: 'forgetpassword'
            });
        },
        getAuthUrl(path) {
            // alert(path);
            return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + constants.tgyp.appid +
                '&redirect_uri=' + constants.redirect_uri_login +
                '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
        },

        // 根据code 获取微信的userinfo (sns_userinfo)
        getUserInfo(code) {
            log('获取用户信息');
            this.$http.post('', {
                act: 'wchat_getWxUser',
                app: 'mp_tgyp',
                code: code
            }).then((result) => {
                var resp = result.data;
                if (resp && resp.code == 200 && resp.data.wxopenid) {
                    var userinfo = resp.data;
                    window.userinfo = userinfo;
                    storage.saveUserInfo(userinfo);
                    this.loginWithOpenId();
                } else {
                    this.loginFailed = true;
                }
            });
        },

        // 用unionID登录获取用户信息
        loginWithOpenId() {

            var that = this;

            this.$http.post('', {
                act: 'wchat_login',
                app: 'mp_tgyp',
                wxunionid: window.userinfo.wxunionid
            }).then((result) => {
                this.toast_tips = ''
                this.login_toast = false;
                var resp = result.data;

                // 登录成功
                if (resp && resp.code == 200) {

                    var data = resp.data;
                    data.wxopenid = window.userinfo.wxopenid;
                    window.userinfo = data;
                    log(window.userinfo);
                    storage.saveUserInfo(window.userinfo);


                    var url = storage.getPreLoginUrl();
                    if (url) {
                        this.$route.router.go({
                            path: url
                        })
                    } else {
                        this.$route.router.go({
                            name: 'home'
                        });
                    }
                }
                // 微信会员不存在
                else if (resp && resp.code == 674) {
                    // 去绑定手机页
                    this.$route.router.go({
                        name: 'bind_phone'
                    });
                }
            });
        },
    }
}
</script>
<style scoped>
.login-box {
    margin: 16px;
    background-color: #fafafa;
    border: 1px solid rgb(220, 220, 220);
    border-radius: 6px;
    overflow: hidden;
}

.login-input {
    height: 20px;
    font-size: 14px;
    border: 0.5px solid #888888;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
}

.login-btn {
    width: 100%;
    border: none;
    height: 43px;
    line-height: 43px;
    font-size: 15px;
    color: #FFFFFF;
    background-color: black;
    font-family: "SimSun";
}

.login-prompt {
    margin-left: auto;
    text-align: right;
    width: 70px;
    font-size: 13px;
    /*font-family: "PingFang SC";*/
    font-family: "SimSun";
    color: #58BC9A;
}

.float-btns {
    position: fixed;
    bottom: 0px;
    z-index: 9999999;
    width: 100%;
    height: 70px;
    flex-direction: row;
    display: flex;
    background-color: white;
}

.wx-login {
    /*margin-right: 50%;*/
    padding-right: 10px;
    width: 49%;
    height: 50px;
    text-align: right;
    color: #58BC9A;
    font-size: 14px;
    background-color: white;
    border: none;
    font-family: "SimSun";
}

.user-register {
    /*margin-left: 50%;*/
    padding-left: 10px;
    width: 49%;
    height: 50px;
    text-align: left;
    color: #58BC9A;
    font-size: 14px;
    background-color: white;
    border: none;
    font-family: "SimSun";
}

.login-verticle-line {
    height: 20px;
    width: 1px;
    margin-top: 15px;
    margin-bottom: 5px;
    background-color: #58BC9A;
}

.captcha_item {
    margin-top: 20px;
    flex-direction: row;
    display: flex;
}

.captcha_input {
    width: 60%;
    margin-left: 10px;
    height: 20px;
    border: 0.5px solid #888888;
    font-size: 14px;
}

.captcha_btn {
    margin-left: 10px;
    margin-right: 10px;
    width: 40%;
    height: 43px;
    color: white;
    background-color: #58BC9A;
    font-family: "SimSun";
    /*border: 1px solid rgb(220, 220, 220);*/
}
</style>
