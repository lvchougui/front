var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var request = require('request')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ? require('./webpack.prod.conf') : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
  // Define HTTP proxies to your custom API backend
  // https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
  // force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function(context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

var appConfig = {
  tgyp: {
    appid: 'wx6be2062020b39d3e',
    secret: '2285e200005ccb7678633b126a1b8280'
  },
  yipaiquan: {
    appid: 'wxd0cdf72977282962',
    secret: 'bbd8d21bb0744338c89cc84811b2756e'
  }
}

var crypto = require('crypto')
var stringUtils = require('./string-utils')

// 公众号获取微信用户信息
// 1.客户端
app.get('/snsapi_userinfo', function(req, res, next) {

  // 第一步：用户同意授权，获取code
  // 客户端
  // 第三步：刷新access_token（如果需要）

  // 第四步：拉取用户信息(需scope为 snsapi_userinfo)
  // access_token:网页授权接口调用凭证,注意：此access_token与基础支持的access_token不同
  // openid:用户的唯一标识
  function getUserInfo(access_token, openid) {
    var snsapi_userinfo_url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN';

    request.get(snsapi_userinfo_url,(error, response, body)=>{

    })
    return {
      "openid": "OPENID",
      "nickname": "NICKNAME",
      "sex": "1",
      "province": "PROVINCE",
      "city": "CITY",
      "country": "COUNTRY",
      "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/46",
      "privilege": ["PRIVILEGE1", "PRIVILEGE2"],
      "unionid": "o6_bmasdasdsad6_2sgVt7hMZOPfL"
    }
  }
});

// 获取微信配置
app.get('/wx_config', function(req, res, next) {

  const appId = appConfig.tgyp.appid;

  getAccessToken();

  // 获取access_token
  function getAccessToken() {
    var access_token_url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appId + '&secret=' + appConfig.tgyp.secret;
    request.get(access_token_url, (error, response, body) => {
      console.log(body);
      getTicket(JSON.parse(body).access_token);
    })
  }

  // 获取jsapi_ticket
  function getTicket(access_token) {
    var jsapi_ticket_url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_token + '&type=jsapi'
    console.log(jsapi_ticket_url);
    request.get(jsapi_ticket_url, (error, response, body) => {
      body = JSON.parse(body);
      sign(body.ticket);
    })
  }

  // 签名
  function sign(ticket) {

    var timestamp = parseInt(new Date().getTime() / 1000) + '';

    var params = {
      jsapi_ticket: ticket,
      noncestr: stringUtils.createRandom(16),
      timestamp: timestamp,
      url: 'http://m.yipaiquan.com'
    }

    var str = stringUtils.sortKeysAndConcat(params);
    console.log(str);

    var sha1 = crypto.createHash('sha1');
    sha1.update(str);
    params.signature = sha1.digest('hex');

    console.log(params);

    var config = {
      appId: appId,
      timestamp: params.timestamp,
      nonceStr: params.noncestr,
      signature: params.signature,
    }

    res.json(config);
  }

});

// serve pure static assets
var staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
