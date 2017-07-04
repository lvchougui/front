<style type="text/css">
    .auction-cate-list{
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling:touch;
        margin-left:10px;
        margin-top: 8px;
    }
    .auction-cate-list li{
        margin-right: 8px;
        border-radius: 15px;
        border:1px solid #e7e7e7;
        padding-left: 10px;
        padding-right: 10px;
        line-height: 30px;
        text-align: center;
        color: #c8c8c8;
        font-size: 1.3em;
    }
    .auction-cate-selected{
        border:1px solid #58bc9a !important;
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
        height: 100px;
        border-bottom:1px solid #e7e7e7;
    }
    .list-item-img{
        display: inline-block;
        width: 100px;
        height: 100px;
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
</style>
<template>
    <ul class="auction-cate-list">
        <li v-for="tab in singleAuctionTabs" :class="{'auction-cate-selected': singleAuctionTabPosition === tab.id}" @click="goSingleAuctionTabPosition(tab.id)">
            #{{tab.name}}#
            <div class="pointer"></div>
        </li>
    </ul>
    <div class="trouble-label">
        <div class="trouble-label-line"></div>
        <div class="trouble-xie">/////</div>
        <div style="font-size:1.4em;">精品拍卖</div>
        <div class="trouble-xie">/////</div>
        <div class="trouble-label-line"></div>
    </div>
    <div v-for="item in mainData"> 
        <div class="auction-list-item" @click="goDetail(item.id)">
            <img class="list-item-img" :src="item.img"></img>
            <div class="list-item-content">
                <div style="font-size:14px;color:black;font-weight:600;">{{item.name}}</div>
                <div style="font-size:12px;">{{item.brandName}}</div>
                <div v-if="item.status == 1">
                    <div style="font-size:11px;color:grey;">结拍时间：{{item.trueCloseTime}}</div>
                    <div style="font-size:12px;">当前价：¥{{item.currentPrice}}</div>
                    <div style="color:#58bc9a;font-size:12px;">#拍卖中#</div>
                </div>
                <div v-if="item.status == 2">
                    <div style="font-size:11px;color:grey;">开拍时间：{{item.openTime}}</div>
                    <div style="font-size:12px;">起拍价：¥{{item.initPrice}}</div>
                    <div style="color:#58bc9a;font-size:12px;">#预展中#</div>
                </div>
                <div v-if="item.status == 3">
                    <div style="font-size:11px;color:grey;">结拍时间：{{item.trueCloseTime}}</div>
                    <div style="font-size:12px;">成交价：¥{{item.finalPrice}}</div>
                    <div style="color:#58bc9a;font-size:12px;">#已结拍#</div>
                </div>
                <div v-if="item.status == 4">
                    <div style="font-size:11px;color:grey;">结拍时间：{{item.trueCloseTime}}</div>
                    <div style="font-size:12px;">起拍价：¥{{item.initPrice}}</div>
                    <div style="color:#58bc9a;font-size:12px;">#流拍#</div>
                </div>
            </div>
        </div>
    </div>
    <see-more :on-see="loadSingleAuction"></see-more>
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
            max: 10,
            id: -2,
            singleAuctionTabPosition: -2,
            singleAuctionTabs:[],
            temp: [],
            mainData: []
        }
    },
    methods: {
        getSingleAuction() {
            this.$http.post('', {
                act: this.act,
                offset: this.offset,
                max: this.max,
                cateId: this.id
            }).then((result) => {
                this.mainData = result.data.datalist;
            })
        },
        loadSingleAuction: function() {
            setTimeout(function() {
                this.offset = this.offset + this.max;
                this.$http.post('', {
                    act: this.act,
                    offset: this.offset,
                    max: this.max,
                    cateId: this.id
                }).then((result) => {
                    if (result.data.code == 229) {
                        this.temp = [];
                        this.$broadcast('$InfiniteLoading:noMore');
                    } else {
                        this.temp = result.data.datalist;
                    }
                })
                this.mainData = this.mainData.concat(this.temp);
                this.$broadcast('$InfiniteLoading:loaded');
            }.bind(this), 1000);
        },

        getCategory() {
            this.$http.post('', {
                act: "category_getList",
            }).then((result) => { 
                this.singleAuctionTabs = result.data.datalist;
                this.id = this.singleAuctionTabs[0].id;
                this.singleAuctionTabPosition = this.singleAuctionTabs[0].id;
                this.getSingleAuction();
            })
        },

        goSingleAuctionTabPosition(id) {
            this.id = id;
            this.offset = 0;
            this.getSingleAuction();
            this.singleAuctionTabPosition = id;
        },
        goDetail: function(id) {
            this.$route.router.go({
                name: 'auctionDetail_item',
                params: {
                    id: id
                }
            });
        }
    },
    
}
</script>
