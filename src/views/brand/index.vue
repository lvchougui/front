<template>
    <tabbar></tabbar>
    
    <div class="content-bg">
        <div style="font-size:28px;color:black;text-align:center;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;margin: 0 auto;" >上玉元吉琢玉工作室</div>
        <div style="height:3px;background-color:#272727;margin-left:15%;margin-right:15%;margin-top:10px;" ></div>
        <div class="content">

            <div>{{{detail.master_desc}}}</div>
            
            
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
                var url = "http://localhost:3001/companyPc/api/account/getConfig";
                this.$http.get(url).then((result) => {
                    
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
