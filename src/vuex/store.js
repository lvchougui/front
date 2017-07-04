import Vue from 'vue'
import Vuex from 'vuex'
import orderpay from './modules/order-pay'

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		orderpay
	}
})