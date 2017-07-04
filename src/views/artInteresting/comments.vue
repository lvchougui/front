<template>
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

	<div class="yiqu-comment-bar">
		<div class="comment-area" :style="{width: commentWidth}">
			<x-textarea :max="140" name="myComment" placeholder="说点什么吧" :rows="2" :value.sync="myComment" :show-counter="false"></x-textarea>
		</div>
		<div class="action-area">
			<button class="comment-send" @click="comment">发布</button>
		</div>
	</div>
	<toast :show.sync="commented">评论成功</toast>
	<toast :show.sync="empty" type="cancel">评论不能为空</toast>
</template>

<script>
	import Toast from 'vux/dist/components/toast'
	import XTextarea from 'vux/dist/components/x-textarea'
	import { isLogined } from '../../lib/auth'

	export default {
		components: {
			Toast,
			XTextarea
		},
		ready() {
			this.id = this.$route.params.id;
			this.getCommentsData();
			this.commentWidth = window.innerWidth - 80 + 'px';
			this.$dispatch.apply(this, ['onTitleChanged', {
				title: '评论列表',
				back: true
			}]);
		},
		methods: {
			getCommentsData() {
					this.$http.post('', {
						act: 'comment_getList',
						id: this.id
					}).then((result) => {
						this.commentsData = result.data.datalist;
					})
				},
				comment: function () {
					if(!isLogined(this)){
						return;
					};
					if (this.myComment!='') {
						this.$http.post('', {
							act: 'comment_add',
							id: this.id,
							content: this.myComment
						}).then((result) => {
							if (result.data.code == 200) {
								this.myComment = '';
								this.getCommentsData();
								this.commented = true;
							}
						});
					} else {
						this.empty = true;
					}
				},
		},
		data() {
			return {
				id: '',
				commentsData: [],
				myComment: '',
				commentWidth: '',
				commented: false,
				empty: false
			}
		}
	}
</script>

<style>
	
</style>