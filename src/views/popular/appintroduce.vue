<style type="text/css">
    .title {
    	text-align: center;
    	color: rgb(47,47,47);
    	font-size: 20px;
    	padding-top: 20px;
    	font-weight: bold;
    }
    .content {
    	padding: 10px;
    }
    .para {
    	text-indent: 2em;
    	font-size: 15px;
    }
</style>

<template>

    <p class="title">天工艺品App简介</p>

    <div class="content">
    	<p class="para">生活应还原她本身精致的模样。</p>
    	<p class="para">民艺造物美且灵，充盈你的内心，妆点你的生活。相逢手作之美，指尖触碰造物的温度与肌理，完成人、物、自然、世界的统一。所以，民艺诸世界应是这样的聚集：匠艺精心的手作，潜心埋首的匠人，以及亲身拍卖民艺手作的你自己。</p>
    	<p class="para">全新民艺视觉化体验式App—天工艺品，为热爱民艺的你而来。这是随心所欲的手艺天地：美文美图传递的艺术，在线自由选择的产品，拍卖分享自己喜爱的物件，认知走近更多的手艺匠人。</p>
    	<p class="para">欢迎，进入民艺的世界。</p>
    	<p class="para">我们贴心为你呈现“优选”“拍卖”“匠人”三大服务，以物传心，以人见艺。传承与创新，互动与分享，让你在浩瀚的民艺世界里，随心所欲。</p>
    	<p class="para">小小的界面，大大的手工艺术世界。更多样化的产品布局，更优化的功能体验，更人性的互动参与。以图、文、艺、人，构建起联通手作的桥，让你的每一次手指拨动，都是艺术的绝佳享受。</p>
    	<p class="para">好看，好玩，好用，以匠心精致你的生活。</p>
    </div>
</template>

<script>
	export default {

		route:{
			data(){
				document.title = "天工艺品App简介";
			}
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'天工艺品App简介',back:true}])
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
