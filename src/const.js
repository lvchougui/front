export default {
	url:'http://h5.tiangongyipin.com',
	tgyp: {
		appid: 'wx198ee48c005742d4',
	},
	yipaiquan: {
		appid: 'wxd0cdf72977282962',
	},
	yipaiseller: {
		appid: 'wx121a8ca2e6f44e9c',
	},
	redirect_uri: 'http%3A%2F%2Fh5.tiangongyipin.com%2Forder%2Fpay%2F',
	redirect_deposit_uri: 'http%3A%2F%2Fh5.tiangongyipin.com%2Forder%2Fpay%2Fauction%3Faid%3D',
	redirect_uri_login: 'http%3A%2F%2Fh5.tiangongyipin.com/login',

	getOrderPaySuccessUrl(orderId) {
		return 'http://' + window.location.host + '/#!/my/mall-order/item/' + orderId;
	},

	getDuobaoSuccessUrl(productId) {
		return 'http://' + window.location.host + '/#!/duobao/item/' + productId;
	},

	getDepositSuccessUrl(productId) {
		return 'http://' + window.location.host + '/#!/auction/pay-deposit/' + productId;
	},

}