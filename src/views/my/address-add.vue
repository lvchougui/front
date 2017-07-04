<template>
	<div class="edit-address">
		<group>
			<x-input title="收货人姓名" name="receiver" placeholder="请输入收货人姓名" is-type="china-name" :value.sync="receiver"></x-input>
			<x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :value.sync="phone"></x-input>
			<address title="地址" :value.sync="selectAddress" raw-value :list="addressData"></address>
			<x-input title="详细地址" name="address" placeholder="请输入详细地址" :value.sync="address"></x-input>
			<x-input title="邮编" name="postcode" placeholder="请输入邮编" keyboard="number" :min="6" :max="6" :value.sync="postCode"></x-input>
		</group>

		<group>
			<switch title="设为默认地址" :value.sync="default"></switch>
		</group>
		<box gap="32px 8px 0 8px">
			<x-button type="primary" @click="postAddressData">保存</x-button>
		</box>
		<toast :show.sync="added">已保存</toast>
		<toast :show.sync="failed" type="cancel">提交失败</toast>
		<toast :show.sync="wrongNumber" type="cancel">手机号码错误</toast>
	</div>
</template>

<script>
	import XInput from 'vux/dist/components/x-input'
	import XButton from 'vux/dist/components/x-button'
	import Switch from 'vux/dist/components/switch'
	import Box from 'vux/dist/components/box'
	import Toast from 'vux/dist/components/toast'
	import Address from 'vux/dist/components/address'
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'
	import AddressChinaData from 'vux/src/components/address/list.json'
	import value2name from 'vux/src/filters/value2name.js'

	import browserUtils from '../../lib/browser-helper'

	export default {
		route:{
			data(){
				document.title = "新增收货地址";
			}
		},
		components: {
			XInput,
			XButton,
			Switch,
			Box,
			Toast,
			Address,
			Cell,
			Group
		},
		ready() {
			document.body.style.position = 'relative';
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '新增收货地址',
				back: true
			}]);
			// document.title = '新增收货地址';
		},
		methods: {
			getName(value) {
					return value2name(value, AddressChinaData)
				},

				postAddressData() {
					let rawAddress = this.getName(this.selectAddress);
					let rawAddressArray = rawAddress.split(/(\s+)/);

					this.state = rawAddressArray[0];
					this.city = rawAddressArray[2];
					this.region = rawAddressArray[4];
					
					if (this.default == false) {
						this.primary = 0;
					} else {
						this.primary = 1;
					};

					this.$http.post('', {
						act: 'address_add',
						userid: window.userinfo.userid,
						receiver: this.receiver,
						phone: this.phone,
						state: this.state,
						city: this.city,
						region: this.region,
						address: this.address,
						primary: this.primary,
						postCode: this.postCode
					}).then((result) => {
						if (result.data.code == 200) {
							this.added = true;
							window.history.back()
							if (browserUtils.versions().ios) {
								JsBridge.close();
							}
						} else if (result.data.code == 222) {
							this.wrongNumber = true;
						} else {
							this.failed = true;
						}
					})
				},
		},
		data() {
			return {
				addressData: AddressChinaData,
				selectAddress: [],
				default: false,

				receiver: '',
				phone: '',
				state: '',
				city: '',
				region: '',
				address: '',
				primary: '',
				postCode: '',

				added: false,
				failed: false,
				wrongNumber: false
			}
		}
	}
</script>

<style>

</style>