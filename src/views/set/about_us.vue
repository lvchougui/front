<template>
	<div class="mymenu">
		<div style="display:flex;flex-direction:column;margin-top:40px;">
			<img src="../../assets/img/about_us/intro_icon.png" style="width=60px;height:60px;text-align:centre;margin: 0 auto;"></img>
			<p style="text-align:center;margin-top:5px;margin-bottom:20px;">天工艺品</p>
		</div>

		<group style="clear:left;">
			<cell title="了解我们：About Us" is-link @click="aboutus">
				<!-- <i class="material-icons" slot="icon">zhanghuyue</i> -->
				<img slot="icon" src="../../assets/img/about_us/intro_about.png" style="width:30px;height:30px;margin-right:10px;"></img>
			</cell>
			<cell title="客服电话：400-600-9650" is-link @click="service_tele">
				<!-- <i class="material-icons" slot="icon">lock</i> -->
				<img slot="icon" src="../../assets/img/about_us/intro_kefu.png" style="width:30px;height:30px;margin-right:10px;"></img>
			</cell>
			<cell title="官方微博：天工艺品官方微博" is-link @click="official_weibo">
				<!-- <i class="material-icons" slot="icon">feedback</i> -->
				<img slot="icon" src="../../assets/img/about_us/intro_weibo.png" style="width:30px;height:30px;margin-right:10px;"></img>
			</cell>
		</group>

        <div class="bottom-float-view">
	        <p style="text-align:center;width:100%;" @click="official_website">WWW.TIANGONGYIPIN.COM</p>
	    </div>
	</div>
</template>

<script>
	import Cell from 'vux/dist/components/cell'
	import Group from 'vux/dist/components/group'
	import storage from '../../lib/storage-helper'

	export default {
		route:{
			data(){
				document.title = "关于天工艺品";
			}
		},
		components: {
			Cell,
			Group
		},
		data() {
			return {
				about: false
			}
		},
		/*个人资料页面*/
		ready: function () {
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '关于我们',
				back: true
			}])
		},

		methods: {
			aboutus: function () {
				window.location = 'http://h5.tiangongyipin.com/about_us.html';
			},
			service_tele: function () {
				window.location.href = 'tel://400-600-9650';	
			},
			official_weibo: function () {
				window.location = 'http://weibo.com/modosir';
			},

			official_website: function() {
				window.location = 'http://www.tiangongyipin.com';
			}
		}
	}
</script>

<style>
	.bottom-float-view {
		position: fixed;
		bottom: 0px;
		width: 100%;
		height: 60px;
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