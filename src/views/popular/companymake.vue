<style type="text/css">
	body{
		font-size: 62.5%;
	}
	.title {
		text-align: center;
		color: rgb(47,47,47);
		font-size: 20px;
		padding-top: 20px;
		font-weight: bold;
	}
	.content {
		padding: 1.5em;
	}
	.para {
		/*text-indent: 2em;*/
		font-size: 1.5em;
	}
	.bold-title {
		font-weight:bold;
		font-size:1em;
	}
	.img {
		padding-top: 1em;
		padding-bottom: 0.5em;
		width: 100%;
		height: 100%;
	}
	.img-title {
		font-weight: bold;
		font-size: 1rem;
	}
	.wx-img {
		padding-top: 1em;
		padding-bottom: 0.5em;
		padding-left: 25%;
		padding-right: 25%;
		width: 50%;
		height: 50%;
	}
</style>

<template>

	<p class="title">企业专属，行走的品牌文化</p>

	<div class="content">
		<p class="para">如果你需要一份礼物，答谢客户，</p>
		<p class="para">如何让TA对你印象深刻？</p>
		<p class="para">脱俗雅致，专属企业烙印，传递品牌文化。</p>
		<p class="para">有一些优势，我们列出来，你便无法抗拒。</p>

		<p class="para" style="margin-top:1.5em;">
		<span class="bold-title">产品优选：</span>苏工的尺标，严谨的态度，匠心手作，追求品质与艺术。</p>
		<p class="para">
		<span class="bold-title">资源优渥：</span>多年植根于手工艺品，大师集结，应求设计，只为与你相配。</p>
		<p class="para">
		<span class="bold-title">视觉整合：</span>量体裁衣，产品与企业Logo的巧妙定制融合。</p>

		<p class="para" style="margin-top:1.5em;">匠人的温情之作，满足你的种种需要——内部专供，员工福利，商务赠礼，公关活动。</p>
		<p class="para">示例如下：</p>

		<p class="img-title" style="margin-top:1.5em;">寸墨称心的非遗笔</p>
		<img src="../../assets/img/popular/qiye1.png" class="img"></img>
		<img src="../../assets/img/popular/qiye2.png" class="img"></img>

		<p class="img-title" style="margin-top:1.5em;">馨悦缥缈的香伴</p>
		<img src="../../assets/img/popular/qiye3.png" class="img"></img>
		<img src="../../assets/img/popular/qiye4.png" class="img"></img>

		<p class="img-title" style="margin-top:1.5em;">明前红茶套装</p>
		<img src="../../assets/img/popular/qiye5.png" class="img"></img>
		<img src="../../assets/img/popular/qiye6.png" class="img"></img>

		<p class="para" style="margin-top:0.5em;">定制，让你的品牌文化不拘泥于心中，在手作上复刻。</p>

		<p class="para" style="margin-top:2em">线上客服：</p>
		<img src="../../assets/img/popular/yoyo_wx.png" class="wx-img"></img>
		<p class="para" style="margin-top:0.5em;">微信号:xin18606208921</p>
		<p class="para" style="margin-top:0.5em;">联系电话:189-6213-1026</p>
		<p class="para" style="margin-top:0.5em;">公司地址：江苏省苏州市姑苏区竹辉路208号四楼 天工艺品</p>
	</div>
</template>

<script>
	export default {

		route:{
			data(){
				document.title = "企业定制";
			}
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'企业定制',back:true}])
		},
		methods: {


		},
		data (){
			return {
				data: {

				},

			}
		},
		watch:{

		}
	}
</script>
