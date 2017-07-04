<style type="text/css">
	.intro-btm {
		line-height: 18px;
	}
	
	.intro-btm span.tip {
		font-size: 12px !important;
	}
	
	.intro-btm .price {
		font-size: 12px !important;
	}
	
	.account_top {
		position: relative;
		height: 200px;
		background-color: rgb(216, 84, 86);
	}
	
	.account_top .first {
		width: 100%;
		height: 30px;
	}
	
	.account_top .first p {
		height: 30px;
		line-height: 30px;
		margin-top: 0px;
		margin-left: 43%;
		font-size: 14px;
		color: white;
		position: absolute;
	}
	
	.account_top .detail {
		height: 24px;
		position: absolute;
		right: 8px;
		top: 8px;
	}
	
	.account_top .detail span {
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		color: white;
		float: right;
	}
	
	.account_top .detail i {
		color: white;
		float: left;
	}
	
	.account_top .availablePrice {
		margin-top: 5px;
		color: white;
		width: 100%;
	}
	
	.account_top .availablePrice p {
		text-align: center;
		font-size: 40px;
	}
	
	.account_top .total {
		margin-top: 20px;
		color: white;
		width: 100%;
	}
	
	.account_top .total .totalPice {
		text-align: center;
		font-size: 12px;
	}
	
	.account_top .total .price {
		text-align: center;
		font-size: 40px;
	}
</style>

<template>

	<!-- 上班部分图像 -->
	<div class="account_top">
		<div class="first">
			<p>
				<span>可用金额(元)</span>
			</p>

			<div class="detail" @click="pushIncomeView">
				<i class="material-icons">insert_drive_file</i>
				<span style="height:30px">明细</span>
			</div>

		</div>

		<div class="availablePrice">
			<p>{{data.availableBalance}}</p>
		</div>

		<div class="total">
			<p class="totalPice">总金额(元)</p>
			<p class="price">{{data.totalBalanceStr}}</p>
		</div>
	</div>

	<!-- 下半部分 -->
	<group style="background-color:white">
		<cell title="充值" is-link @click="this.$route.router.go('/account/recharge');">
			<i class="material-icons" slot="icon">file_upload</i>
		</cell>
		<cell title="提现" is-link @click="this.$route.router.go('/account/deposit');">
			<i class="material-icons" slot="icon">file_download</i>
		</cell>
	</group>

	<div style="margin-top:10px;background-color:white;height:400px">

	</div>


</template>

<script>
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'

	export default {

		route: {
			data() {
				document.title = "我的账户";
			}
		},
		components: {
			Cell,
			Group
		},
		ready: function () {
			this.getData();
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '我的账户',
				back: true
			}])
		},
		methods: {

			getData: function () {
				this.$http.post('', {
					act: 'balance_getInfo',
				}).then((result) => {
					if (result.data.code == 200) {
						this.data = result.data.data;
						log(this.data);
					} else {
						alert("请检查你的网络信息");
					}
				})
			},
			//跳转到明细列表
			pushIncomeView: function () {
				this.$route.router.go('/account/myIncome');
			}
		},
		data() {
			return {
				data: {

				},
				userDatas: ['1', '12'],
				time: ''
			}
		},
	}
</script>