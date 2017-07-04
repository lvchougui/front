<template>
	<div class="profile-slot">
		<div class="profile">
			<img :src="mainData.author.logo" />
			<div class="name">{{mainData.author.nickname}}</div>
			<div class="time">{{mainData.createTime}}</div>
			<button @click="addAttention">
				<template v-if="mainData.isAttention==0">关注</template>
				<template v-if="mainData.isAttention==1">已关注</template>
			</button>
		</div>
	</div>

	<div class="yiqu-detail-normal" v-if="mainData.type=='normal'">
			<div class="content-slot">{{{mainData.content}}}</div>
		<ul class="image-slot">
			<li v-for="img in mainData.images">
				<img :src="img" />
			</li>
		</ul>
	</div>

	<div class="yiqu-detail-official" v-if="mainData.type=='official'">
		<img class="cover" :src="mainData.images[0]">
		<h1 class="title">{{mainData.title}}</h1>
		<div class="summary">{{mainData.summary}}</div>
		<div class="content">{{{mainData.content}}}</div>
	</div>

	<div class="yiqu-comment-section" v-if="commentsData.length">
		<div class="comment-header">
			所有评论
			<span class="text-grey">(评论共{{commentsData.length}}条)</span>
		</div>
		<ul class="yiqu-comment-list">
			<li class="yiqu-comment" v-for="comment in commentsData">
				<div class="top">
					<img :src="comment.userId.logo" />
					<h3>{{comment.userId.nickname}}</h3>
					<p>{{comment.createTime}}</p>
				</div>
				<div class="mid">
					<p>{{comment.content}}</p>
				</div>
			</li>
		</ul>
	</div>

	<div class="yiqu-detail-action-bar">
		<div class="action" @click="triggleLike">
			<i class="material-icons" :class="{'text-red': mainData.issupport==1}">thumb_up</i>
			<div>{{mainData.support_num}}</div>
		</div>
		<div class="action" v-if="mainData.iscollection==0" @click="collectIt">
			<i class="material-icons">star_border</i>
			<div>收藏</div>
		</div>
		<div class="action" v-if="mainData.iscollection==1" @click="unCollectIt">
			<i class="material-icons">star</i>
			<div>已收藏</div>
		</div>
		<div class="action" @click="goComments">
			<i class="material-icons">comment</i>
			<div>评论</div>
		</div>
	</div>
</template>

<script>
	import Toast from 'vux/dist/components/toast'
	import {
		isLogined
	}
	from '../../lib/auth'

	export default {
		components: {
			Toast
		},
		ready: function () {
			this.id = this.$route.params.id;
			this.getYiquData();
			this.getCommentsData();
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '艺趣',
				back: true
			}])
		},
		methods: {
			getYiquData() {
					this.$http.post('', {
						act: 'microblog_getInfo',
						group: 'tgyp',
						id: this.id
					}).then((result) => {
						this.mainData = result.data.data;
					})
				},
				getCommentsData() {
					this.$http.post('', {
						act: 'comment_getList',
						id: this.id
					}).then((result) => {
						this.commentsData = result.data.datalist;
					})
				},
				triggleLike: function () {
					if (!isLogined(this)) {
						return;
					};
					if (this.mainData.issupport == 1) {
						this.mainData.issupport = 0;
						this.mainData.support_num--;
						this.$http.post('', {
							act: 'support_delete',
							id: this.id
						});
					} else if (this.mainData.issupport == 0) {
						this.mainData.issupport = 1;
						this.mainData.support_num++
							this.$http.post('', {
								act: 'support_add',
								id: this.id
							});
					}
				},

				collectIt: function () {
					if (!isLogined(this)) {
						return;
					};
					this.mainData.iscollection = 1;
					this.$http.post('', {
						act: 'collection_add',
						id: this.id
					});
					this.collected = true;
				},
				unCollectIt: function () {
					if (!isLogined(this)) {
						return;
					};
					this.mainData.iscollection = 0;
					this.$http.post('', {
						act: 'collection_delete',
						id: this.id
					});
					this.uncollected = true;
				},
				//添加关注
				addAttention: function () {
					//添加关注
					if (!isLogined(this)) {
						return;
					};
					if (this.mainData.isAttention == 0) {
						this.$http.post('', {
							act: 'fens_add',
							id: this.mainData.author.id //被关注者的id
						}).then((result) => {
							if (result.data.code == 200) {
								this.mainData.isAttention = 1
							}
						});

					}

					//取消关注
					if (this.mainData.isAttention == 1) {
						this.$http.post('', {
							act: 'fens_delete',
							id: this.mainData.author.id //被关注者的id
						}).then((result) => {
							if (result.data.code == 200) {
								this.mainData.isAttention = 0
							}
						});

					}
				},

				goComments: function (id) {
					this.$route.router.go({
						name: 'yiqu_comments',
						params: {
							id: this.id
						}
					});
				},
		},
		data() {
			return {
				id: '',
				mainData: {},
				commentsData: []
			}
		}
	}
</script>