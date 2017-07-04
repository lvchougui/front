<template>
    <div style="background-color: #e1ebe0;">
        <img src="../../assets/img/popular/register1.png" class="tea-img">
        
        <div class="register-content">
            <img src="../../assets/img/popular/register3.png" class="tea-img">
            <div class="register-input-group">
                <div class="register-input" style="margin-top:15px;">
                    <img class="register-icon" src="../../assets/img/popular/shouji.png">
                    <input class="register-input-box" v-model="phone" type="number" name="phone" placeholder="输入手机号">
                </div>
                <div class="auth-code">
                    <div class="auth-code-input">
                        <img class="register-icon" src="../../assets/img/popular/yanzhengma.png">
                        <input class="register-input-box" v-model="authcode" style="width:80px;" type="number" name="authcode" placeholder="输入验证码">
                    </div>
                    <div class="auth-code-btn"  @click="getCaptcha" v-if="!isSend">验证码</div>
                    <div class="auth-code-btn-send" v-if="isSend">{{timer}}s后重发</div>
                </div>
                <div class="register-input" style="margin-top:10px;">
                    <img class="register-icon" src="../../assets/img/popular/mima.png">
                    <input class="register-input-box" v-model="password" type="text" name="password" placeholder="输入密码">
                </div>
                <div class="soon-register-btn" @click="register">立即注册</div>
            </div>
        </div>
        <img src="http://cdn.tiangongyipin.com/2017tea/3-3.png" class="tea-img" style="width: 95%; margin: 0 auto;">
        <img src="http://cdn.tiangongyipin.com/2017tea/3-4.png" class="tea-img" style="width: 95%; margin: 0 auto;">
        <img src="http://cdn.tiangongyipin.com/2017tea/3-5.png" class="tea-img" style="width: 95%; margin: 0 auto;">
        <img src="http://cdn.tiangongyipin.com/2017tea/3-6.png" class="tea-img" style="width: 95%; margin: 0 auto;">
    </div>
    <div class="register-alert" v-if="isAlert">
        <a href="http://wxx.tiangongyipin.com/appdownload.php" target="_blank" style="color: #5d7b28;">注册成功，去领取好礼>></a>
    </div>
    <toast :show.sync="wrongPhone" type="cancel">手机号码错误</toast>
    <toast :show.sync="registerSuccess">注册成功，快去领取好礼</toast>
    <toast :show.sync="toast" type="text" width="12em">{{tips}}</toast>
</template>

<style type="text/css">
    .register-alert{
        padding-top: 20px;
        padding-bottom: 20px;
        width: 100%;
        text-align: center;
        position: fixed;
        bottom: 0;
        background-color: #58bc9a;
        border:1px solid #e1ebe0;
        
        font-size: 1.4em;
    }
    .tea-img{
        width: 100%;
        display: block;
    }
    .register-content{
        display: flex;
        flex-direction: column;
        margin-top: -8px;
        position: relative;
    }

    .register-input{
        display: flex;
        flex-direction: row;
        margin-left: 50px;
        margin-right: 50px;
        line-height: 35px;
        height: 35px;
        border-radius: 20px;
        padding-left: 15px;
        padding-right: 15px;
        background-color: #e1ebe0;
        align-items: center;
    }
    .auth-code-input{
        flex: 1;
        display: flex;
        flex-direction: row;
        line-height: 35px;
        height: 35px;
        border-radius: 20px;
        padding-left: 15px;
        padding-right: 15px;
        background-color: #e1ebe0;
        align-items: center;
    }
    .auth-code{
        display: flex;
        flex-direction: row;
        margin-left: 50px;
        margin-right: 50px;
        height: 35px;
        margin-top: 10px;
    }
    .register-input-group{
        width: 100%;
        position: absolute;
        top: 0;
    }

    .register-icon{
        width: 12px;
        height: 12.5px;
        line-height: 35px;
    }
    .register-input-box{
        background-color: transparent;
        border:none;
        padding-left: 10px;
        height: 100%;
        flex: 1;
        color: #5d7b28;
        outline:none;
    }

    .register-input-box::-webkit-input-placeholder { 
        color: #5d7b28; text-overflow: ellipsis; 
    } 
    .register-input-box:-moz-placeholder { 
        color: #5d7b28 !important; text-overflow: ellipsis; 
    } 
    .register-input-box::-moz-placeholder { 
        color: #5d7b28 !important; text-overflow: ellipsis; 
    } /* for the future */ 
    .register-input-box:-ms-input-placeholder { 
        color: #5d7b28 !important; text-overflow: ellipsis; 
    } 

    .soon-register-btn{
        margin-left: 50px;
        margin-right: 50px;
        line-height: 35px;
        border-radius: 20px;
        color: #e1ebe0;
        background-color: #5d7b28;
        text-align: center;
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 1.3em;
    }

    .auth-code-btn{
        line-height: 35px;
        border-radius: 20px;
        padding-left: 15px;
        padding-right: 15px;
        color: #e1ebe0;
        background-color: #5d7b28;
        text-align: center;
        font-size: 1.2em;
        margin-left: 10px;
    }
    .auth-code-btn-send{
        line-height: 35px;
        border-radius: 20px;
        padding-left: 15px;
        padding-right: 15px;
        color: white;
        background-color: grey;
        text-align: center;
        font-size: 1.2em;
        margin-left: 10px;
    }
</style>

<script>
    import Toast from 'vux/dist/components/toast'

    export default {
        components: {
           Toast,
       },
       ready:function(){
        this.$dispatch.apply(this,['onTitleChanged',{title:'注册有礼',back:true}]);
        this.uid = this.$route.query.uid;
    },
    route:{
        data(){
            document.title = "注册有礼";
        }
    },
    data() {
        return {
            uid:'',
            phone:'',
            authcode:'',
            password:'',
            isAlert:false,
            registerSuccess:false,
            wrongPhone:false,
            isSend:false,
            authText:'',
            timer:60,
            toast:false,
            tips:'',
            Interval:null
        }
    },
    methods: {
        getCaptcha () {
            var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
            if(this.phone.length==0||this.phone.length!=11||!myreg.test(this.phone)) { 
                this.wrongPhone = true;
                return;
            }
            
            this.wrongPhone = false;
            this.$http.post('',{
                act:'captcha_getCaptcha',
                phone:this.phone,
                type: 1
            }).then((result)=>{
                log(result);
                if (result.data.code!=200) {
                    this.tips = result.data.message;
                    this.toast = true;
                }else{
                    this.startTimer();
                    this.isSend = true;
                }
            });
        },
        update () {
            if(this.timer <= 0) 
            {
                this.timer = 60;
                this.isSend = false;
                clearInterval(this.Interval);
            }
            else{
                this.timer--;
            }
        },
        startTimer () {
            this.Interval = setInterval(this.update,1000);    
        },
        register: function () {
            // this.isAlert = true;
            // this.registerSuccess = true;
            // this.isAlert = true;
            this.$http.post('', {
                act: 'user_recommendregister',
                phone: this.phone,
                pwd: this.password,
                captcha: this.authcode,
                uid:this.uid
            }).then((result) => {
                log(result);
                if (result.data.code == 200) {
                    this.registerSuccess = true;
                    this.isAlert = true;
                } else if (result.data.code == 231) {
                    this.wrongPhone = true;
                } else{
                    this.tips = result.data.message;
                    this.toast = true;
                }
            })
        },
    },
}

</script>
