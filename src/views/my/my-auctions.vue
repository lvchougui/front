<template>
    <!-- <ul class="stage-detail-list"> -->
        <div v-for="item in auctions"> 
            <div class="myauction-item" @click="goDetail(item.id)">
                <img class="item-img" :src="item.img"></img>
                <div class="item-content">
                    <div class="name">{{item.name}}</div>
                    
                    <div style="flex-direction:row;display:flex;width:100%;">
                        <div class="price">¥{{item.price}}</div>
                
                        <div class="state_tag eliminatedColor" v-if="item.result == 1">出局</div>
                        <div class="state_tag aheadColor" v-if="item.result == 2">领先</div>
                        <div class="state_tag bidDefeatColor" v-if="item.result == 3">竞拍失败</div>
                        <div class="state_tag aheadColor" v-if="item.result == 4">竞拍成功</div>
                    </div>

                    <div class="item-countdown" v-if="item.result == 3 || item.result == 4">结束时间:{{item.trueCloseTime}}</div>
                    <div class="item-countdown" v-if="item.result == 1 || item.result == 2">距结束:<clocker style="display:inline;font-size: 10px;" :time="item.trueCloseTime"></clocker></div>
                    
                    <!-- <div class="purchase" onclick="purchaseClicked">{{item.availableStock > 0 ? '立即购买' : '已售罄'}}</text> -->
                </div>
            </div>

            <div style="width:100%;text-align:centre;background-color:rgb(230,230,230);height:10px;margin:0 auto;"></div>

            <!-- <div class="card" @click="goDetail(item.id)">
                <img :src="item.img" :style = "{height: itemHeight}"/>
                <div class="time" v-if="item.status==1">{{item.closeTime}}结束</div>
                <div class="time" v-if="item.status==2">{{item.openTime}}开拍</div>
                <div class="time" v-if="item.status==3">已结束</div>
                <div class="name">{{item.name}}</div>
                <div class="stat">
                    <span class="price">¥{{item.price}}</span>
                    <span class="bids" v-if="item.status!=2">{{item.bidcount}}次出价</span>
                </div>
            </div> -->

        </div>
    <!-- </ul> -->

    <see-more :on-see="loadMoreAuctions"></see-more>
</template>

<script>
    import SeeMore from '../partial/see-more'
    import Clocker from 'vux/dist/components/clocker'

    export default {
        route:{
            data(){
                document.title="我的竞拍";
            }
        },
        components: {
            SeeMore, Clocker,
        },
        ready() {
                this.id = this.$route.params.id;
                this.$dispatch.apply(this, ['onTitleChanged', {
                    title: '我的竞拍',
                    back: true
                }]);
                // this.getAuctions();
            },
            methods: {
                getAuctions() {
                    this.$http.post('', {
                        act: 'auction_getHistoryList',
                        offset: this.offset,
                        max: this.max
                    }).then((result) => {
                        if (result && result.data && result.data.code == 200) {
                            this.auctions = result.data.datalist;
                        }
                    })
                },
                loadMoreAuctions() {
                    setTimeout(function() {
                        this.$http.post('', {
                            act: 'auction_getHistoryList',
                            offset: this.offset,
                            max: this.max
                        }).then((result) => {
                            if (result && result.data && result.data.code == 200) {
                                this.auctions = this.auctions.concat(result.data.datalist);
                            } else {
                                this.$broadcast('$InfiniteLoading:noMore');
                            }
                        });

                        this.$broadcast('$InfiniteLoading:loaded');
                        this.offset = this.offset + this.max;
                        
                    }.bind(this), 1000);     
                },
                goDetail: function(id) {
                this.$route.router.go({
                    name: 'auctionDetail_item',
                    params: {
                        id: id
                    }
                });
            },
            },
            data() {
                return {
                    auctions: [],
                    offset: 0,
                    max: 10,
                    state: '',
                }
            }
    }
</script>
<style type="text/css" scoped>
    .myauction-item {
        display: flex;
        flex-direction: row;
        padding: 10px;
        /*margin-left: 10px;
        margin-right: 10px;*/
        border: 1px solid #e7e7e7;
        height: 100px;
        /*margin-top:10px;*/
        background-color: white;
    }
    .item-img{
        display: inline-block;
        width: 100px;
        height: 100px;
    }
    .item-content{
        flex: 1;
        margin-left: 10px;
        display: flex;
        height: 100px;
        flex-direction: column;
        align-content:space-around; 
        justify-content: space-around;
        /*align-items: center;*/
    }
    .name {
        /*width: 200px;*/
        text-align: left;
        color: rgb(47,47,47);
        font-size: 14px;
        /*padding-right: 20px;*/
        /*white-space: nowrap;*/
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 3px;
        /*flex: 1;*/
        /*background-color: green;*/
        /*padding-right: 10px;*/
        /*width: 100%;*/
        /*margin-left: 120px;*/
        /*padding-right: 200px;*/
    }
    .item-countdown {
        text-align: left;
        color: gray;
        font-size: 13px;
        /*margin-top: 10px;*/
        width: 100%;
        /*background-color: green;*/
    }
    .price {
        flex: 1;
        text-align: left;
        color: rgb(88, 188, 154);
        font-size: 13px;
        height: 30px;
        line-height: 30px;
        /*margin-top: 15px;*/
        /*margin-left: 10px;*/
        /*margin-right: auto;*/
        /*margin-right: 50%;*/
        /*width: auto;*/
        /*background-color: purple;*/
    }
    .state_tag {   
        /*position: absolute;*/
        width: 60px;
        text-align: center;
        margin-top: 5px;
        height: 20px;
        line-height: 20px;
        /*width: 60%;*/
        /*padding-right: 100px;*/
        /*margin-left: 100px;*/
        /*text-align: right;*/
        /*margin-right: 10px;*/
        /*margin-left: auto;*/
        /*width: 100px;*/
        /*margin-top: 15px;*/
        font-size: 10px;
        color: white;
        /*background-color: orange;*/
    }
    .eliminatedColor {
        background-color: rgb(89,87,87);
    }
    .aheadColor {
        background-color: rgb(88,188,154);
    }
    .bidDefeatColor {
        background-color: rgb(159,160,160);
    }
</style>
