export default {
    save(key, value) {
      localStorage[key] = JSON.stringify(value);
    },
    get(key) {
        return localStorage[key];
    },
    getAsObject(key) {
        var value = localStorage[key];
        return value == undefined ? undefined : JSON.parse(value);
    },
    saveToken(token) {
        localStorage["token"] = token;
    },
    getToken() {
        return localStorage['token'];
    },
    saveOrderId(orderId) {
        localStorage["orderId"] = orderId;
    },
    getOrderId() {
        return localStorage['orderId'];
    },
    saveUserInfo(value) {
        localStorage['userinfo'] = JSON.stringify(value);
    },
    getUserInfo() {
        var value = localStorage['userinfo'];
        if (!value || value == '' || value == 'null' || value == 'undefined') {
            return null;
        }
        return JSON.parse(value);
    },
    clearUserInfo(){
        localStorage['userinfo'] = undefined;
    },
    savePreLoginUrl(url){
        localStorage['pre_login_url'] = url;
    },
    getPreLoginUrl(){
        return localStorage['pre_login_url'] ;
    },
    clearPreLoginUrl(){
        localStorage['pre_login_url'] = undefined;
    }
}
