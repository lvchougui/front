<style>
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
  {
      transform: translateX(10px);
      opacity: 0;
  }  
  .top_bg{
    height:100px;
    background: url('../assets/img/syyj/bg1.jpg');
}
.index-product{
    width: 100%;
    height: auto;
    background: url('../assets/img/syyj/bg2.jpg');
    margin-top: -5px;
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
.search-input{
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 40px;
}
.search-btn{
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: black;
    padding-left: 12px;
    padding-right: 10px;
}
.contact-part{
    display: flex;
    flex-direction: row;
    height: 100px;
    justify-content: center;
    align-items: center;
}
.index-label-text{
    font-size:28px;
    color:black;
    text-align:center;
    font-family: KaiTi,KaiTi_GB2312 ! important;
    font-weight:900;
    margin: 0 auto;
    border-bottom: 2px dashed black;
    line-height: 1;
}
</style>
<template>
    <!-- <Slider :value.sync="value" range></Slider> -->
    <!-- <div class="top_bg"></div> -->
    <div>
        <swiper :options="swiperOption" ref="mySwiperA">
            <!-- 幻灯内容 -->
            <swiper-slide v-for="item in advlist" >
                <img :src="item.cover" :style="secondAdv" @click="goPage(item)"/>
            </swiper-slide>
            <!-- 以下控件元素均为可选 -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>
    </div>
    <!-- <Page :current="1" :total="100"  show-total @on-change="change"></Page> -->

    <div class="index-product" :id="'anchor-'+1">
        <div style="display:flex;flex-direction:column;width:70%;margin-left:15%;background-color:white;">
            <div style="display:flex;flex-direction:row;height:100px;padding-left:80px;padding-right:80px;">
                <div style="font-size:28px;color:black;height:100%;text-align:center;line-height:100px;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;">上玉元吉</div>
                <div class="verticle-line"></div>
                <div class="search-part">
                    <div style="color:black;line-height:36px;padding-right:20px;padding-left:20px;background-color:#c7c7c7;">商品</div>
                    <input v-model="searchText" placeholder="题材、样式" class="search-input">
                    <div class="search-btn" @click="search">
                        <img src="../assets/img/syyj/search.png" style="width:20px;height:20px;margin-top:8px;">
                    </div>
                </div>
                <div class="verticle-line"></div>
                <div class="contact-part">
                    <img src="../assets/img/syyj/telephone.png" style="width:50px;height:50px;">
                    <div style="margin-left:15px;display:flex;flex-direction:column;font-family: KaiTi,KaiTi_GB2312 ! important;color:black;">
                        <div>客服热线</div>
                        <div>0512-67526713</div>
                    </div>
                </div>
            </div>
            <div style="width:100%;height:2px;background-color:#e7e7e7;"></div>
            <div class="index-label-text" style="margin-top:30px;">作品赏析</div>
            <transition-group name="slide-fade">

            </transition-group>
        </div>
    </div>
    
    <!-- <button  @click="animbtn">anim</button> -->
    <transition-group name="slide-fade">
        <div :id="'anchor-'+2" class="index-part" v-for="item in mainData" style="background-color:white;">

        </div>
    </transition-group>
    <bottom></bottom>
</template>

<script>
    import Swiper from 'vux/dist/components/swiper'
    import SwiperItem from 'vux/dist/components/swiper-item'
    import SeeMore from './partial/see-more'
    import {Page} from 'iview';
    import bottom from './partial/bottom'


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
            Page,
            bottom
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
                    width: window.screen.availWidth + 'px',
                    height: window.screen.availWidth * 760 / 1920 + 'px'
                },
                swiperOption: {
                    // 所有配置均为可选（同Swiper配置）  
                    notNextTick: true,
                    autoplay: 5000,
                    grabCursor : true,
                    setWrapperSize :true,
                    autoHeight: true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    // scrollbar:'.swiper-scrollbar',
                    mousewheelControl : false,
                    observeParents:true,
                    onTransitionStart(swiper){
                      // console.log(swiper)
                  }
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
        // this.$http.post('', {
        //     act: 'configure_getListByType',
        //     type: 'webpage'
        // }).then((result) => {
        //     var resp = result.data;
        //     log(resp);
        //     if (result && result.data && result.data.code == 200) {
        //         this.advlist = result.data.datalist;
        //     }
        // })

        var url = "http://47.94.206.22:3001/api/banner/getBannerList";
        this.$http.get(
            url
            )
        .then((res) => {
            if (res.status == 200) {
                this.advlist = res.data;
            };
        })
        .catch((res) => {
            log("error:" + JSON.stringify(res));
        });
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
            window.location.href = item.cover_link;
            
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

    },
    computed: {
        swiper() {
          return this.$refs.mySwiperA.swiper
      }
  },
  mounted() {
    console.log("每次切换都会触发我");
    this.swiper.slideTo(3, 1000, false)
},
}
</script>
