<template>
    <tabbar></tabbar>
    
    <div class="content-bg">
        <div style="font-size:28px;color:black;text-align:center;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;margin: 0 auto;" >作品欣赏</div>
        <div style="height:3px;background-color:#272727;margin-left:15%;margin-right:15%;margin-top:10px;" ></div>
        <div class="content">

            <div style="display:flex;flex-direction:row;height:120px;padding-left:60px;padding-right:60px;">
                <div style="font-size:24px;color:black;height:100%;text-align:center;line-height:120px;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;">上玉元吉琢玉工作室</div>
                <div class="verticle-line"></div>
                <div class="search-part">
                    <div style="color:black;line-height:36px;padding-right:20px;padding-left:20px;background-color:#c7c7c7;">商品</div>
                    <input v-model="searchProductText" placeholder="题材、样式" class="search-input">
                    <div class="search-btn" @click="searchByName">
                        <img src="../../assets/img/syyj/search.png" style="width:20px;height:20px;margin-top:8px;">
                    </div>
                </div>
                <div class="verticle-line"></div>
                <div class="contact-part">
                    <img src="../../assets/img/syyj/telephone.png" style="width:50px;height:50px;">
                    <div style="margin-left:15px;display:flex;flex-direction:column;font-family: KaiTi,KaiTi_GB2312 ! important;color:black;">
                        <div>客服热线：0512-67526713</div>
                        <div>联系手机：18625008866</div>
                        <div>联系QQ：108528708</div>
                    </div>
                </div>
            </div>

            <div style="width:100%;height:2px;background-color:#e7e7e7;"></div>
            <div style="display:flex;flex-direction:row;padding:20px;margin-top:20px;margin-left:20px;margin-right:20px;">
                <div style="font-size:20px;font-weight:800;font-family: KaiTi,KaiTi_GB2312 ! important;padding-top:4px;padding-bottom:5px;color:black;">分类:</div>
                <ul class="product-cate-list">
                    <li v-for="item in cateList" :class="{'product-cate-selected': cateId === item.id}" @click="searchById(item.id)">
                        {{item.name}}
                        <div class="pointer"></div>
                    </li>
                </ul>
            </div>
            
            <div style="-moz-column-count:4;-webkit-column-count:4;column-count:4;-moz-column-gap:20px;-webkit-column-gap:20px;column-gap:20px;padding:40px;">
                <div class="article-item" style="background-color:white;" v-for="item in productList" @click="goProduct(item)">
                    <img :src="item.cover+'?imageView2/1/w/500/h/500/interlace/1'" :style="imgStyle">
                    <div style="font-size:16px;margin: 10px auto;line-height: 1;">
                        {{item.name}}</div>
                    </div> 
                </div>
                <div style="margin:10px auto;text-align:center;" class="page-component">
                    <Page :current="page" size="small" :total="total" show-total @on-change="change"></Page>
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
            padding: 20px;
        }

        .page-component ul{
            text-align:center;
            list-style-type:none;
        }
        .page-component ul li{
            list-style-type:none !important;  
            display:inline !important;  
        }

        .verticle-line{
            width:2px;
            height:70px;
            background-color:#c7c7c7;
            margin-top: 15px;
            margin-left: 30px; 
            margin-right: 30px;
        }
        .search-part{
            display: flex;
            flex-direction: row;
            height: 40px;
            flex: 1;
            margin-top: 30px;
            border: 2px solid black;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
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
        .contact-part{
            display: flex;
            flex-direction: row;
            height: 100px;
            justify-content: center;
            align-items: center;
        }
        .search-input{
            flex: 1;
            padding-left: 20px;
            padding-right: 20px;
            line-height: 40px;
            outline:none;
            border:none;
        }

        .article-item{
            display: flex;
            flex-direction: column;
            font-family: KaiTi,KaiTi_GB2312 ! important;
            color: black;
            margin-bottom: 20px;
        }
        /*.article-item img{width: 100%;height: auto;}*/
        .article-item img:hover{opacity: 0.8;filter: alpha(opacity=80);}
        .product-cate-list{
            overflow: hidden;
            list-style-type:none;
        }
        .product-cate-list li{
            line-height: 30px;
            font-size: 15px;
            background-color: none;
            list-style-type:none !important;  
            display:inline !important;
            padding-left: 10px;padding-right: 10px;
            padding-top: 5px;
            padding-bottom: 5px;
            float: left;
            flex: 1;
            margin-left: 20px;
            cursor: pointer;
        }
        .product-cate-selected{
            background-color: #c8c8c8;
            color: black !important;
            font-size: 16px;
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
                this.searchProductText = this.$route.query.searchKey;
                this.getCates();
                this.getDataList();
            },
            data: function() {
                return {
                    productList: [],
                    cateList:[],
                    page:1,
                    size:16,
                    total:'',
                    imgStyle:{
                        width: (document.body.clientWidth*0.7-192)/4-20 + 'px',
                        height: (document.body.clientWidth*0.7-192)/4-20 + 'px'
                    },
                    searchProductText:'',
                    cateId:0
                }
            },
            methods: {
                getDataList: function() {
                    var url = "http://47.94.206.22:3001/api/product/frontGetProductList";
                    this.$http.post(url, {
                        page:this.page,
                        size:this.size,
                        cateId:this.cateId,
                        name:this.searchProductText
                    }).then((result) => {
                        log(result)
                        this.productList = result.data.array;
                        this.total = result.data.counts;
                    })
                },
                change(page){
                    var url = "http://47.94.206.22:3001/api/product/frontGetProductList";
                    this.page = page;
                    log(this.page)
                    this.$http.post(url, {
                        page:this.page,
                        size:this.size,
                        cateId:this.cateId,
                        name:this.searchProductText
                    }).then((result) => {

                        this.productList = result.data.array;
                        this.total = result.data.counts;
                    })
                },
                getCates(){
                    var url = "http://47.94.206.22:3001/api/cate/getCateList";
                    this.$http.get(url).then((result) => {
                        this.cateList = result.data;
                        var cateAll ={
                            name:'全部',
                            id:0
                        };
                        this.cateList.unshift(cateAll);
                    })
                },
                goProduct(item){
                    if (item.id > 0) {
                        this.$route.router.go({
                            name: 'mallDetail_item',
                            params: {
                                id: item.id
                            }
                        });
                    };
                },
                searchById(cateId){
                    this.page = 1;
                    this.cateId = cateId;
                    this.getDataList();
                },
                searchByName(){
                    if (!this.searchProductText||this.searchProductText.length==0) {
                        alert("请输入搜索关键字");
                        return;
                    }
                    this.getDataList();
                }
            }
        }
    </script>
