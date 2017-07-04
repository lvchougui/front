<template>
	<div class="edit-address">
		<group>
			<x-input title="收货人姓名" name="receiver" placeholder="请输入收货人姓名" is-type="china-name" :value.sync="mainData.receiver"></x-input>
			<x-input title="手机号码" name="mobile" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile" :value.sync="mainData.phone"></x-input>
			<address title="地址" :value.sync="selectAddress" raw-value :list="addressData" v-if="selectAddress.length > 0"></address>
			<x-input title="详细地址" name="address" placeholder="请输入详细地址" :value.sync="mainData.address"></x-input>
			<x-input title="邮编" name="postcode" placeholder="请输入邮编" keyboard="number" :min="6" :max="6" :value.sync="mainData.postCode"></x-input>
		</group>
		
		<group style="margin-top:0;">
			<switch title="设为默认地址" :value.sync="primary"></switch>
		</group>
		<box gap="32px 8px 0 8px">
			<x-button type="primary" @click="updateAddressData" >保存</x-button>
		<toast :show.sync="wrongNumber" type="cancel">手机号码错误</toast>
		</box>
		<box gap="15px 8px 0 8px">
			<x-button type="primary" @click="delAddress" >删除</x-button>
			</box>
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

	export default {
		route:{
			data(){
				document.title = "编辑收货地址";
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
			this.id = this.$route.params.id;
			this.getAddressData();
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '编辑地址',
				back: true
			}]);
		},
		methods: {
			getName(value) {
				return value2name(value, AddressChinaData)
			},
			getAddressData() {
				this.$http.post('', {
					act: 'address_getInfo',
					id: this.id
				}).then((result) => {
					this.mainData = result.data.data;
					if(this.mainData.primary==0){
						this.primary=false;
					}else{
						this.primary=true;
					}
					this.selectAddress = [this.mainData.state, this.mainData.city, this.mainData.region]
				})
			},
			delAddress() {
				this.$http.post('', {
					act: 'address_delete',
					id: this.id
				}).then((result) => {
					if (result.data.code == 200) {
						this.$route.router.go({
							name: 'address-list'
						});
						this.added = true;
					} else {
						this.failed = true;
					}
				});
			},
			updateAddressData() {
				let rawAddress = this.getName(this.selectAddress);
				let rawAddressArray = rawAddress.split(/(\s+)/);

				this.mainData.state = rawAddressArray[0];
				this.mainData.city = rawAddressArray[2];
				this.mainData.region = rawAddressArray[4];
				
				if (this.primary == false) {
					this.mainData.primary = 0;
				} else {
					this.mainData.primary = 1;
				};
				this.$http.post('', {
					act: 'address_update',
					id: this.mainData.id,
					userid: window.userinfo.userid,
					receiver: this.mainData.receiver,
					phone: this.mainData.phone,
					state: this.mainData.state,
					city: this.mainData.city,
					region: this.mainData.region,
					address: this.mainData.address,
					primary: this.mainData.primary,
					postCode: this.mainData.postCode
				}).then((result) => {
					if (result.data.code == 200) {
						this.$route.router.go({
							name: 'address-list'
						});
						this.added = true;
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
				id: '',
				mainData: {},
				addressData: AddressChinaData,
				primary: false,
				selectAddress:[],
				wrongNumber: false
			}
		}
	}
</script>

<style>

</style>