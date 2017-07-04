<style>
	
	.my-address {
		border: 1px solid #e7e7e7;
		margin: 10px;
		padding-left: 15px;
		padding-top: 15px;
		padding-bottom: 15px;
		display:-webkit-flex;
		display:flex;
		flex-wrap: wrap;
	}
	
	.content-part{
		flex-grow: 1;
	}
	.operation-part{
		width: 50px;
		text-align: center;
		border-left:1px solid #e7e7e7;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.my-address .top  h2{
		font-weight: 400;
		display: inline;
		color: black;
	}
	
	.my-address .top p {
		margin-right: 8px;
		margin-left: 10px;
		display: inline;
	}
	
	.my-address .top i {
		float: right;
		color: #646464;
	}
	
	
	.my-address .mid p {
		line-height: 1.5;
		color: grey;
		margin-top: 5px;
	}
	
	
</style>
<template>
	<ul class="my-address-list">
		<li class="my-address" v-for="address in addressData">
			<div class="content-part" @click="chooseAddress(address)">
				<div class="top">
					<h2>{{address.receiver}}</h2>
					<p>{{address.phone}}</p>
				</div>
				<div class="mid" >
					<p>{{address.state}} {{address.city}} {{address.region}} {{address.address}}
					</p>
				</div>
			</div>
			<!-- <div style="height:100%;width:1px;background-color:#e7e7e7;"></div> -->
			<div class="operation-part" @click="addressEdit(address)">
				<img src="../../assets/img/bianji_addr.png" width="20px" height="20px" style="margin-top:5px;">
				<p style="margin-top:5px;font-size:0.8em;">编辑</p>
			</div>
			
		</li>
	</ul>
	<div class="db-fab" @click="this.$route.router.go({name: 'address-add'})">
		<i class="material-icons">add</i>
	</div>
	<toast :show.sync="primary">已设为默认</toast>
	<toast :show.sync="deleted">已删除</toast>
</template>

<script>
	import Toast from 'vux/dist/components/toast'
	
	import { setOrderAddress } from '../../vuex/actions'

	import storage from '../../lib/storage-helper'

	export default {
		route:{
			data(){
				document.title = "收货地址";
			}
		},
		vuex:{
			actions:{
				setOrderAddress
			}
		},
		components: {
			Toast
		},
		ready() {
			this.getAddressData();
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '地址列表',
				back: true
			}]);
			this.mode = this.$route.query.mode;
		},
		methods: {
			getAddressData() {
				this.$http.post('', {
					act: 'address_getAddressById',
					id: window.userinfo.id
				}).then((result) => {
					let addresses = result.data.datalist;
					addresses.forEach(function (obj) {
						obj['menu'] = 0;
					});
					this.addressData = addresses;
				})
			},
			chooseAddress(address){
				// this.$bus.emit('choose-address', address);
				storage.save('orderAddress', address);
				// var savedAddress = storage.getAsObject('orderAddress');
				// log(JSON.stringify(savedAddress));
				window.history.back(); 
				// window.history.go(-1);
			},
			addressEdit(address) {

					// 选择地址
					if(this.mode){
						this.setOrderAddress(address);
						// this.$dispatch('on-address-selected',address);
						history.back();
						return;
					}

					this.$route.router.go({
						name: 'address-edit',
						params: {
							id: address.id
						}
					});
				},
				
				addressPrimary(id) {
					this.$http.post('', {
						act: 'address_update',
						id: id,
						userid: window.userinfo.userid,
						primary: true,
					}).then((result) => {
						if (result.data.code == 200) {
							this.primary = true;
							this.getAddressData();
						}
					});
				}
			},
			data() {
				return {
					mode:0,
					addressData: [],
					deleted: false,
					primary: false
				}
			}
		}
	</script>

