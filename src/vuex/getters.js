export const orderPaying = state => {
	return state.orderpay.order;
}

export const getOrderAddress = state => {
	return state.orderpay.address;
}

export const getOrderCoupon = state => {
	return state.orderpay.coupon;
}