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
    
    <see-more :on-see="loadGoods"></see-more>
</template>
<script>
// import InfiniteLoading from 'vue-infinite-loading';
import { configShare } from '../../lib/wxclient'
import SeeMore from '../partial/see-more'

export default {
    route: {
        data() {
            document.title = '女神“价”到';
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
        // this.getActivityInfo();
    },
    data() {
        return {
            id: '',
            offset: 0,
            max: 10,
            title: '女神“价”到',
            itemHeight: '',
            goods: [],
            activityInfo: {}
        }
    },
    methods: {
        jssetting() {
            if (typeof(JsBridge) != 'undefined') {
                // JsBridge.showShareBtn("theme", this.activityInfo.id);
                JsBridge.setTitle('女神“价”到');
            }
        },
        
        getGoods() {
            this.$http.post('', {
                act: 'preferenceGood_getWomenlist',
                group:'preference',
                offset: this.offset,
                max: this.max
            }).then((result) => {
                // log(result)
                if (result && result.data && result.data.code == 200) {
                    this.goods = result.data.datalist;
                }
                this.jssetting();
            })

        },
        loadGoods() {
            setTimeout(function() {
                this.offset = this.offset + this.max;
                this.$http.post('', {
                    act: 'preferenceGood_getWomenlist',
                    group:'preference',
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
            }.bind(this), 1000);
        },
        goGood: function (item) {
            if (typeof(JsBridge) != 'undefined') {
                JsBridge.openProductDetail(item.id);
                return;
            };
            this.$route.router.go({
                name: 'mallDetail_item',
                params: {
                    id: item.id
                }
            });
        },
        
    }
}
</script>
