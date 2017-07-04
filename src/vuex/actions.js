import * as types from './mutation-types'

export const addOrderToPay = ({dispatch}, order) => {
	if(order != undefined) {
		dispatch(types.ORDER_FOR_PAY, order);
	}
}

export const setOrderAddress = ({dispatch}, address) => {
	dispatch(types.SET_ORDER_ADDRESS, address)
}

export const setOrderCoupon = ({dispatch}, coupon) => {
	dispatch(types.SET_ORDER_COUPON, coupon)
}

