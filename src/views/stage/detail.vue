<template>
    <div class="stage-detail-header">
        <img class="stage-cover" :src="stageInfo.coverimg"/>
    </div>
    <div class="stage-master-part" v-if="stageInfo.master!=''">
        <img class="stage-master-avatar" :src="stageInfo.master.logo" />
        <div class="stage-master-name">{{stageInfo.master.nickname}}</div>
    </div>
    <div class="stage-name">{{stageInfo.name}}</div>
    <div class="stage-time">拍卖时间：{{stageInfo.starttime}} - {{stageInfo.endtime}}</div>
    <div class="stage-desc">{{stageInfo.desc}}</div>
    <ul class="stage-detail-list">
        <li v-for="item in stage">
            <div class="card" @click="goDetail(item.id)">
                <img :src="item.img" :style = "{height: itemHeight}"/>
                <div class="time" v-if="item.status==1">{{item.closeTime}}结束</div>
                <div class="time" v-if="item.status==2">{{item.openTime}}开拍</div>
                <div class="name" style="padding-left:5px;padding-right:5px;">{{item.name}}</div>
                <div class="stat" style="padding-left:5px;padding-right:5px;">
                    <span class="price">¥{{item.currentPrice}}</span>
                    <span class="bids" v-if="item.status!=2">{{item.bidcount}}次出价</span>
                </div>
                <!--<i class="material-icons">share</i>-->
            </div>
        </li>
    </ul>
    <!-- <infinite-loading :on-infinite="loadStage"></infinite-loading> -->
    <see-more :on-see="loadStage"></see-more>
</template>
<style type="text/css">
    body{
        line-height: 1;
        font-size: 13px;
    }
    .stage-master-part{
        margin-top: -25px;
        align-items: center;
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .stage-master-avatar {
        height: 50px;
        width: 50px;
        margin: 0 auto;
        border-radius: 30px;
        border: 2px solid #fafafa;
    }
    .stage-master-name {
        margin-top: 15px;
    }
    .stage-name{
        width: 100%;
        padding-left: 10px;
        line-height: 26px;
        height: 26px;
        margin-top: 10px;
    }
    .stage-time{
        padding-left: 10px;
        line-height: 18px;
        color: #9fa0a0;
    }
    .stage-desc{
        width: 100%;
        padding-left: 10px;
        line-height: 26px;
        
        }
</style>
<script>
// import InfiniteLoading from 'vue-infinite-loading';
import SeeMore from '../partial/see-more'
import browserUtils from '../../lib/browser-helper'
import { configShare } from '../../lib/wxclient'

export default {
    route: {
        data() {
            document.title = "专场";
        }
    },
    components: {
        // InfiniteLoading,
        SeeMore
    },
    ready() {
        document.body.style.overflow = 'visible';
        this.id = this.$route.params.id;
        this.itemHeight = window.innerWidth / 2 - 12 + 'px';
        this.$dispatch.apply(this, ['onTitleChanged', {
            title: '专场',
            back: true
        }]);
        this.getStage();
        this.getStageInfo();
        this.getShareInfo();
    },
    data() {
        return {
            id: '',
            offset: 0,
            max: 20,
            itemHeight: '',
            stage: [],
            temp: [],
            stageInfo: {},
        }
    },
    methods: {
        getStageInfo() {
            this.$http.post('', {
                act: 'stage_getInfo',
                id: this.$route.params.id
            }).then((result) => {
                log(result.data.data);
                if (result && result.data && result.data.code == 200) {
                    this.stageInfo = result.data.data;
                }
            })
        },
        getStage() {
            this.$http.post('', {
                act: 'tgAuction_getListByStageId',
                id: this.$route.params.id,
                offset: this.offset,
                max: this.max
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    this.stage = result.data.datalist;
                }
            })
        },
        loadStage: function() {
            setTimeout(function() {
                this.offset = this.offset + this.max;
                this.$http.post('', {
                    act: 'tgAuction_getListByStageId',
                    id: this.$route.params.id,
                    offset: this.offset,
                    max: this.max
                }).then((result) => {
                    if (result.data.code == 229) {
                        this.temp = []
                        this.$broadcast('$InfiniteLoading:noMore');
                    } else {
                        this.temp = result.data.datalist;
                    }
                })
                this.stage = this.stage.concat(this.temp);
                this.$broadcast('$InfiniteLoading:loaded');
            }.bind(this), 1000);
        },
        goMaster: function(id) {
            this.$route.router.go({
                name: 'master_detail',
                params: {
                    id: id
                }
            });
        },
        goDetail: function(id) {
            this.$route.router.go({
                name: 'auctionDetail_item',
                params: {
                    id: id
                }
            });
        },
        getShareInfo() {
            this.$http.post('', {
                act: 'share_getInfo',
                type: 'stage',
                id: this.$route.params.id
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    var stageInfo = result.data.data;
                    var shareInfo = {
                        title: result.data.data.title,
                        desc: result.data.data.summary,
                        link: result.data.data.url,
                        imgUrl: result.data.data.img
                    }
                    configShare(shareInfo);
                }
            })
        }
    }
}
</script>
