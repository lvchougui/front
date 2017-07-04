<template>

    <p class="title">大匠运斤 只为你的独一无二</p>

    <div class="content">
    	<div class="paragraph">泛工业化和互联网时代，我们可以精准的找到那些标准化的、精致也单一的物品，但也会在大批量同质化的产品中，湮没个人的标签，沦为“街货”的附庸。</div>
        <div class="paragraph">所以，为了“我”是“我”，为了让自己在茫茫人潮中独立存在，更多的人选择了“私人定制”。</div>
        <div class="paragraph">私人定制，创造更精致更有品位的生活，沉浸在更自在随心的世界，更多的人会将目光投向手工艺品定制。在手之于物的温度之间，在指尖温润柔滑的肌理里，寻找一个更真实、更独特的自我。</div>
        <div class="paragraph">植根于手工艺领域数年，我们与众多手工艺大师建立了长期亲密的合作关系，并立足于现代审美趋势，推出私人定制服务。</div>
        <div class="paragraph">在翠玉珠宝、茶香器具、文玩雅饰、案供摆设、锦绣丝织、竹木核雕等工艺雅玩之中，可进行珠宝首饰、蜜蜡、紫砂壶、各类手串、台屏摆件、苏绣、缂丝以及核雕等的定制（示例如下）：</div>
        <div class="art-name">《喜上眉梢》原创高定珠宝系列</div>
        <img src="../../assets/img/popular/meishao1.jpg" class="art-img">
        <img src="../../assets/img/popular/meishao2.jpg" class="art-img">
        <div class="art-desc">喜鹊梅枝，喜气连连。</div>
        <div class="art-desc">古典情韵让你相信美好，邂逅浪漫。</div>
        <div class="art-desc">材质：k金 老蓝宝石 钻石 碧玺。</div>
        <div class="line"></div>
        <div class="art-name">《轮回》系列吊坠</div>
        <img src="../../assets/img/popular/lunhui1.jpg" class="art-img">
        <img src="../../assets/img/popular/lunhui2.jpg" class="art-img">
        <div class="art-desc">日出日落，阴晴圆缺，树枝新叶生长，代表新生和生命。</div>
        <div class="art-desc">配彩色宝石，多彩而富有生机。</div>
        <div class="line"></div>
        <div class="art-name">《花窗》高定珠宝系列耳坠</div>
        <img src="../../assets/img/popular/huachuang1.jpg" class="art-img">
        <img src="../../assets/img/popular/huachuang2.jpg" class="art-img">
        <div class="art-desc">以古典风格花窗为设计灵感，以方圆为衬托，相融相合。</div>
        <div class="art-desc">融合传统经典韵味，结合当代审美设计理念。</div>
        <div class="art-desc">让艺术之魂，形于眼前。</div>
        <div class="art-desc">材质：18k金，碧玺，彩宝，翡翠，米珠（珍珠）钻石。</div>
        <div class="line"></div>
        <div style="margin-top:15px;font-weight:bold;width:100%;text-align:center;font-size:1.5em;">拾萃 原创珠宝定制</div>
        <div style="font-size:1.5em;width:100%;text-align:center;">为需要珠宝装点独一无二的你而定制！</div>
        <div class="paragraph" style="margin-top:10px;">让这些传承千年的手艺，烙上你的印记，融入你的生活。其中，<span style="font-weight:bold;font-size:1em;">蜜蜡、手串、核雕 </span>更可以提供来料加工服务，全方位、更贴心地满足你的需求。</div>
        <div style="font-size:1.5em;width:100%;text-align:center;margin-top:10px;">私人定制，让你的生活独一无二。</div>
        <p class="para" style="margin-top:2em">线上客服：</p>
        <img src="../../assets/img/popular/yoyo_wx.png" class="wx-img"></img>
        <p class="para" style="margin-top:0.5em;">微信号:xin18606208921</p>
        <p class="para" style="margin-top:0.5em;">联系电话:189-6213-1026</p>
        <div class="norm-text">公司地址：江苏省苏州市姑苏区竹辉路208号四楼 天工艺品</div>
    </div>
</template>

<style type="text/css">
    body{
        font-size: 62.5%;
    }
    .title {
        text-align: center;
        color: rgb(47,47,47);
        font-size: 2em;
        padding-top: 2em;
        font-weight: bold;
    }
    .content {
        padding: 1.5em;

    }
    .paragraph{
        text-indent: 2em;
        font-size: 1.5em;
    }
    .art-img{
        width: 100%;
        height: auto;
        margin-top:1em;
    }
    .art-name{
        font-size: 1.5em;
        font-weight: bold;
        margin-top: 1em;
    }
    .art-desc{
        line-height: 1.5em;
        font-size: 1.5em;
    }
    .line{
        width: 100%;
        height: 1px;
        background-color: #e7e7e7;
        margin-top: 1em;
    }
    .norm-text{
        font-size: 1.5em;
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

<script>
	export default {

		route:{
			data(){
				document.title = "私人定制";
			}
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'私人定制',back:true}])
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
