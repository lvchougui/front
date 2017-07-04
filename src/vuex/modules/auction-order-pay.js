import 
{ 
	ADD_AUCTION_ORDER_FOR_PAY,
	SET_AUCTION_ORDER_ADDRESS,
	SET_AUCTION_ORDER_COUPON 
} from '../mutation-types'

// 初始化state
const state = {
	order: {},
	address:undefined,
	coupon:undefined
}

// 
const mutations = {
	
	[ADD_AUCTION_ORDER_FOR_PAY] (state, order) {
		state.order = order
	},

	[SET_AUCTION_ORDER_ADDRESS] (state, address){
		state.address = address;
	},

	[SET_AUCTION_ORDER_COUPON] (state, coupon){
		state.coupon = coupon;
	}
}

export default {
	state, mutations
}