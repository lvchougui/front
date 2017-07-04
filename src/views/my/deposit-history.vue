<template>
    <!-- <ul class="stage-detail-list"> -->
        <div v-for="item in auctions"> 
            <div class="mydeposit-item">
                <div class="item-content">

                    <div class="stagename">{{item.stagename}}</div>
                    
                    
                    <div class="deposit-createtime">{{item.time}}</div>
                    
                    <!-- <div class="purchase" onclick="purchaseClicked">{{item.availableStock > 0 ? '立即购买' : '已售罄'}}</text> -->
                </div>
                <div class="deposit-price positive-color" v-if='item.type == 1'>+{{item.price}}</div>
                <div class="deposit-price negative-color" v-if='item.type != 1'>-{{item.price}}</div>
            </div>

            <!-- <div style="width:100%;text-align:centre;background-color:rgb(230,230,230);height:10px;margin:0 auto;"></div> -->
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
                document.title="保证金";
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
                        act: 'deposit_getListByStage',
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
                            act: 'deposit_getListByStage',
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
    .mydeposit-item {
        display: flex;
        flex-direction: row;
        padding: 10px;
        /*margin-left: 10px;
        margin-right: 10px;*/
        border: 1px solid #e7e7e7;
        /*height: 100px;*/
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
        /*height: 100px;*/
        flex-direction: column;
        align-content:space-around; 
        justify-content: space-around;
        /*align-items: center;*/
    }
    .stagename {
        /*width: 200px;*/
        text-align: left;
        color: rgb(47,47,47);
        font-size: 14px;
        /*padding-right: 20px;*/
        /*white-space: nowrap;*/
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 3px;
        height: 30px;
        line-height: 30px;
        /*flex: 1;*/
        /*background-color: green;*/
        /*padding-right: 10px;*/
        /*width: 100%;*/
        /*margin-left: 120px;*/
        /*padding-right: 200px;*/
    }
    .deposit-createtime {
        text-align: left;
        color: gray;
        font-size: 13px;
        /*margin-top: 10px;*/
        width: 100%;
        height: 30px;
        line-height: 30px;
        /*background-color: blue;*/
    }
    .deposit-price {   
        /*position: absolute;*/
        /*float: right;*/
        /*text-align: right;*/
        /*align-content:space-around; 
        justify-content: space-around;*/
        /*height: 100%;*/
        height: 60px;
        line-height: 60px;
        margin-top: 3px;
/*        vertical-align: middle;
        display: table-cell;*/
        /*width: 60%;*/
        /*padding-right: 100px;*/
        /*margin-left: 100px;*/
        /*text-align: right;*/
        /*margin-right: 10px;*/
        /*margin-left: auto;*/
        /*width: 100px;*/
        /*margin-top: 15px;*/
        font-size: 20px;
        /*background-color: orange;*/
    }
    .positive-color {
        color: rgb(88,188,154);
    }
    .negative-color {
        color: rgb(47,47,47);
    } 
</style>
