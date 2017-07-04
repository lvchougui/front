<template>
    <div class="static-banner">
        <img :src="activityInfo.cover"/>
    </div>
    <div class="activity-info">
        <h2 class="name">{{activityInfo.name}}</h2>
        <div class="desc">{{activityInfo.desc}}</div>
    </div>
    <ul class="stage-detail-list activity-good-list">
        <li v-for="item in goods">
            <div class="card" @click="goGood(item)">
                <img :src="item.img"  :style = "{height: itemHeight}"/>
                <div class="name">{{item.name}}</div>
                <div class="stat">
                    <span class="price">¥{{item.price}}</span>
                </div>
                <!--<i class="material-icons">share</i>-->
            </div>
        </li>
    </ul>
    <!-- <infinite-loading :on-infinite="loadGoods"></infinite-loading> -->
    <see-more :on-see="loadGoods"></see-more>
</template>
<script>
// import InfiniteLoading from 'vue-infinite-loading';
import { configShare } from '../../lib/wxclient'
import SeeMore from '../partial/see-more'

export default {
    route: {
        data() {
            document.title = '专题详情';
        }
    },
    components: {
        // InfiniteLoading,
        SeeMore
    },
    ready() {
        document.body.style.overflow = 'visible';
        this.itemHeight = window.innerWidth / 2 - 12 + 'px';
        this.id = this.$route.params.id;
        this.title = this.$route.query.name;
        this.getGoods();
        this.getActivityInfo();
        this.shareWeChat();
    },
    data() {
        return {
            id: '',
            offset: 0,
            max: 8,
            title: '专题详情',
            itemHeight: '',
            goods: [],
            activityInfo: {}
        }
    },
    methods: {
        getActivityInfo() {
            this.$http.post('', {
                act: 'activity_getInfo',
                group: 'special',
                id: this.$route.params.id
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    this.activityInfo = result.data.data;
                    //设置title
                    this.title = this.activityInfo.name;
                    this.$dispatch.apply(this, ['onTitleChanged', {
                        title: this.title,
                        back: true
                    }]);
                    document.title = this.title;
                    if (typeof(JsBridge) != 'undefined') {
                        JsBridge.showShareBtn("theme", this.activityInfo.id);
                        JsBridge.setTitle(this.title);
                    }
                }
            })
        },
        getGoods() {
            this.$http.post('', {
                act: 'goods_getList',
                group: 'special',
                sid: this.$route.params.id,
                offset: this.offset,
                max: this.max
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    this.goods = result.data.datalist;
                }
            })
        },
        loadGoods() {
            setTimeout(function() {
                this.offset = this.offset + this.max;
                this.$http.post('', {
                    act: 'goods_getList',
                    group: 'special',
                    sid: this.$route.params.id,
                    offset: this.offset,
                    max: this.max
                }).then((result) => {
                    if (result && result.data && result.data.code == 200) {
                        var temp = result.data.datalist;
                        this.goods = this.goods.concat(temp);
                    } else {
                        this.$broadcast('$InfiniteLoading:noMore');
                    }
                });
                this.$broadcast('$InfiniteLoading:loaded');
            }.bind(this), 1000);
        },
        goGood: function (item) {
            this.$route.router.go({
                name: 'activity_good',
                params: {
                    id: item.id
                },
                query: {
                    name: item.name,
                }
            });
        },
        shareWeChat: function() {
            var that = this;
            setTimeout(()=>{
                var shareInfo = {
                    title: that.activityInfo.name,
                    desc: that.activityInfo.desc,
                    link: window.location.href,
                    imgUrl: that.activityInfo.cover
                };
                configShare(shareInfo);
                this.$dispatch('shareInfo', shareInfo);
             },500);
        }
    }
}
</script>
