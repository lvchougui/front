<template>
    <tabbar></tabbar>
    
    <div class="content-bg">
        <div style="font-size:28px;color:black;text-align:center;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;margin: 0 auto;" >{{detail.title}}</div>
        <div style="height:3px;background-color:#272727;margin-left:15%;margin-right:15%;margin-top:10px;" ></div>
        <div class="content">
         <div class="product-info-desc" >{{{detail.detail}}}</div>
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
        padding: 20px;
    }
    .product-info-desc img{
        max-width: 100%;
        text-align: center;
        height: auto;
        margin-top: 5px;
    }
    .product-info-desc p{
        /*text-indent: 0 !important; */
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
            }
        },
        methods: {
            getDefaultData: function() {
                var url = "http://47.94.206.22:3001/api/article/getArticleDetail/"+this.id;
                this.$http.get(
                    url
                    )
                .then((res) => {
                    log(res)
                    if (res.status == 200) {
                        this.detail = res.data;
                    };
                })
                .catch((res) => {
                    log("error:" + JSON.stringify(res));
                });
            },
        }
    }
</script>
