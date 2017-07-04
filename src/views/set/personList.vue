<style>
	.radio-cell {
		height: 44px;
		line-height: 44px;
		border-top: 1px solid rgb(230, 230, 230);
	}
	
	.radio-cell h4 {
		float: left;
		margin-left: 16px;
		font-weight: 400;
	}
	
	.radio-cell div {
		float: right;
		height: 44px;
	}
	
	.radio-cell input {
		height: 22px;
		width: 22px;
		margin: 11px 8px 11px 8px;
		float: left;
	}
	.radio-cell p {
		line-height: 44px;
		float: left;
		margin: 0 8px 0 8px;
	}
	.my-address-info {
		border: 1px solid #e7e7e7;
		margin: 10px;
		padding-left: 15px;
		padding-top: 15px;
		padding-bottom: 15px;
		/*display:-webkit-flex;*/
		display:flex;
		flex-direction: row;
		/*background-color: yellow;*/
		/*overflow: hidden;*/
		/*flex-wrap: wrap;*/
	}
	.content-part{
		/*flex-grow: 1;*/
		flex: 1;
		/*background-color: black;*/
	}
	.operation-part{
		width: 50px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.my-address-info .top h2{
		font-weight: 400;
		display: inline;
		color: black;
		/*text-overflow: ellipsis;*/
		/*background-color: purple;*/
	}
	.my-address-info .top p {
		margin-right: 8px;
		margin-left: 10px;
		display: inline;
		/*background-color: orange;*/
	}
	.my-address-info .top i {
		float: right;
		color: #646464;
		/*background-color: black;*/
	}
	.my-address-info .mid p {
		line-height: 1.5;
		color: gray;
		margin-top: 5px;
		/*background-color: green;*/
	}
	.divider{
		width: 100%;
		height: 10px;
		background-color: #efefef;
	}
</style>
<template>
	<div>
		<group style="margin-top:-10px;">
			<cell title="头像">
				<!-- <i> -->
			      	 <img style="width:40px;height:40px;border-radius:20px;border:none" :src="data.logo"> </img>
			      	 <!-- <span style="font-size:14px;">头像</span> -->
			     
			</cell>
			<!-- <div class="divider" ></div> -->

			<!-- <cell title="个性签名" :value="data.sign"></cell> -->
			<cell title="昵称" :value="data.nickname" style="font-size:15px;height:40px;"></cell>
			<!-- <cell title="性别" :value="gender"></cell> -->
			<!-- <cell title="地区" :value="address"></cell> -->
		</group>

		<div class="divider" ></div>

        <div> 
        	<p style="margin-left:15px;margin-top:10px;">默认收货地址</p>
        </div>

        <div @click="chooseAddress">
			<div class="my-address-info">
				<div class="content-part" v-if="defaultReceiverAddress != null">
					<div class="top">
						<h2>{{defaultReceiverAddress.receiver}}</h2>
						<p>{{defaultReceiverAddress.phone}}</p>
					</div>
					<div class="mid" >
						<p>{{defaultReceiverAddress.state}} {{defaultReceiverAddress.city}} {{defaultReceiverAddress.region}} {{defaultReceiverAddress.address}}
						</p>
					</div>
				</div>

				<div v-else style="flex:1;">
					<div style="padding:10px;font-size:12px;color:rgb(159,160,160);background-color:white;">
						添加默认收货地址
					</div>
				</div>

				<!-- <div style="height:100%;width:1px;background-color:#e7e7e7;"></div> -->
				<div class="operation-part" style="border:none;">
					<i v-if="!isAndroid" class="material-icons" style="background-color:white;">chevron_right</i>
				</div>
			</div>

			

		</div>

		<div class="divider" ></div>

		<div> 
        	<p style="margin-left:15px;margin-top:10px;margin-bottom:10px;">账号绑定</p>
        </div>

        <group style="clear:left;margin-bottom:40px;">
			<cell title="绑定手机" is-link @click="bindingphone">
				<!-- <i class="material-icons" slot="icon">zhanghuyue</i> -->
				<img slot="icon" src="../../assets/img/bdshouji.png" style="width:30px;height:30px;margin-right:10px;"></img>
			</cell>
			<!-- <cell title="绑定微信" is-link @click="bindingweixin">
				<img slot="icon" src="../../assets/img/bdweixin.png" style="width:30px;height:30px;margin-right:10px;"></img>
			</cell> -->
		</group>

		<!-- <group v-if="editMode==1">
			<x-input title="个性签名" name="sign" placeholder="请输入个性签名" :value.sync="data.sign"></x-input>
			<x-input title="昵称" name="nickname" placeholder="请输入昵称" :value.sync="data.nickname"></x-input>
			<div class="radio-cell">
				<h4>选择性别</h4>
				<div>
					<input type="radio" name="gender" v-model="data.gender" value="m" />
					<p>男</p>
					<input type="radio" name="gender" v-model="data.gender" value="f" />
					<p>女</p>
				</div>
			</div>
			<address title="地区" :value.sync="selectAddress" raw-value :list="addressData" v-if="selectAddress.length > 0"></address>
		</group> -->

		<!-- <box gap="32px 8px 0 8px">
			<x-button plain @click="editMode=1" v-show="editMode==0">编辑</x-button>
			<x-button @click="submit" type="primary" v-show="editMode==1">保存</x-button>
		</box> -->
	</div>
</template>

<script>
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'
	import XButton from 'vux/dist/components/x-button'
	import Box from 'vux/dist/components/box'
	import XInput from 'vux/dist/components/x-input'
	import Address from 'vux/dist/components/address'
	import AddressChinaData from 'vux/src/components/address/list.json'
	import value2name from 'vux/src/filters/value2name.js'

	export default {
		route:{
			data(){
				document.title = "我的资料";
			}
		},
		components: {
			Cell,
			Group,
			XButton,
			Box,
			XInput,
			Address
		},
		ready: function () {
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '个人资料',
				back: true
			}])
			this.getDefaultData();
			this.getDefaultAddress();
		},

		data() {
			return {
				data: [],
				address: '',
				gender: '',
				editMode: 0,
				addressData: AddressChinaData,
				selectAddress: [],
				defaultReceiverAddress: null,//默认收货地址
			}
		},
		methods: {
			getName(value) {
					return value2name(value, AddressChinaData)
				},
				getDefaultData: function () {
					this.$http.post('', {
						act: 'user_getInfo',
						uid: window.userinfo.userid,
					}).then(function (result) {
						let primaryResp = result.data;
						if (primaryResp.code == 200) {
							let data = result.data.data;
							this.data = data;
							this.address = data.state + data.city + data.region;
							if (data.gender == 'm') {
								this.gender = '男';
							} else {
								this.gender = '女';
							};
							this.selectAddress = [this.data.state, this.data.city, this.data.region]
						}
					});
				},

				submit: function () {
					let rawAddress = this.getName(this.selectAddress);
					let rawAddressArray = rawAddress.split(/(\s+)/);

					this.data.state = rawAddressArray[0];
					this.data.city = rawAddressArray[2];
					this.data.region = rawAddressArray[4];

					this.$http.post('', {
						act: 'user_update',
						nickname: this.data.nickname,
						gender: this.data.gender,
						sign: this.data.sign,
						state: this.data.state,
						city: this.data.city,
						region: this.data.region
					}).then((result) => {
						if (result.data.code == 200) {
							this.editMode = 0;
							this.getDefaultData();
						}
					})
				},

				getDefaultAddress() {
		            this.$http.post('', {
		                act: 'address_getDefaultAddress',
		            }).then((result) => {
		                if (result && result.data && result.data.code == 200) {
		                    // log(result.data.data);
		                    this.defaultReceiverAddress = result.data.data;
		                    log(this.defaultReceiverAddress);
		                    // this.receiverName = addressDict.receiver;
		                    // this.receiverPhone = addressDict.phone;
		                    // this.receiverRegion = addressDict.state + addressDict.city + addressDict.region;
		                    // this.receiverDetail = addressDict.address;
		                } 
		            })
		        },

		        bindingphone() {
		        	this.$route.router.go('/duobao/phone');
		        },

		        bindingweixin() {

		        },
		        chooseAddress() {
		        	this.$route.router.go('/my/address-list');
		        }

		}


	}
</script>

