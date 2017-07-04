<template>
	<group title="编辑晒单">
		<x-textarea :max="200" name="detail" placeholder="请填写详细信息" :show-counter="true" :value.sync="content"></x-textarea>
	</group>
	
	<group title="分享图片">
		<ul class="grid">
			<li v-for="img in images">
				<div class="imgslot">
					<img :src="img"/>
					<!-- <i class="material-icons remove" @click="delImg($index)">remove_circle</i> -->
					<div class="material ic_remove_circle_red" @click="delImg($index)"></div>
				</div>
			</li>
			<li v-if="canAddPhoto" @click="choosePhoto">
				<div class="grid-add">
					<i class="material-icons">add</i>
				</div>
			</li>
		</ul>
	</group>
	<box gap="10px 10px">
		<x-button type="primary" @click="postData">提交</x-button>
	</box>
	<toast :show.sync="success">提交成功</toast>
	<alert :show.sync="error" title="提交失败">{{errorMsg}}</alert>
</template>

<script>
	import XTextarea from 'vux/dist/components/x-textarea'
	import Group from 'vux/dist/components/group'
	import XButton from 'vux/dist/components/x-button'
	import Box from 'vux/dist/components/box'
	import Toast from 'vux/dist/components/toast'
	import Alert from 'vux/dist/components/alert'
	import wx from 'weixin-js-sdk'
	import browserUtils from '../../lib/browser-helper'

	export default {
		components: {
			XTextarea,
			Group,
			XButton,
			Box,
			Toast,
			Alert
		},
		route: {
			data() {
				document.title = '晒单分享';
			}
		},
		ready() {
			this.getToken();
			if (this.$route.params.id != 0) {
				this.id = this.$route.params.id;
			} else {
				this.chooseId = true;
				this.getMyPrize();
			}
			this.$dispatch.apply(this, ['onTitleChanged', {
                   	title: '晒单分享',
                   	back: true
                }]);
			var that = this
			window.setImageUrlFromNative = function(url){
				that.images.push(url);
			}
		},

		methods: {
			getToken(){
            if(!window.userinfo){
                if (typeof(JsBridge) != 'undefined'){
                    var qToken = this.$route.query.token;
                    var nToken = JsBridge.getTokenFromNative();
                    if(qToken){
                		this.noAddress = true;
                        this.token = qToken;
                        window.userinfo = {
                            token:qToken
                        };
                    }else if(nToken){
                        this.token = nToken;
                        window.userinfo = {
                            token:nToken
                        };
                    }else{
                        this.$route.router.go({name: 'login'});
                    }
                }else if(browserUtils.versions().weixin){
                	this.$route.router.go('/duobao/phone');
                } else {
                    this.$route.router.go({name: 'login'});
                }
            }else{
                this.token = window.userinfo.token;
            }
        },
        getMyPrize() {
				this.$http.post('', {
					act: 'goods_prizeList',
					group: 'cloud',
					offset: this.offset,
					max: this.max
				}).then((result) => {
					this.prize = result.data.datalist;
				})
			},
			choosePhoto: function () {
				var that = this
				if (typeof(JsBridge) != 'undefined'){
					JsBridge.pickPhoto()
				} else if (browserUtils.versions().weixin) {
					wx.chooseImage({
					    count: 1,
					    sizeType: ['original', 'compressed'],
					    sourceType: ['album', 'camera'],
					    success: function (res) {
					        var localIds = res.localIds;
					        var localIdsStr  = localIds.toString();
					        wx.uploadImage({
							    localId: localIdsStr, 
							    isShowProgressTips: 1, 
							    success: function (res) {
							        var serverId = res.serverId; 
							        that.upLoadWXImg(serverId)
							    }
							});
					    }
					});
				}
			},
			upLoadWXImg: function (serverId) {
				this.$http.post('',{
					act: 'upload_wxUpload',
					serverId: serverId,
					accesstoken: window.wxconfig.accessToken
				}).then((result)=>{
					if (result && result.data && result.data.code == 200) {
						this.images.push(result.data.data.imgUrl);
					}
				})
			},
			delImg: function (index) {
				this.images.splice(index, 1)
			},
			getWxJsapi: function () {
				this.$http.post('',{
					act:'wchat_getWxJsapi',
                    url:window.location.href.split('#')[0]
				}).then((result)=>{})
			},
			postData: function () {
				if (this.images.length == 0) {
					this.errorMsg = '请添加至少一张图片'
					this.error = true
					return
				}
				this.$http.post('',{
					act: 'showprize_add',
					group: 'cloud',
					id: this.id,
					content: this.content,
					images: this.images
				}).then((result)=>{
					if (result && result.data && result.data.code == 200) {
						this.success = true
						window.history.back()
						location.href = document.referrer
						if (browserUtils.versions().ios) {
							JsBridge.close();
						}
					} else {
						this.errorMsg = result.data.message
						this.error = true
					}
				})
			},
		},
		data() {
			return {
				id: '',
				content: '',
				images: [],
				prize: [],
				chooseId: false,
				canAddPhoto: true,
				success: false,
				error: false,
				errorMsg: ''
			}
		},
		watch: {
			'images': function () {
				if (this.images.length >= 9) {
					this.canAddPhoto = false
				} else {
					this.canAddPhoto = true
				}
			}
		}
	}
</script>

<style scoped>
	.grid {
		width: 100%;
	}

	.grid li {
		width: 33.33%;
		float: left;
		text-align: center;
		margin: 8px 0 8px 0;
	}

	.grid li .imgslot {
		width: 80px;
		height: 80px;
		margin: 0 auto 0 auto;
		position: relative;
	}

	.grid li .imgslot img {
		width: 80px;
		height: 80px;
		object-fit: cover;
		border-radius: 3px;
	}

	.grid li .imgslot i,
	.grid li .imgslot .material {
		position: absolute;
		right: -6px;
		top: -6px;
		color: #58bc9a;
		opacity: 1;
	}

	.grid li .grid-add {
		width: 80px;
		height: 80px;
		border: 1px dashed #c8c8c8;
		margin: 0 auto 0 auto;
		border-radius: 3px;
	}

	.grid li .grid-add i {
		margin: 28px;
		color: #646464;
	}
</style>