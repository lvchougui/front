<template>
	<div class="redeem-header">
		<img class="avatar" :src="logo" />
		<div class="name">{{nickName}}</div>
		<div class="count">积分数: {{mainData.integral}}</div>
		<div class="record" v-link="{name:'redeem_record'}">积分纪录</div>
	</div>
	<div class="redeem-list">
		<div class="header">如何赚积分</div>
		<ul class="how-to">
			<li v-for="item in howTo">
				<div class="action">{{item.action}}</div>
				<div class="go" @click="go(item.go)">赚积分</div>
				<div class="count">+{{item.count}}分</div>
			</li>
		</ul>
	</div>
	<div class="db-fab" v-link="{name:'integralRules'}">
		<i class="material-icons">help</i>
	</div>
</template>

<script>
	export default {
		ready() {
				this.$dispatch.apply(this, ['onTitleChanged', {
					title: '积分',
					back: true
				}]);
				this.getIntegral();
			},
			methods: {
				getIntegral() {
						this.$http.post('', {
							act: 'integral_getInfo'
						}).then((result) => {
							this.mainData = result.data.data;
						})
					},
					go(go) {
						this.$route.router.go({
							path: go
						});
					}
			},
			data() {
				return {
					logo: window.userinfo.logo,
					nickName: window.userinfo.nickname,
					howTo: [
						{
							'action': '推荐好友/每天最高50分',
							'count': 5,
							'go': '/main/home'
						},
						{
							'action': '完善个人资料/首次',
							'count': 2,
							'go': '/set/personList'
						},
						{
							'action': '出价/每天最高+10分',
							'count': 1,
							'go': '/main/stages'
						},
						{
							'action': '点赞/每天最高+20分',
							'count': 1,
							'go': '/main/yiqu'
						},
						{
							'action': '分享/每天最高+20分',
							'count': 2,
							'go': '/main/home'
						},
						{
							'action': '五星好评/仅限一次',
							'count': 20,
							'go': '/main/home'
						},
						{
							'action': '成交拍品',
							'count': '等额',
							'go': '/main/stages'
						},
						{
							'action': '发表艺趣/每天最高+20分',
							'count': 2,
							'go': '/main/yiqu'
						},
						{
							'action': '艺趣评论/每天最高+20分',
							'count': 2,
							'go': '/main/yiqu'
						},

					],
					mainData: {}
				}
			}
	}
</script>