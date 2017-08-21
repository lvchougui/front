<template>
    <tabbar></tabbar>
    
    <div class="content-bg">
        <div style="font-size:28px;color:black;text-align:center;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;margin: 0 auto;" >上玉元吉琢玉工作室</div>
        <div style="height:3px;background-color:#272727;margin-left:15%;margin-right:15%;margin-top:10px;" ></div>
        <div class="content" style="padding:80px;">
            <img src="../../assets/img/syyj/master/master.jpg" style="width:80%;height:auto;margin:0 auto;">
            <div style="margin-top:40px;">{{{detail.master_desc}}}</div>
            <div style="font-size:24px;color:black;text-align:center;margin: 10px auto;font-weight:700;font-family:KaiTi,KaiTi_GB2312 ! important;">荣誉成就</div>
            <div style="height:2px;background-color:#272727;" ></div>
            <img src="../../assets/img/syyj/master/top.png" style="margin:0 auto;width:30px;height:30px;margin-top:30px;">
            <div style="display:flex;flex-direction:row;">
                <div style="flex:1;display:flex;flex-direction:column;">
                    <img src="../../assets/img/syyj/master/2005.png" style="width:100%;margin-top:20px;cursor:pointer;" @click="goPrize(2005)">
                    <img src="../../assets/img/syyj/master/2009.png" style="width:100%;margin-top:30px;cursor:pointer;" @click="goPrize(2009)">
                    <img src="../../assets/img/syyj/master/2011.png" style="width:100%;margin-top:30px;cursor:pointer;" @click="goPrize(2011)">
                    <img src="../../assets/img/syyj/master/2013.png" style="width:100%;margin-top:30px;cursor:pointer;" @click="goPrize(2013)">
                   <img src="../../assets/img/syyj/master/2015.png" style="width:100%;margin-top:30px;cursor:pointer;" @click="goPrize(2015)">
                   <img src="../../assets/img/syyj/master/2017.png" style="width:100%;margin-top:60px;cursor:pointer;margin-bottom:40px;" @click="goPrize(2017)">
                </div>
                <div style="width:5px;background-color:rgba(100, 100, 100, 0.50);"></div>
                <div style="flex:1;display:flex;flex-direction:column;" >
                    <img src="../../assets/img/syyj/master/2008.png" style="width:100%;margin-top:80px;cursor:pointer;"  @click="goPrize(2008)">
                    <img src="../../assets/img/syyj/master/2010.png" style="width:100%;margin-top:70px;cursor:pointer;" @click="goPrize(2010)">
                    <img src="../../assets/img/syyj/master/2012.png" style="width:100%;margin-top:40px;cursor:pointer;"  @click="goPrize(2012)">
                    <img src="../../assets/img/syyj/master/2014.png" style="width:100%;margin-top:30px;cursor:pointer;" @click="goPrize(2014)">
                   <img src="../../assets/img/syyj/master/2016.png" style="width:100%;margin-top:50px;cursor:pointer;" @click="goPrize(2016)">
                </div>
            </div>
        </div>
    </div>

    <bottom></bottom>

</template>
<style>

    .content-bg{
        width: 100%;
        height: auto;
        background: url('../../assets/img/syyj/mainbg.jpg');
        padding-top: 150px;
    }
    .content{
        display:flex;
        flex-direction:column;
        width:70%;
        margin-left:15%;
        background-color:white;
        margin-top: 30px;
        padding: 60px;


    }
    
</style>
<script>
    import Tabbar from '../partial/tabbar';
    import bottom from '../partial/bottom'

    export default {
        components: {
            Tabbar,
            bottom
        },
        ready: function() {
            this.getDefaultData();
        },
        data: function() {
            return {
                detail:'',
                imgStyle:{
                    width: (document.body.clientWidth*0.7-120)/2 + 'px',
                    height: (document.body.clientWidth*0.7-120)/3 + 'px'
                },
            }
        },
        methods: {
            getDefaultData: function() {
                var url = "http://47.94.206.22:3001/companyPc/api/account/getConfig";
                this.$http.get(url).then((result) => {
                     if (typeof(result.data) == 'string') {
                            result.data = JSON.parse(result.data);
                        }
                    this.detail = result.data.result[0];
                    log(this.detail);
                })
            },
            goPrize(year){
                this.$route.router.go({
                    name: 'prize_item',
                    params: {
                        year: year
                    }
                });
            }
        }
    }
</script>
