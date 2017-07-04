import browser from './browser-helper'
import storage from './storage-helper'

export function isLogined(vm, replace) {
    log('检查登录')
    window.userinfo = storage.getUserInfo();
    var logined = window.userinfo && window.userinfo.token;

    if (logined) {
        return logined;
    }
    if (vm == undefined) {
        return;
    }
    if (browser.versions().weixin) {
    	log(vm.$route);
        var pre_login_url = vm.$route.path;
        storage.savePreLoginUrl(pre_login_url);

        if (replace) {
            vm.$route.router.replace('/login');
        } else {
            vm.$route.router.go('/login');
        }
    } else if (typeof(JsBridge) != 'undefined') {
        window.location.href = "yipai://com.tiangong.yipai/login";
    } else {
        var pre_login_url = vm.$route.router.path;
        storage.savePreLoginUrl(pre_login_url);
        if (replace) {
            vm.$route.router.replace('/login');
        } else {
            vm.$route.router.go('/login');
        }
    }
}

