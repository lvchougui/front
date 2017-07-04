<style>
    .home-top {
        background-color: #fafafa;
        border-bottom: 1px solid rgb(220, 220, 220);
    }

    .home-tabs {
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .home-tabs li {
        padding-left: 15px;
        padding-right: 15px;
        line-height: 30px;
        text-align: center;
        color: grey;
        font-size: 1.3em;
    }

    .home-tabs-selected {
        border-bottom: 3px solid #000000 !important;
        color: black !important;
    }

    .home-preference-cover {
        width: 100%;
        height: auto;
    }

    .home-item-title {
        display: flex;
        flex-direction: row;
    }

    .home-item-stage {
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }

    .home-item-stage div {
        color: white;
    }

    .home-carousel {
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .home-carousel-item {
        margin-right: 10px;
        margin-left: 10px;
        text-align: center;
    }

    .home-carousel::-webkit-scrollbar {
        display: none
    }

    .home-item-carousel {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 270px;
        height: 100px;
    }

    .category-preference-item {
        background-color: white;
        width: 100%;
        margin-bottom: 10px;
        margin: 0px;
        /*height: 100px;*/
    }

    .div-float-left {
        float: left;
        /*background-color: green;*/
        margin-left: 3%;
        /*margin-right: 0.5%;*/
        margin-bottom: 3%;
    }

    .div-float-right {
        float: right;
        /*background-color: purple;*/
        /*margin-left: 0.5%;*/
        margin-right: 3%;
        margin-bottom: 3%;
    }

    .slide-box {
        display: -webkit-box;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .slide-item {
        margin-right: 10px;
        text-align: center;
    }

    .slide-box::-webkit-scrollbar {
        display: none
    }

    .section-header {
        width: 100%;
        text-align: center;
        font-size: 1.5em;
        color: #2F2F2F;
        line-height: 1.5em;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-content: space-around;
        justify-content: space-around;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .brand-product-logo {
        width: 75px;
        height: 75px;
        margin: 15px;
    }

    .brandName {
        width: 100%;
        text-align: left;
        color: rgb(47, 47, 47);
        font-size: 15px;
    }

    .address_num {
        width: 100%;
        text-align: left;
        color: rgb(100, 100, 100);
        font-size: 13px;
    }

    .brand-product-desc {
        color: gray;
        font-size: 13px;
        margin-left: 15px;
        margin-right: 15px;
        margin-top: 10px;
        margin-bottom: 10px;
        /*padding: 10px;*/
    }

    .brand-product-parent {
        align-items: center;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .brand-product-row {
        height: 33%;
        display: flex;
    }

    .brand-product-item {
        width: 33%;
        margin-left: 15px;
        margin-right: 15px;
    }

    .brand-product-lot {
        width: 100%;
        height: 100%;
    }


    .slide-fade-enter-active {
      transition: all .3s ease;
  }
  .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for <2.1.8 */ {
      transform: translateX(10px);
      opacity: 0;
  }  
</style>
<template>
    <!-- <Slider :value.sync="value" range></Slider> -->


    <div style="line-height:1;">
        <img :src="serviceRule" class="home-preference-cover" v-if="serviceRule && serviceRule.length>0">
    </div>
    
    <!-- <Page :current="1" :total="100"  show-total @on-change="change"></Page> -->

    <div style="width:100%;height:5px;background-color:#efefef;" v-if="serviceRule && serviceRule.length>0"></div>
    <div :id="'anchor-'+1" class="index-part" style="display:flex;flex-direction:row;padding-top:5px;padding-bottom:5px;" v-if="advlist && advlist.length>0">
        <img :src="advlist[0].img" @click="goPage(advlist[0])" :style="firstAdv" />
        <div style="margin-left:5px;flex:1;display:flex;flex-direction:column;">
            <img :src="advlist[1].img" :style="secondAdv" @click="goPage(advlist[1])">
            <img :src="advlist[2].img" :style="secondAdv" style="margin-top:5px" @click="goPage(advlist[2])">
        </div>
    </div>
    <div style="width:100%;height:5px;background-color:#efefef;"></div>


    <button  @click="animbtn">anim</button>
    <transition-group name="slide-fade">
        <div :id="'anchor-'+2" class="index-part" v-for="item in mainData" style="background-color:white;">
            <div v-if="(item.type == 'preference' || item.type == 'special' || item.type == 'channel') && item.style != 2" style="line-height:1">
                <img :src="item.data.cover" class="home-preference-cover" @click="goItemDetail(item)">
                <ul class="slide-box" style="margin-top:5px;padding-left:10px;padding-right:10px;" v-if="item.data.list &&item.data.list.length>0">
                    <li class="slide-item" style="padding-bottom:10px;" v-for="item in item.data.list" @click="goGood(item)">
                        <img :src="item.img" style="width:100px;height:100px;" />
                        <div style="color:grey;width:100px;margin-top:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;word-break:keep-all;">{{item.name}}</div>
                        <div style="color:#58bc9a;margin-top:8px;">¥{{item.price}}</div>
                    </li>
                </ul>
            </div>  
        </div>
    </transition-group>
    <see-more :on-see="loadMore"></see-more>
</template>

<script>
    import Swiper from 'vux/dist/components/swiper'
    import SwiperItem from 'vux/dist/components/swiper-item'
    import SeeMore from './partial/see-more'
    import {Page} from 'iview';


    export default {
        route: {
            data() {
                document.title = "天工艺品";
                var tabIndex = this.$route.query.tab;
                this.goAnchor("#anchor-"+tabIndex);
                // this.goAnchor(".index-part");
            }
        },
        components: {
            Swiper,
            SwiperItem,
            SeeMore,
            Page
        },
        ready() {
            document.body.style.overflow = 'visible';
            this.$dispatch.apply(this, ['onTitleChanged', {
                title: '优选',
                back: false
            }]);
            this.screenWidth = window.innerWidth / 2 - 12 + 'px';
            this.getServiceRule();
            this.getAdvList();
            this.getTabs();
            this.getRecommendList();

        },
        data() {
            return {
                value: [20, 50],
                offset: 0,
                max: 10,
                singleTabPosition: 0,
                banners: [],
                singleTabs: [],
                temp: [],
                mainData: [],

                preference: [],
                master: [],
                list: [],
                goods: [],
                serviceRule: '',
                advlist: [],
                screenWidth: '',
                firstAdv: {
                    width: window.screen.availWidth / 2 + 'px',
                    height: window.screen.availWidth / 2 * 1.288 + 'px'
                },
                secondAdv: {
                    width: window.screen.availWidth / 2 - 5 + 'px',
                    height: (window.screen.availWidth / 2 * 1.288 - 5) / 2 + 'px'
                }
            }
        },
        methods: {
            animbtn(){
                console.log("====");
                this.getRecommendList();
            },
            change(page){
                console.log(page);
            },
            goAnchor(selector) {
            // var anchor = $.$el.querySelector(selector);
            var anchor = $(selector);
            if (anchor[0]) {
                var total = anchor[0].offsetTop-50;
                $('html body').animate({scrollTop: total}, 500)

            // // Chrome
            // document.body.scrollTop = total;
            // // Firefox
            // document.documentElement.scrollTop = total;
            // // Safari
            // window.pageYOffset = total;
        }else{
            setTimeout(function(){
                var anchor = $(selector);
                if (anchor[0]) {
                    var total = anchor[0].offsetTop-50;
                    $('html body').animate({scrollTop: total}, 500)
                }
            },500);
        }

    },
    getTabs() {
        this.$http.post('', {
            act: 'recommend_getLabelList',
            group: 'recommend'
        }).then((result) => {
            var resp = result.data;
            if (result && resp.code == 200) {
                this.singleTabs = result.data.datalist;
            }
        })
    },

    getServiceRule() {
        this.$http.post('', {
            act: 'configure_getListByType'
        }).then((result) => {
            var resp = result.data;
            if (result && result.data && result.data.code == 200) {
                this.serviceRule = result.data.data.img;
            }
        })
    },
    getAdvList() {
        this.$http.post('', {
            act: 'configure_getListByType',
            type: 'webpage'
        }).then((result) => {
            var resp = result.data;
            log(resp);
            if (result && result.data && result.data.code == 200) {
                this.advlist = result.data.datalist;
            }
        })
    },
    goSingleTabPosition(position) {
        this.offset = 0;
        this.singleTabPosition = position;

        if (this.goSingleTabPosition == 0) {
            this.getRecommendList();
        } else {
            this.preference = [],
            this.banners = [],
            this.master = [],
            this.list = [],
            this.goods = [],
            this.recommend_getListByLabelId();
        }

        this.loadMore();
    },
    getRecommendList() {
        this.$http.post('', {
            act: 'recommend_getComList',
            offset: this.offset,
            max: this.max,
            group: "recommend"
        }).then((result) => {

            if (result.data.code == 229) {
                this.temp = [];
                this.$broadcast('$InfiniteLoading:noMore');
            } else {
                this.mainData = result.data.datalist;
            }
        })
    },
    loadMore() {
        if (this.singleTabPosition == 0) {
            setTimeout(function() {
                this.offset = this.offset + this.max;
                this.$http.post('', {
                    act: 'recommend_getComList',
                    offset: this.offset,
                    max: this.max,
                    group: "recommend"
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
        } else {
                //TODO 分页加载
                setTimeout(function() {

                    this.$http.post('', {
                        act: 'preferenceGood_getSkuList',
                        group: 'preference',
                        labelId: this.singleTabPosition,
                        offset: this.offset,
                        max: this.max
                    }).then((result) => {
                        // log(result)
                        if (result && result.data && result.data.code == 200) {
                            var temp = result.data.datalist;
                            this.goods = this.goods.concat(temp);
                        } else {
                            this.$broadcast('$InfiniteLoading:noMore');
                        }
                    });
                    this.$broadcast('$InfiniteLoading:loaded');
                    this.offset = this.offset + this.max;
                }.bind(this), 1000);
            }
        },
        recommend_getListByLabelId: function() {
            this.$http.post('', {
                act: 'recommend_getListByLabelId',
                group: 'recommend',
                labelId: this.singleTabPosition
            }).then((result) => {
                if (result.data.code == 200) {
                    // log(JSON.stringify(result));
                    var dict = result.data.data;
                    if (dict.preference != undefined) {
                        this.preference = [dict.preference];
                    };

                    this.banners = dict.banners;

                    if (dict.master != undefined) {
                        this.master = [dict.master];
                    };

                    this.list = dict.list;
                };

            });
        },
        goPage(item) {
            log(item);
            if (item.type == 'webpage') {
                window.location.href = item.page;
            } else if (item.type == 'native') {
                // 期次详情
                if (item.page == 'stagedetail') {
                    this.goStageBanner(item.params.id);
                }
                // 拍品详情
                else if (item.page == 'auctiondetail') {
                    this.goAuctionBanner(item.params.id);
                } else if (item.page == 'channeldetail') {
                    this.goChannelBanner(item.params.id);
                } else if (item.page == 'branddetail') {
                    this.goBrandBanner(item.params.id);
                } else if (item.page == 'preferencedetail') {
                    this.goPreferenceBanner(item.params.id);
                }
            }
        },
        goItemDetail: function(item) {
            log(item);
            if (item.type == 'preference') {
                this.goPreferenceDetail(item.data);
            } else if (item.type == 'channel') {
                this.$route.router.go({
                    name: 'channelDetail_item',
                    params: {
                        id: item.data.id
                    }
                });
            }
        },
        goGood: function(item) {
            if (item.id > 0) {
                this.$route.router.go({
                    name: 'mallDetail_item',
                    params: {
                        id: item.id
                    }
                });
            };

        },
        goAuction: function(item) {
            if (item.id > 0) {
                this.$route.router.go({
                    name: 'auctionDetail_item',
                    params: {
                        id: item.id
                    }
                });
            };
        },
        goAuctionBanner: function(aid) {
            if (aid > 0) {
                this.$route.router.go({
                    name: 'auctionDetail_item',
                    params: {
                        id: aid
                    }
                });
            };
        },
        goBrandBanner: function(brandid) {
            if (brandid > 0) {
                this.$route.router.go({
                    name: 'brandDetail_item',
                    params: {
                        id: brandid
                    }
                });
            };
        },
        goChannelBanner: function(cid) {
            if (cid > 0) {
                this.$route.router.go({
                    name: 'channelDetail_item',
                    params: {
                        id: cid
                    }
                });
            };
        },
        goStageBanner: function(stageId) {
            if (stageId > 0) {
                this.$route.router.go({
                    name: 'stage_detail',
                    params: {
                        id: stageId
                    }
                });
            };
        },
        goPreferenceBanner: function(pid) {
            if (pid > 0) {
                this.$route.router.go({
                    name: 'preferenceDetail_item',
                    params: {
                        id: pid
                    }
                });
            };
        },
        goPreferenceDetail: function(item) {
            if (item.id > 0) {
                this.$route.router.go({
                    name: 'preferenceDetail_item',
                    params: {
                        id: item.id
                    }
                });
            };
        },
        goMasterDetail: function(item) {
            log(item);
            if (item.id > 0) {
                this.$route.router.go({
                    name: 'master_detail',
                    params: {
                        id: item.id
                    }
                });
            };
        },
        goStageDetail: function(item) {
            if (item.id > 0) {
                this.$route.router.go({
                    name: 'stage_detail',
                    params: {
                        id: item.id
                    }
                });
            };
        },

    }
}
</script>
