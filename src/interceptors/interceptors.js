import storage from '../lib/storage-helper'

export default function ReqHandler(Vue) {
    Vue.http.interceptors.push((request, next) => {

        if (request.method == 'get') {
            next();
            return;
        }

        let originBody = request.body

        request.body = "data=" + JSON.stringify(originBody);
        var user = window.userinfo;
        if (user && user.token) {
            request.body += "&token=" + user.token;
        }
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

        next((resp) => {

            // 无响应
            if (!resp) {

            }
            // 
            if (!resp.data) {

            }

            // log(typeof(resp.data));
            if (typeof(resp.data) == 'string') {
                resp.data = JSON.parse(resp.data);
            }

            // token失效
            if (resp.data.code == 600) {

                storage.clearUserInfo();
                window.userinfo = undefined;
                setTimeout(window.router.go('/login'), 500);
                
            }

        });
    })
}
