<template>
    <div class="daily-bg">
		<img src="../../assets/img/dailyOffer-1.jpg"/>
        <ul class="daily-goods">
            <li class="good" v-for="good in goods" track-by="$index" @click="goGood(good)">
                <img :src="good.img"/>
                <div class="info" :style="{width: infoWidth}">
                    <div class="name">{{good.name}}</div>
                    <div class="nowPrice">
                        今日特价: 
                        <big>¥{{good.price}}</big>
                    </div>
                    <div class="afterPrice">
                        活动后价: 
                        <span>¥{{good.marketPrice}}</span>
                    </div>
                </div>
            </li>
        </ul>
    <div class="db-fab" v-link="{name:'sale-order'}">
        <div class="material ic_assignment"></div>
    </div>
    </div>
</template>
<script>
import { configShare } from '../../lib/wxclient'

export default {
    route: {
        data() {
            document.title = '今日特价';
        }
    },
    ready: function() {
        this.$dispatch.apply(this, ['onTitleChanged', {
            title: '今日特价',
            back: true
        }]);
        this.getGood();
        this.infoWidth = window.innerWidth - 134 + 'px';
        this.getShareInfo();
    },
    data: function() {
        return {
            goods: [],
            infoWidth: ''
        }
    },
    methods: {
        getGood() {
            this.$http.post('', {
                act: 'bargain_getList',
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    this.goods = result.data.datalist;
                    if (typeof(JsBridge) != 'undefined') {
                        JsBridge.showShareBtn("sale", -1);
                        JsBridge.setTitle("今日特价");
                    }
                }
            })
        },
        goGood: function (good) {
            this.$route.router.go({
                name: 'sale-good',
                params: {
                    id: good.id
                }
            });
        },
        getShareInfo() {
            this.$http.post('', {
                act: 'share_getInfo',
                type: 'sale',
                id: -1
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
        },
    },
}
</script>

<style type="text/css" scoped>
    .daily-bg {
        margin: 0;
        padding: 0;
        background-image: url(../../assets/img/dailyOffer-repeat.png);
        background-size: 100% auto;
        background-repeat: repeat-y;
        overflow: hidden;
    }

    .daily-bg img {
        width: 100%;
        display: block;
    }

    .daily-goods {
        overflow: hidden;
        width: 100%;
        position: relative;
        margin-top: 16px;
    }

    .daily-goods .good {
        overflow: hidden;
        margin: 16px 0 16px 0;
    }

    .daily-goods .good img {
        float: left;
        margin: 0 4px 0 0;
        width: 100px;
        height: 100px;
        object-fit: cover;
        border: 6px solid #fff;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.12), 0px 6px 6px 0px rgba(0, 0, 0, 0.24);
    }

    .daily-goods .good .info {
        float: left;
        height: 120px;
        font-size: 14px;
        padding-top: 4px;
    }

    .daily-goods .good .info i {
        opacity: 0.5;
    }

    .daily-goods .good .info .nowPrice {
        color: rgb(98, 3, 13);
        font-size: 12px;
    }

    .daily-goods .good .info .afterPrice {
        font-size: 12px;
    }

    .daily-goods .good:nth-child(even) img {
        margin-right: 8px;
        float: right;
    }

    .daily-goods .good:nth-child(even) .info {
        margin-right: 8px;
        float: right;
        text-align: right;
    }

    .daily-goods .good:nth-child(odd) img {
        margin-left: 8px;
    }

    .daily-goods .good:nth-child(odd) .info {
        margin-left: 8px;
        float: left;
        text-align: left;
    }

</style>
