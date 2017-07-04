<style type="text/css">
.vux-header {
    position: fixed !important;
    z-index: 1000;
    width: 100%;
}

.vux-header .vux-header-left {
    color: #fff !important;
}

.vux-header .vux-header-left a {
    color: #fff !important;
}

.vux-header .vux-header-left .vux-header-back:before {
    border: 1px solid #fff !important;
    border-width: 1px 0 0 1px !important;
}
</style>
<template>
    <div>
        <div v-bind:style="{ paddingTop: paddingTop + 'px' }">
            <router-view></router-view>
        </div>
        <loading :show="showLoading"></loading>
    </div>
</template>
<script>
import Vue from 'vue';
import VueBus from 'vue-bus';
import Loading from './components/loading';
import XHeader from 'vux/dist/components/x-header'

import AppConfig from './appConfig';

import helper from './lib/browser-helper';
import storage from './lib/storage-helper'
import stringUtils from './lib/string-utils'

import browserUtils from './lib/browser-helper'

import store from './vuex/store'

import browser from './lib/browser-helper'
import Confirm from 'vux/dist/components/confirm'
import Dialog from 'vux/dist/components/dialog'
// import wx from 'weixin-js-sdk'
import constants from './const'

import config from './appConfig'


export default {
    components: {
        Loading,
        XHeader
    },
    store,
    ready() {
        document.body.style.overflow = 'visible';
        let vm = this;
        Vue.http.interceptors.push((request, next) => {
            // log("===  showLoading  ===")
            vm.showLoading = true;
            next((response) => {
                // log("===  hideLoading  ===")
                vm.showLoading = false;
            })
        });
        
        Vue.use(VueBus);
    },
    data() {
        return {
            showLoading: false,
            back: false,
            prevent: false,
            platform: 'app',
            paddingTop: 0,
            shareInfo: {},
            showNavBar: true
        }
    },
    methods: {
        
        routeFilter() {
            var that = this;
            var router = this.$route.router;
            router.beforeEach(function({
                to,
                next
            }) {
                // log(to);
                // setTimeout(that.getWXConfig(),1500);
                if (to.path.match(/\/my/) || to.path.match(/\/pay/)) {
                    if (!isLogined(that, true)) {
                        return;
                    }
                }
                // 配置分享信息
                configShare(commonShareInfo);
                next();
            });
        },

        
    },
    events: {
        'onTitleChanged' (nav) {
            this.title = nav.title;
            this.back = nav.back || nav.back == undefined || false;
            this.prevent = nav.prevent;
        },
        'inApp' () {
            this.platform = 'app';
        },
        'hideNavBar' () {
            this.showNavBar = false
        }
    }
}
</script>
