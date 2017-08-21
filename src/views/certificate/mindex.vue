<template>

    <div class="content-bg" style="padding-top:50px;">
        <div style="font-size:28px;color:black;text-align:center;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;margin: 0 auto;" >证书查询</div>
        <div style="height:3px;background-color:#272727;margin-left:15%;margin-right:15%;margin-top:10px;" ></div>
        <div class="certcontent">
            <div class="mcert-search-part" style="    margin-left: 15%;margin-right: 15%;margin-top: 30px;">
                <input v-model="certCode" id="certInput" placeholder="证书编号" class="search-input" >
                <div  @click="searchBtn" style="background-color:#ae0000;color:white;line-height:45px;padding-left:15px;padding-right:15px;font-size:18px;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:800;cursor:pointer;">查询</div>
            </div>
            <div style="height:500px;width:100%;"></div>
        </div>
    </div>


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
    .certcontent{
        display:flex;
        flex-direction:column;
        margin-top: 30px;
        /*padding: 20px;*/
    }
    .product-info{
        display: flex;
        flex-direction: row;
        padding: 40px;
        width: 100%;
    }
    
    .mcert-search-part{
        display: flex;
        flex-direction: row;
        height: 50px;
        flex: 1;
        border: 4px solid #ae0000;
        border-radius: 5px;
        /*width: 500px;*/
        /*margin: 30px auto;*/
    }
    .search-input{
        flex: 1;
        padding-left: 20px;
        padding-right: 20px;
        line-height: 40px;
        outline:none;
        border:none;
    }
    .search-btn{
        text-align: center;
        justify-content: center;
        align-items: center;
        background-color: black;
        padding-left: 12px;
        padding-right: 10px;
        cursor:pointer;
    }
</style>
<script>

    export default {

        ready: function() {
        },
        data: function() {
            return {
                certCode: '',
            }
        },
        
        methods: {

            searchBtn:function(){
                if (!this.certCode) {
                    alert("请输入证书编码");
                    $("#certInput").focus();
                    return;
                }else{
                    var url = "http://47.94.206.22:3001/api/cert/getFrontCertDetail/"+this.certCode;
                    this.$http.get(
                        url
                        )
                    .then((res) => {
                        log(res);
                        if (res.status == 200) {
                            if (typeof(res.data) == 'string') {
                                res.data = JSON.parse(res.data);
                            }
                            if (res.data) {
                                this.$route.router.go({
                                    name: 'phoneCertDetail_item',
                                    params: {
                                        certCode: this.certCode
                                    }
                                });
                            }else{
                                alert("未查找到该证书的信息");
                            }
                        }else{
                            alert("未查找到该证书的信息");
                        }
                    })
                    .catch((res) => {
                        log("error:" + JSON.stringify(res));
                    });
                }
            }

        }
    }
</script>
