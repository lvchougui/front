<template>
	<div class="mymenu">
		<group style="margin-top:-10px;">
			<!-- <cell title="修改个人资料" is-link @click="pushPersonInfoView">
				<i class="material-icons" slot="icon">person_pin</i>
			</cell> -->
			<cell title="修改密码" is-link @click="pushModifPasswordView">
				<i class="material-icons" slot="icon">lock</i>
			</cell>
			<cell title="用户反馈" is-link @click="pushuserFeedView">
				<i class="material-icons" slot="icon">feedback</i>
			</cell>
			<cell title="关于天工艺品" is-link @click="pushAboutView">
				<i class="material-icons" slot="icon">info</i>
			</cell>
		</group>

		<div style="margin-left:20px;margin-right:20px;margin-top:60px;">
			<button @click="user_logout" type="primary" class="logout-btn">退出当前账号</button>
		</div>
	</div>
    
    <confirm
	:show.sync="showConfirm"
	title="温馨提示" 
	@on-cancel="onCancel" 
	@on-confirm="onConfirm" 
	cancel-text="取消"
	confirm-text="确认">
	<p style="text-align:center;font-size:15px;">退出当前账号？</p>
	</confirm>

	<!-- <dialog :show.sync="about" class="dialog-demo">
		<p class="dialog-title">关于我们</p>
		<p>天工艺品全球手工艺品交易平台隶属于苏州天宫艺品文化传媒有限公司旗下，由非物质文化遗产传承人杨青湖创办，主要从事传统手工艺术品电子商务平台的建立、营运和销售，是一个面向全球推广中国传统手工艺术品的公信、专业、透明的平台。</p>
		<span class="vux-close" @click="about=false"></span>
	</dialog> -->
</template>

<script>
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'
	import Dialog from 'vux/dist/components/dialog'
	import storage from '../../lib/storage-helper'
	import Confirm from 'vux/dist/components/confirm'
	import {
	    configShare
	}
	from '../../lib/wxclient'
	import wx from 'weixin-js-sdk'

	export default {
		components: {
			Cell,
			Group,
			Dialog,
			Confirm
		},
		data() {
			return {
				about: false,
				showConfirm: false,
			}
		},
		/*个人资料页面*/
		ready: function () {
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '设置',
				back: true
			}])
			document.title = "通用设置";
		},

		methods: {

			//跳转到修改个人资料页面
			pushPersonInfoView: function () {
				this.$route.router.go({
					name: 'userinfo',
					params: {
						id: 1
					}
				}); //传用户的id
			},
			//跳转到修改密码页面
			pushModifPasswordView: function () {
				this.$route.router.go({
					name: 'modifPassword',
					params: {
						id: 1
					}
				}); //传用户的id
			},

			//用户反馈页面
			pushuserFeedView: function () {
				this.$route.router.go({
					name: 'userFeed',
					params: {
						id: 1
					}
				}); //传用户的id
			},

			pushAboutView: function () {
				this.$route.router.go({
					name: 'about_us',
				});
			},

			user_logout: function() {

                this.showConfirm = true;

				// var r = confirm('退出当前账号？');
				// if (r == true) {
				// 	log('退出登录');
				// 	storage.save('userinfo', 'undefined');//清空缓存的用户信息
				// 	window.userinfo = undefined;
				// 	window.history.back();
				// } else {
				// 	log('取消退出登录');
				// }
			},
			onCancel() {
				this.showConfirm = false;
			},
			onConfirm() {
				log('退出登录');
				storage.save('userinfo', 'undefined');//清空缓存的用户信息
				window.userinfo = undefined;
				window.history.back();
			}
		}
	}
</script>

<style>
    .logout-btn {
		width: 100%;
		border: none;
		height: 43px;
		line-height: 43px;
		font-size: 15px;
		color: #FFFFFF;
		background-color: black;
		font-family: "SimSun";
	}
</style>

<style lang="less" scoped>
	.dialog-demo {
		.weui_dialog {
			border-radius: 8px;
			padding-bottom: 8px;
		}
		.dialog-title {
			line-height: 30px;
			color: #666;
		}
		p {
			font-size: 0.875em;
		}
		.img-box {
			height: 350px;
			overflow: hidden;
		}
		.vux-close {
			margin-top: 8px;
			margin-bottom: 8px;
		}
	}
	
	.vux-close {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		width: 24px;
		height: 24px;
		overflow: hidden;
		color: #ccc;
		&::before,
		&::after {
			content: '';
			position: absolute;
			height: 1px;
			width: 100%;
			top: 50%;
			left: 0;
			background: #98979d;
		}
		&::before {
			transform: rotate(45deg);
		}
		&::after {
			transform: rotate(-45deg);
		}
	}
</style>