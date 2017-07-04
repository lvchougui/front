<template>
	<ul class="yiqu-list">
		<li class="yiqu" v-for="yiqu in mainData">
			<div class="yiqu-top">
				<img class="avatar" :src="yiqu.author.logo" />
				<div class="mid">
					<p class="name">{{yiqu.author.nickname}}</p>
					<p class="time">{{yiqu.createTime}}</p>
				</div>
				<i class="material-icons" @click="yiqu.menu=1" v-show="yiqu.menu==0">keyboard_arrow_down</i>
				<i class="material-icons" @click="yiqu.menu=0" v-show="yiqu.menu==1">keyboard_arrow_up</i>
			</div>
			<template v-if="yiqu.type=='normal'">
				<div class="yiqu-normal">
					<p>{{yiqu.content}}</p>
					<ul class="imglist" v-show="yiqu.images != null" @click="goDetail(yiqu.id)">
						<li v-for="img in yiqu.images">
							<div>
								<img :src="img" :style="{height: imgHeight}"/>
							</div>
						</li>
					</ul>
				</div>
			</template>
			<template v-if="yiqu.type=='official'">
				<div class="yiqu-official" @click="goDetail(yiqu.id)">
					<div class="artical-card">
						<img :src="yiqu.images[0]" :style="{height: coverHeight}" />
						<h3>{{yiqu.title}}</h3>
						<p>{{yiqu.summary}}</p>
					</div>
				</div>
			</template>
			<div class="yiqu-liker">
				<ul>
					<li v-for="liker in yiqu.support_list">
						<img :src="liker.logo" />
					</li>
					<li>
						<i class="material-icons">more_horiz</i>
					</li>
				</ul>
				<p @click="triggleLike(yiqu.id, yiqu)">{{yiqu.support_num}}</p>
				<i class="material-icons" :class="{'text-red':yiqu.issupport==1}" @click="triggleLike(yiqu.id, yiqu)">thumb_up</i>
				<!--<div class="yicon" :class="{'icon_like':yiqu.issupport==0, 'icon_like_selected':yiqu.issupport==1}" @click="triggleLike(yiqu.id, yiqu)"></div>-->
			</div>
			<div class="yiqu-comment-preview" v-if="yiqu.commentList">
				<div class="comment">
					<span class="name" @click="goUser(yiqu.commentList[0].userId.id)">{{yiqu.commentList[0].userId.nickname}}: </span>
					<span class="content">{{yiqu.commentList[0].content}}</span>
				</div>
				<div class="comment" v-if="yiqu.commentList[1]">
					<span class="name" @click="goUser(yiqu.commentList[1].userId.id)">{{yiqu.commentList[1].userId.nickname}}: </span>
					<span class="content">{{yiqu.commentList[1].content}}</span>
				</div>
			</div>
			<div class="yiqu-action">
				<div class="right" @click="goComments(yiqu.id)">
					<p>查看所有{{yiqu.comments}}条评论</p>
					<i class="material-icons">keyboard_arrow_right</i>
				</div>
				<button @click="goComments(yiqu.id)">
					<i class="material-icons">comment</i>
					<!--<div class="yicon icon_comment"></div>-->
					<div>评论</div>
				</button>
			</div>
			<div class="yiqu-menu" v-show="yiqu.menu==1" @click="yiqu.menu=0">
				<ul>
					<li v-show="yiqu.iscollection==0" @click="collectIt(yiqu.id, yiqu)">
						<i class="material-icons">star_border</i>
						<p>收藏</p>
					</li>
					<li v-show="yiqu.iscollection==1" @click="unCollectIt(yiqu.id, yiqu)">
						<i class="material-icons">star</i>
						<p>已收藏</p>
					</li>
					<li @click="reportIt(yiqu.id, yiqu)">
						<i class="material-icons">warning</i>
						<p>举报</p>
					</li>
					<li @click="yiqu.menu=0">
						<i class="material-icons">cancel</i>
						<p>取消</p>
					</li>
				</ul>
			</div>
		</li>
	</ul>

	<toast :show.sync="collected">已收藏</toast>
	<toast :show.sync="uncollected" type="cancel">已取消收藏</toast>
	<toast :show.sync="reported">已举报</toast>

	<!-- <infinite-loading :on-infinite="loadYiqu"></infinite-loading> -->
	<see-more :on-see="loadYiqu"></see-more>
</template>

<script>
	import Toast from 'vux/dist/components/toast'
	// import InfiniteLoading from 'vue-infinite-loading'
	import SeeMore from '../partial/see-more'
	import {
		isLogined
	}
	from '../../lib/auth'

	export default {
		name: 'yiqu-list',
		props: {
			act: {
				type: String
			}
		},
		components: {
			Toast,
			// InfiniteLoading,
			SeeMore
		},
		ready() {
			this.getYiqu();
			this.coverHeight = (window.innerWidth - 34) / 2 + 'px';
			this.imgHeight = ((window.innerWidth - 40) / 3).toFixed(0) + 'px';
		},
		methods: {
			getYiqu() {
					this.$http.post('', {
						act: this.act,
						group: 'tgyp',
						offset: this.offset,
						max: this.max,
					}).then((result) => {
						let yiqus = result.data.datalist;
						yiqus.forEach(function (obj) {
							obj['menu'] = 0;
						});
						this.mainData = yiqus;
					})
				},
				loadYiqu: function () {
					setTimeout(function () {
						this.offset = this.offset + this.max;
						this.$http.post('', {
							act: this.act,
							group: 'tgyp',
							offset: this.offset,
							max: this.max
						}).then((result) => {
							if (result.data.code == 229) {
								this.temp = []
								this.$broadcast('$InfiniteLoading:noMore');
							} else {
								let yiqus = result.data.datalist;
								yiqus.forEach(function (obj) {
									obj['menu'] = 0;
								});
								this.temp = yiqus;
							}
						})
						this.mainData = this.mainData.concat(this.temp);
						this.$broadcast('$InfiniteLoading:loaded');
					}.bind(this), 1000);
				},
				goDetail: function (id) {
					this.$route.router.go({
						name: 'yiqu_detail',
						params: {
							id: id
						}
					});
				},
				goComments: function (id) {
					this.$route.router.go({
						name: 'yiqu_comments',
						params: {
							id: id
						}
					});
				},
				goUser: function (id) {
					this.$route.router.go({
						name: 'userinfo',
						params: {
							id: id
						}
					});
				},
				triggleLike: function (id, yiqu) {
					if (!isLogined(this)) {
						return;
					};
					if (yiqu.issupport === 1) {
						yiqu.issupport = 0;
						yiqu.support_num--;
						this.$http.post('', {
							act: 'support_delete',
							id: id
						});
					} else if (yiqu.issupport === 0) {
						yiqu.issupport = 1;
						yiqu.support_num++
							this.$http.post('', {
								act: 'support_add',
								id: id
							});
					}
				},

				collectIt: function (id, yiqu) {
					if (!isLogined(this)) {
						return;
					};
					yiqu.iscollection = 1;
					this.$http.post('', {
						act: 'collection_add',
						id: id
					});
					this.collected = true;
				},
				unCollectIt: function (id, yiqu) {
					if (!isLogined(this)) {
						return;
					};
					yiqu.iscollection = 0;
					this.$http.post('', {
						act: 'collection_delete',
						id: id
					});
					this.uncollected = true;
				},
				reportIt: function (id, yiqu) {
					if (!isLogined(this)) {
						return;
					};
					this.$http.post('', {
						act: 'report_add',
						id: id
					});
					this.reported = true;
				}
		},
		data() {
			return {
				offset: 0,
				coverHeight: '',
				imgHeight: '',
				max: 10,
				temp: [],
				mainData: [],
				collected: false,
				uncollected: false,
				reported: false
			}
		}
	}
</script>