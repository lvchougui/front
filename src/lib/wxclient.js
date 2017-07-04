import wx from 'weixin-js-sdk'
import consts from '../const'

var wxready = false;
var shareInfo = commonShareInfo;

// const commonShareInfo = {
//     title: '天工艺品', // 分享标题
//     desc: '融艺术于生活，铸手艺成品牌。', // 分享描述
//     link: consts.url, // 分享链接
//     imgUrl: 'http://cdn.tiangongyipin.com/app-logo.png', // 分享图标
//     success: function() {
//         // 用户确认分享后执行的回调函数
//     },
//     cancel: function() {
//         // 用户取消分享后执行的回调函数
//     }
// };

export function initWX(config, openDebug) {
    if (!config || !(config instanceof Object)) {
        return;
    }
    config.debug = openDebug;
    config.jsApiList = [
        'showOptionMenu',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone',
        'chooseWXPay',
        'chooseImage',
        'uploadImage',
        'downloadImage'
    ]

    wx.config(config);
    wx.ready(() => {
        log("===== wx.ready =====")
        wxready = true;
        configShare();
    });

    wx.error((result) => {
        log("===== wx.error =====")
        log(result);
    });
}

export function configShare(info) {
    if (info) {
        shareInfo = info instanceof Object ? info : commonShareInfo;
    }
    if (!wxready) {
        return;
    }
    // 配置分享信息
    log('==== 配置分享信息 =====');
    log(shareInfo);
    wx.onMenuShareTimeline(shareInfo);
    wx.onMenuShareAppMessage(shareInfo);
    wx.onMenuShareQQ(shareInfo);
    wx.onMenuShareWeibo(shareInfo);
    wx.onMenuShareQZone(shareInfo);
}

export function WXPay() {
    wx.chooseWXPay({
        timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        nonceStr: '', // 支付签名随机串，不长于 32 位
        package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
        paySign: '', // 支付签名
        success: function(res) {
            // 支付成功后的回调函数
        }
    });
}
