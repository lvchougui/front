<template>
    <tabbar></tabbar>
    
    <div class="content-bg">
        <div style="font-size:28px;color:black;text-align:center;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;margin: 0 auto;" >获奖作品</div>
        <div style="height:3px;background-color:#272727;margin-left:15%;margin-right:15%;margin-top:10px;" ></div>
        <div class="content">
            <div v-for="item in prizeList" style="padding: 20px;width: 100%;" @click="goDetail(item)">
                <div v-if="$index%2>0" style="display: flex;flex-direction: row;">
                    <div class="info-detail" :style="height:imgStyle.height">
                        <div style="width:100%;text-align:center;font-family:KaiTi,KaiTi_GB2312 ! important;font-weight:600;color:black;margin-top:10px;">
                        <span style="border-bottom:1px solid #000;font-size:24px;">{{item.title}}</span></div>
                        <div style="margin-top:20px;word-break: break-all;display: -webkit-box;-webkit-line-clamp: 3; -webkit-box-orient: vertical;line-height:20px;text-indent:2em;">{{item.summary}}</div>
                        <div style="position:absolute;right:0;bottom:0;">{{item.honor_year}}/{{item.honor_date}}</div>
                    </div>
                    <img :src="item.cover+'?imageView2/1/w/1200/h/800/interlace/1'" :style="imgStyle" style="margin-left:30px;">
                </div>
                <div v-else style="display: flex;flex-direction: row;">
                    <img :src="item.cover+'?imageView2/1/w/1200/h/800/interlace/1'" :style="imgStyle" >
                    <div class="info-detail" :style="height:imgStyle.height" style="margin-left:30px;">
                        <div style="width:100%;text-align:center;font-family:KaiTi,KaiTi_GB2312 ! important;font-weight:600;color:black;margin-top:10px;">
                        <span style="border-bottom:1px solid #000;font-size:24px;">{{item.title}}</span></div>
                        <div style="margin-top:20px;word-break: break-all;display: -webkit-box;-webkit-line-clamp: 3; -webkit-box-orient: vertical;line-height:20px;text-indent:2em;">{{item.summary}}</div>
                        <div style="position:absolute;right:0;bottom:0;">{{item.honor_year}}/{{item.honor_date}}</div>

                    </div>
                </div>
                <div style="height:1px;margin-top:40px;border-bottom:1px dashed #272727;" ></div>
            </div>
            <div style="margin:10px auto;text-align:center;" class="page-component">
                <Page :current="1" size="small" :total="total" show-total @on-change="change"></Page>
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
    .info-detail{
        flex: 1;
        position: relative;
    }
    .page-component ul{
        text-align:center;
        list-style-type:none;
    }
    .page-component ul li{
        list-style-type:none !important;  
       display:inline !important;  
    }
</style>
<script>
    import Tabbar from '../partial/tabbar';
    import bottom from '../partial/bottom'
    import {Page} from 'iview';

    export default {
        components: {
            Page,
            Tabbar,
            bottom
        },
        ready: function() {
            this.year = this.$route.params.year;
            this.getDefaultData();
        },
        data: function() {
            return {
                year:'',
                prizeList: [],
                page:1,
                size:10,
                total:'',
                imgStyle:{
                    width: (document.body.clientWidth*0.7-180)/2 + 'px',
                    height: (document.body.clientWidth*0.7-180)/3 + 'px'
                },
            }
        },
        methods: {
            getDefaultData: function() {
                var url = "http://localhost:3001/api/honor/getHonorListByYear";
                this.$http.post(url, {
                    page:this.page,
                    size:this.size,
                    year:this.year
                }).then((result) => {
                    
                    this.prizeList = result.data.array;
                    this.total = result.data.counts;
                    log(this.total);
                })
            },
            change(page){
                var url = "http://localhost:3001/api/honor/getHonorListByYear";
                this.page = page;
                this.$http.post(url, {
                    page:this.page,
                    size:this.size,
                    year:this.year
                }).then((result) => {
                    
                    this.prizeList = result.data.array;
                    // this.total = result.data.counts;
                    log(this.total);
                })
            },
            goDetail(item){
                if (item.r_prod > 0) {
                this.$route.router.go({
                    name: 'mallDetail_item',
                    params: {
                        id: item.r_prod
                    }
                });
            };
            }
        }
    }
</script>
