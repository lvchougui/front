<template>
	<div id="first_logo" :style="contentStyle"  style="display:none;">
		<img src="../assets/img/syyj/logo.png">
	</div>
	<div class="open-content">
		<img id="front6" src="../assets/img/syyj/front6.png" style="top:150px;left:-100%;opacity:0.2;">
		<img id="front5" src="../assets/img/syyj/front5.png" style="top:-100%;right:57%;opacity:0.2;">
		<img id="front4" src="../assets/img/syyj/front4.png" style="top:150px;right:-100%;opacity:0.2;">
		<img id="front3" src="../assets/img/syyj/front3.png" style="top:150px;right:-100%;opacity:0.2;">
		<img id="front2" src="../assets/img/syyj/front2.png" style="top:150px;right:-100%;opacity:0.2;">
		<img id="front1" src="../assets/img/syyj/front1.png" style="top:150px;right:-100%;opacity:0.2;">
	</div>
</template>
<style type="text/css">
	.open-content img{
		position: absolute;
	}
	#first_logo{
		display: flex;
		align-items: center;
		justify-content: center;
		/*opacity: 0;*/
		/*filter:alpha(opacity=50);*/
		/*text-align: center;*/
	}
</style>
<script>
	export default {
		components: {
		},
		data(){
			return {
				contentStyle:{
					width:document.body.clientWidth+'px',
					height:document.documentElement.clientHeight+'px'
				}
			}
		},
		ready(){
			var that = this;
			$('#first_logo').fadeIn(4000,function(){
				$('#first_logo').fadeOut(3000,function(){
					$('#front1').animate({
						opacity: '1',
						right:'25%'
					},5000);
					$('#front2').animate({
						opacity: '1',
						right:'33%'
					},4000);
					$('#front3').animate({
						opacity: '1',
						right:'41%'
					},3000);
					$('#front4').animate({
						opacity: '1',
						right:'49%'
					},2000);
					$('#front5').animate({
						opacity: '1',
						top:'420px'
					},5000);
					$('#front6').animate({
						opacity: '1',
						left:'25%'
					},5000,function(){
						setTimeout(function(){
							that.$route.router.go({
								name: 'home',
							});
						},800);
					});
				});
			});
			
		}
	}
</script>