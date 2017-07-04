<style type="text/css">
.weui_cells_title {
    height: 30px;
    line-height: 30px;
}

.captcha-btn {
    height: 30px !important;
    line-height: 30px !important;
}

.bind-btn {
    width: 100%;
    background-color: #58bc9a;
    text-align: center;
    border: 1px solid #58bc9a;
    color: #ffffff;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
}

.binding-input {
    font-size: 12px;
}
</style>
<template>
    <div class="db-phone-section">
        <group title="绑定手机号" class="weui_cells_form">
            <x-input placeholder="手机号" keyboard="number" is-type="china-mobile" :value.sync="phone" required class="binding-input">
            </x-input>
            <x-input placeholder="验证码" :value.sync="captcha" class="binding-input">
                <x-button id="captcha-btn" class="captcha-btn" slot="right" mini :disabled="disable" @click="getCaptcha">发送验证码</x-button>
            </x-input>
        </group>
        <div style="padding:16px;">
            <div class="bind-btn" @click="bindPhone">绑 定</div>
        </div>
    </div>
    <toast :show.sync="toast" type="text" width="12em">{{tips}}</toast>
</template>
<script>
import Group from 'vux/dist/components/group'
import Cell from 'vux/dist/components/cell'
import XInput from 'vux/dist/components/x-input'
import XButton from 'vux/dist/components/x-button'
import Toast from 'vux/dist/components/toast'
import storage from '../../lib/storage-helper'

export default {
    route: {
        data() {
            document.title = "绑定手机号"
        }
    },
    components: {
        Group,
        Cell,
        XInput,
        XButton,
        Toast
    },
    ready() {},
    methods: {
        validate() {
            if (this.phone == '') {
                this.tips = "请输入正确的手机号";
                this.toast = true;
                return false;
            }
            if (this.captcha == '') {
                this.tips = "请输入验证码";
                this.toast = true;
                return false;
            }
            return true;
        },
        showToast(tips) {
            this.tips = tips;
            this.toast = true
        },
        bindPhone() {
            if (!this.validate()) {
                return;
            }

            var userinfo = window.userinfo;
            log(userinfo)
            if (userinfo == undefined) {
                return;
            }

            this.$http.post('', {
                act: 'wchat_register',
                // wxopenid:userinfo.wxunionid,
                wxopenid: userinfo.wxunionid,
                phone: this.phone,
                captcha: this.captcha,
                nickname: userinfo.nickname,
                logo: userinfo.logo
            }).then((result) => {
                var resp = result.data;
                log(resp);
                if (resp.code != 200) {
                    this.showToast(resp.message);
                    return;
                }
                var user = resp.data;
                // 接口返回的wxopenid 实际是微信的unionid
                user.wxunionid = user.wxopenid;
                user.wxopenid = userinfo.wxopenid;

                window.userinfo = user;

                storage.saveUserInfo(window.userinfo);
                this.showToast('账号绑定成功~');

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

            }, (error) => {
                this.showToast('账号绑定失败,请重试~');
            })
        },

        getCaptcha() {
            log(this.phone);
            if (this.phone == '') {
                this.tips = "请输入正确的手机号";
                this.toast = true;
                return;
            }

            this.countdown();

            this.$http.post('', {
                act: 'captcha_getCaptcha',
                phone: this.phone,
                type: 3 // bind
            }).then((result) => {
                log(result.data);
            });
        },
        countdown() {

            var count = 60;
            this.disable = true;
            var that = this;

            function countdown() {
                count--;
                if (count == 0) {

                    document.getElementById('captcha-btn').innerHTML = "重新发送";
                    that.disable = false;
                    return;
                }

                document.getElementById('captcha-btn').innerHTML = "重新发送(" + count + "s)";
                setTimeout(() => {
                    countdown();
                }, 1000);
            }

            countdown();
        }
    },
    data() {
        return {
            phone: '',
            captcha: '',
            tips: '',
            disable: false,
            toast: false
        };
    }
}
</script>
