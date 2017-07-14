<template>
    <tabbar></tabbar>
    
    <div class="content-bg">
        <div style="font-size:28px;color:black;text-align:center;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;margin: 0 auto;" >作品信息</div>
        <div style="height:3px;background-color:#272727;margin-left:15%;margin-right:15%;margin-top:10px;" ></div>
        <div class="content">
            <div class="product-info">
                <img :src="detail.cover+'?imageView2/1/w/1000/h/1000/interlace/1'" :style="imgStyle" >
                <div class="info-detail" :style="height:imgStyle.height">
                    <div style="width:100%;text-align:center;font-size:24px;font-family:KaiTi,KaiTi_GB2312 ! important;font-weight:600;color:black;margin-top:10px;border-bottom:1px dashed #000;">{{detail.name}}</div>
                    <div style="margin-top:20px;">作品材质：{{detail.p_material}}</div>
                    <div style="margin-top:5px;">作品尺寸：{{detail.p_size}}</div>
                    <div style="margin-top:5px;">作品重量：{{detail.p_weight}}</div>
                    <div style="margin-top:20px;word-break: break-all;display: -webkit-box;-webkit-line-clamp: 3; -webkit-box-orient: vertical;">作品简介：{{detail.summary}}</div>
                    <div id="qrcode" style="width:100px;height:100px;position:absolute;left:0;bottom:0;"></div>
                    <img src="../../assets/img/syyj/jieyuan.png" style="width:110px;position:absolute;right:20px;bottom:20px;transform:rotate(30deg)" v-if="item.is_sold">
                </div>
            </div>
             <div style="height:2px;background-color:#272727;margin-top:20px;" ></div>
             <div class="product-info-desc" style="padding:20px;">{{{detail.detail}}}</div>
         </div>
    </div>
    
    <bottom></bottom>
    
</template>
<style>
    .product-cover {
        width: 100%;
        height: auto;
    }
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
        padding: 20px;
    }
    .product-info{
        display: flex;
        flex-direction: row;
        padding: 20px;
        width: 100%;
    }
    /*.product-info img{
        width: 420px;
        height: 420px;
    }*/
    .info-detail{
        flex: 1;
        margin-left: 50px;
        position: relative;
        /*display: flex;*/
        /*flex-direction: column;*/
    }
    .product-info-desc img{
        max-width: 100%;
        text-align: center;
        height: auto;
        margin-top: 5px;
    }
</style>
<script>
    import Loading from 'vux/dist/components/loading'
    import Tabbar from '../partial/tabbar';
    import bottom from '../partial/bottom'

    export default {
        components: {
            Tabbar,
            bottom
        },
        ready: function() {
            this.id = this.$route.params.id;
            this.getDefaultData();
        },
        data: function() {
            return {
                id: '',
                detail: {},
                imgStyle:{
                    width: (document.body.clientWidth*0.7-120)/2 + 'px',
                    height: (document.body.clientWidth*0.7-120)/2 + 'px'
                },
            }
        },
        mounted: function () {
          this.$nextTick(function () {
                
                this.qrcode();
          })
      },
      methods: {

            qrcode:function () {
                $("#qrcode").qrcode({
                    text: window.location.href,
                    width:100,
                    height:100
                });
           },
        //得到默认的数据
        getDefaultData: function() {
            var url = "http://47.94.206.22:3001/api/product/getProductDetail/"+this.id;
            this.$http.get(
                url
                )
            .then((res) => {
                log(res)
                if (res.status == 200) {
                    this.detail = res.data;
                    this.qrcode();
                };
            })
            .catch((res) => {
                log("error:" + JSON.stringify(res));
            });
        },

    }
}
</script>
