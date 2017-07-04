<template>
    <ul class="stage-detail-list activity-good-list">
        <li v-for="item in goods">
            <div class="card" @click="goGood(item)">
                <img :src="item.img"  :style = "{height: itemHeight}"/>
                <div class="name" style="padding-left:1em;padding-right:1em;font-size:1.2em;">{{item.name}}</div>
                <div class="stat" style="padding-left:1em;padding-right:1em;">
                    <span class="price" style="color:#58bc9a;">¥{{item.price}}</span>
                </div>
            </div>
        </li>
    </ul>
    <!-- <see-more :on-see="loadGoods"></see-more> -->
</template>
<script>
// import InfiniteLoading from 'vue-infinite-loading';
import { configShare } from '../../lib/wxclient'
// import SeeMore from '../partial/see-more'

export default {
    route: {
        data() {
            document.title = '一花一「饰」界';
        }
    },
    components: {
        // InfiniteLoading,
        // SeeMore
    },
    ready() {
        document.body.style.overflow = 'visible';
        this.itemHeight = window.innerWidth / 2 - 12 + 'px';
        this.id = this.$route.params.id;
        this.title = this.$route.query.name;
        this.getGoods();
        // this.getActivityInfo();
        this.shareWeChat();
    },
    data() {
        return {
            id: '',
            offset: 0,
            max: 10,
            title: '一花一「饰」界',
            itemHeight: '',
            goods: [],
            activityInfo: {}
        }
    },
    methods: {
        jssetting() {
            if (typeof(JsBridge) != 'undefined') {
                // JsBridge.showShareBtn("theme", this.activityInfo.id);
                JsBridge.setTitle('一花一「饰」界');
            }
        },
        getGoods() {
            this.$http.post('', {
                act: 'mall_getBannarlistinfo',
                group: 'mall',
                type: 2
            }).then((result) => {
                // log(result)
                if (result && result.data && result.data.code == 200) {
                    this.goods = result.data.datalist;
                }
                this.jssetting();
            })
        },
        goGood: function (item) {
            if (typeof(JsBridge) != 'undefined') {
                JsBridge.openMallProductDetail(item.id);
                return;
            };
            this.$route.router.go({
                name: 'mallProductDetail_item',
                params: {
                    id: item.id
                }
            });
        },
        shareWeChat: function() {
            var that = this;
            setTimeout(()=>{
                var shareInfo = {
                    title: '一花一「饰」界',
                    desc: '花样饰品丨人间四月，芳华「饰」界照我心',
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
