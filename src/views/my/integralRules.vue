<style type="text/css">
	.intro-btm {
		line-height: 18px;
	}
	.intro-btm span.tip{ 
		font-size: 12px !important;
	}
	.intro-btm .price {
		font-size: 12px !important;
	}

	.rules p{
		margin:5px 10px 5px 10px;
		font-size: 15px;
	}

	.bottomView{
		position: fixed;
		width: 100%;
		height:130px;
		bottom: 0px;
	}

	.bottomView img{
		width: 40px;
		height: 40px;
		background-color: red;
	}
	.bottomView p{
		text-align:center
	}



</style>

<template>

    <group title="" >
         
    </group>
    <div class="rules">
       <p>1.注册+50个积分，一个用户只有一次</p>
       <p>2.每天首次登录+5个积分</p>
       <p>3.出价一次+1个积分，一天最高获得10个积分</p>
       <p>4.完善个人资料，首次修改一个选项+2个积分，一个用户只
有一次</p>
       <p>5.分享成功1次+2个积分，一天最高获得20个积分</p>
       <p>6.去应用市场给好评+20个积分，同一个用户、同一手机仅
限一次</p>
       <p>7.用户支付拍品或者商品成功后7天内，系统自动发放与商品价值等额的积分（去除优惠券后的金额）</p>
       <p>8.发一条艺趣+2个积分，一天最高获得10个积分</p>
       <p>9.艺趣评论一条+2个积分，一天最高获得20个积分</p>
       <p>10.点赞一次+1个积分，一天最高获得20个积分</p>
       <p>11.推荐好友+5个积分，一天最高获得50个积分</p>
    </div>

    <div class="bottomView">
         <p>
         	<img src="../../assets/img/icon.png">
         </p>
         <p style="margin-top:10px">www.tiangongyipin.com</p>
    	 
    </div>

   <!--   <div class="bottomView">
         <div style="float:left;margin-left:10px;width:15%">
         	 <img src="../../assets/img/icon_back.png">
         </div>
         <div style="float:left;width:60%">
         	<p style="text-align:center;line-height:44px;">提现</p>    	
         </div>
         <div style="float:right;width:15%">
         	 <img style="width:40px;height:40px;background-color:red;margin-right:10px" src="../../assets/img/icon.png">
         </div>
    </div> -->

   
</template>

<script>
		import Cell from 'vux/dist/components/cell'
		import Group from 'vux/dist/components/group'

	export default {

		route:{
			data(){
				document.title = "积分规则";
			}
		},
		components: {
			Cell,
			Group
		},
		ready:function(){
			this.$dispatch.apply(this,['onTitleChanged',{title:'积分规则',back:true}])
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
