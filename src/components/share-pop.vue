<style type="text/css">
.share-board {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2001;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
}
.share-board > div {
    position: absolute !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
}
.share-board .share-content-container{
    background-color: #fff;
    width: 80%;
    padding: 20px 0 12px 0;
    border-radius: 3px;
    text-align: center;
}
.share-board .invite-btn {
    display: inline-block;
    width: 80%;
    background-color: #58bc9a;
    color: #fff;
    padding: 8px 0;
    font-size: 14px !important;
    border-radius: 3px;
}
.share-board .share-content{
    display: inline-block;
    padding: 16px 0;
    width: 80%;
    line-height: 18px;
    text-align: center;
}
.share-board .close-btn {
    position: absolute;
    top: 5px;
    color: #666;
}
</style>
<template>
    <div class="share-board" v-show="show">
	    <div class="share-content-container">
	        <i class="close-btn material-icons" @click="show = false">close</i>
	        <img :src="img" style="width:60px;height:60px;border-radius:60px;">
	        <span class="share-content">{{content}}</span>
	        <a class="invite-btn" @click="showGuide">{{actionText}}</a>
	    </div>
	</div>
</template>
<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			},
			img:{
				type:String,
				default:''
			},
			content:{
				type:String,
				default:''
			},
			actionText:{
				type:String,
				default:'分享'
			}
		},
		methods:{
			showGuide(){
				this.show=false;
			}
		}
	}
</script>