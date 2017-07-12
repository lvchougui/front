import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './app'
import $ from 'jquery'
import config from './appConfig'
import iview from 'iview/dist/iview.min'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import qrcode from './lib/jquery.qrcode.min.js';

Vue.use(VueAwesomeSwiper)
Vue.use(iview)
Vue.use(VueRouter)
Vue.use(VueResource)

import './assets/css/style.less'
import './assets/css/dimens.css'
import './assets/css/border.css'
import 'vux/dist/vux.css'
import './assets/css/vux-replace.css'
import './assets/css/material-icons.css'
import './assets/css/yipai-icons.less'
import 'iview/dist/styles/iview.css';

// 正式环境
if (config.env.active == config.env.prod) {
    Vue.http.options.root = 'http://apiv40.app.tiangongyipin.com';
} else {
    // 测试环境
    Vue.http.options.root = 'http://app.alpha.tiangongyipin.com';
}

Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
Vue.http.headers.common['X-Yipai-Key'] = 'c9da02a7b35c2bf0d98f818c0b85e914';

// Vue.http.options.emulateJSON=true;

import ReqHandler from './interceptors/interceptors'
ReqHandler(Vue);

import routerInit from './routers'
const router = new VueRouter({
	history: true,
	saveScrollPosition: false
});
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});
routerInit(router)

router.start(Vue.extend(App), '#app')
window.router = router
