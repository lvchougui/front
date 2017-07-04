<template>
    <div style="background-color: #89a87e;">
        <img src="http://cdn.tiangongyipin.com/2017tea/2-1.png" class="tea-img">
        <div class="tea-content">
            <div class="tea-content-text">红包已经放入您的账号：{{phone}} 中</div>
            <div class="tea-content-text">请在您的个人账户中查询</div>
        </div>
        <img src="http://cdn.tiangongyipin.com/2017tea/2-2.png" class="tea-img">
        <div class="soon-use-btn" @click="useNow">立即使用</div>
        <img src="http://cdn.tiangongyipin.com/2017tea/2-3.jpg" class="tea-img">

    </div>
</template>
<style type="text/css">
.tea-img {
    width: 100%;
}

.tea-content {
    color: #e1ebe0;
}

.tea-content-text {
    text-align: center;
    line-height: 2;
}

.soon-use-btn {
    margin-left: 50px;
    margin-right: 50px;
    line-height: 40px;
    border-radius: 20px;
    color: #5d7b28;
    background-color: #e1ebe0;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 1.5em;
}
</style>
<script>
import {
    isLogined
}
from '../../lib/auth'

export default {
    ready: function() {
        this.$dispatch.apply(this, ['onTitleChanged', {
            title: '茶礼',
            back: true
        }]);
        if (!isLogined(this)) {
            return;
        };
        if (window.userinfo) {
            this.phone = window.userinfo.phone;
            log(this.phone);
        }
    },
    route: {
        data() {
            document.title = "茶礼";
        }
    },
    data() {
        return {
            'phone': ''
        }
    },
    methods: {
        useNow: function() {
            if (typeof(JsBridge) != 'undefined') {
                JsBridge.close();
                return;
            };
            this.$route.router.go({
                name: 'home'
            });
        }
    },
}
</script>
