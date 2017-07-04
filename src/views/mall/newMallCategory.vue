<style type="text/css">
    .mall-cate-list{
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling:touch;
        padding-left: 10px;
        padding-right: 10px;
        position: fixed;
        z-index: 999;
        background-color: white;
    }
    .mall-cate-list li{
        margin-right: 8px;
        /*border-radius: 15px;*/
        /*border:1px solid #e7e7e7;*/
        padding-left: 5px;
        padding-right: 5px;
        line-height: 30px;
        text-align: center;
        color: #c8c8c8;
        font-size: 1.3em;
    }
    .mall-cate-selected{
        /*border:1px solid #58bc9a !important;*/
        border-bottom: 3px solid #58bc9a !important; 
        color: #58bc9a !important;
    }
    .trouble-label{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
    }
    .trouble-label-line{
        flex: 1;
        height: 1px;
        background-color: #e7e7e7;
    }
    .trouble-xie{
        font-size: 0.8em;
        color: #e7e7e7;
        margin-left: 5px;
        margin-right: 5px;
    }
    .auction-list-item {
        display: flex;
        flex-direction: row;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 8px;
        padding-bottom: 8px;
        height: 120px;
        border-bottom:1px solid #e7e7e7;
    }
    .list-item-img{
        display: inline-block;
        width: 120px;
        height: 120px;
        border-radius: 5px;
    }
    .list-item-content{
        display: flex;
        flex: 1;
        flex-direction: column;
        align-content:space-around; 
        margin-left: 15px;
        justify-content: space-around;
    }
    .mall-slide-banner{
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling:touch;
    }
    .mall-banner-item{
        margin-left: 10px;
    }
    .mall-slide-box::-webkit-scrollbar {display:none}
    .mall-slide-image{
        width: 75px;
        height: 75px;
        border-radius: 5px;
    }
</style>
<template>
    <ul class="mall-cate-list">
        <li v-for="tab in categories" :class="{'mall-cate-selected': singleAuctionTabPosition === tab.id}" @click="goSingleAuctionTabPosition(tab.id)">
            {{tab.name}}
            <div class="pointer"></div>
        </li>
    </ul>
    <div style="height:30px;width:100%;" v-if="brands.length == 0">
    </div>
    <div style="margin-top:40px;" v-if="brands.length > 0">
        <ul class="mall-slide-banner" >
            <li class="mall-banner-item" v-for="item in brands" @click="goDetail(item.id)">
                <img class="mall-slide-image" :src="item.logo" />
            </li>
        </ul>
    </div>
    <ul class="stage-detail-list activity-good-list">
        <li v-for="item in mainData">
            <div class="card" @click="goGood(item)">
                <img :src="item.img"  :style = "{height: itemHeight}"/>
                <div class="name" style="padding-left:0.5em;padding-right:0.5em;font-size:1.2em;">{{item.name}}</div>
                <div class="stat" style="padding-left:0.5em;padding-right:0.5em;">
                    <span style="color:grey;float:left;font-size:12px;">{{item.nickname}}</span>
                    <span class="price" style="color:#58bc9a;float:right;">¥{{item.price}}</span>
                </div>
            </div>
        </li>
    </ul>
    <see-more :on-see="loadGoods"></see-more>
</template>
<script>
// import InfiniteLoading from 'vue-infinite-loading'
import SeeMore from '../partial/see-more'
import {
    isLogined
}
from '../../lib/auth'

export default {
    name: 'single-auction-list',
    props: {
        act: {
            type: String
        }
    },
    components: {
        // InfiniteLoading,
        SeeMore
    },
    ready() {
        this.getCategory();
    },
    data() {
        return {
            offset: 0,
            max: 12,
            id: -2,
            singleAuctionTabPosition: 0,
            singleAuctionTabs:[],
            temp: [],
            mainData: [],

            categories: [],
            brands: []
        }
    },
    methods: {
        loadGoods: function() {
            setTimeout(function() {
                this.$http.post('', {
                    act: "mall_getMallByCid",
                    group: "mall",
                    id: this.$route.params.id,
                    cid: this.singleAuctionTabPosition,
                    offset: this.offset,
                    max: this.max
                }).then((result) => {
                    if (result.data.code == 229) {
                        this.temp = [];
                        this.$broadcast('$InfiniteLoading:noMore');
                    } else {
                        this.$broadcast('$InfiniteLoading:loaded');
                        this.temp = result.data.datalist;
                    }
                    this.mainData = this.mainData.concat(this.temp);
                    this.offset = this.offset + this.max;
                })
            }.bind(this), 1000);
        },

        getCategory() {
            this.$http.post('', {
                act: "mall_getMallListByCid",
                group: "mall",
                id: this.$route.params.id
            }).then((result) => { 
                if (result.data.code == 200) {
                    log(result.data.data);
                    this.categories = result.data.data.category
                    this.brands = result.data.data.brand
                    log(this.brands);
                    this.singleAuctionTabPosition = this.categories[0].id;
                };

                // this.singleAuctionTabs = result.data.datalist;
                // this.id = this.singleAuctionTabs[0].id;
                // this.singleAuctionTabPosition = this.singleAuctionTabs[0].id;
                // this.getSingleAuction();
            })
        },

        goSingleAuctionTabPosition(id) {
            this.id = id;
            this.offset = 0;
            this.mainData = [];
            this.loadGoods();
            this.singleAuctionTabPosition = id;
        },
        goDetail: function(id) {
            this.$route.router.go({
                name: 'brandDetail_item',
                params: {
                    id: id
                }
            });
        },
        goGood: function (item) {
            if (item.id > 0) {
                this.$route.router.go({
                    name: 'mallProductDetail_item',
                    params: {
                        id: item.id
                    }
                });
            };
            
        },
    },
    
}
</script>
