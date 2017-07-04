<template>
	<!-- <floatbtn v-if="showDownload == true"></floatbtn> -->
	<div class="brand-part">
		<div style="width:100%;height:auto;align-items:center">
			<img class="brand-logo" :src="brandInfo.brandLogo">
		</div>
		<div class="brand-name">{{brandInfo.brandName}}</div>
		<div class="brand-desc">{{brandInfo.brandDesc}}</div>
	</div>
	<ul class="stage-detail-list activity-good-list">
        <li v-for="item in goods">
            <div class="card" @click="goGood(item)">
                <img :src="item.img"  :style = "{height: itemHeight}"/>
                <div class="name" style="padding-left:0.5em;padding-right:0.5em;font-size:1.2em;">{{item.name}}</div>
                <div class="stat" style="padding-left:0.5em;padding-right:0.5em;">
                	<span style="color:grey;float:left;font-size:12px;">{{item.nickname}}</span>
                    <span class="price" style="color:#58bc9a;float:right;">¥{{item.price}}</span>
                </div>
                <!--<i class="material-icons">share</i>-->
            </div>
        </li>
    </ul>
    <!-- <infinite-loading :on-infinite="loadGoods"></infinite-loading> -->
    <see-more :on-see="loadGoods"></see-more>
	<!-- <div style="height:50px;width:100%;"></div> -->
</template>
<script>
import SeeMore from '../partial/see-more'
import floatbtn from '../../components/floatbtn'
import { configShare } from '../../lib/wxclient'

export default {
    route: {
        data() {
            document.title = '品牌详情';
        }
    },
    components: {
        // InfiniteLoading,
        SeeMore,
        floatbtn
    },
    ready() {
    	if (typeof(JsBridge) != 'undefined') {
                this.showDownload=false;
            }
        document.body.style.overflow = 'visible';
        this.itemHeight = window.innerWidth / 2 - 12 + 'px';
        this.id = this.$route.params.id;
        this.getBrandInfo();
        this.getGoods();
        this.getShareInfo();
    },
    data() {
        return {
            id: '',
            offset: 0,
            max: 10,
            title: '品牌详情',
            itemHeight: '',
            goods: [],
            brandInfo: {},
            showDownload:true
        }
    },
    methods: {
        jssetting() {
            if (typeof(JsBridge) != 'undefined') {
                // JsBridge.showShareBtn("theme", this.activityInfo.id);
                JsBridge.setTitle('品牌详情');
            }
        },
        getBrandInfo() {
            this.$http.post('', {
                act: 'mall_getMallBrandSelfInfo',
                group: 'mall',
                id: this.id
            }).then((result) => {
                if (result && result.data && result.data.code == 200) {
                    this.brandInfo = result.data.data;
                }
            })
        },
        getGoods() {
            this.$http.post('', {
                act: 'mall_getMallBrandInfo',
                group: 'mall',
                id: this.id,
                offset: this.offset,
                max: this.max
            }).then((result) => {
                // log(result)
                if (result && result.data && result.data.code == 200) {
                    this.goods = result.data.datalist;
                }
            })
        },
        loadGoods() {
            setTimeout(function() {
                this.offset = this.offset + this.max;
                this.$http.post('', {
                    act: 'mall_getMallBrandInfo',
                	group: 'mall',
                	id: this.id,
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
        getShareInfo() {
            this.$http.post('', {
                act: 'share_getInfo',
                type: 'brand',
                id: this.id
            }).then((resp) => {
                log(resp);
                if (resp && resp.data) {
                    log('ddd')
                    if (resp.data.code == 200) {
                    log('eee')
                    
                        var result = resp.data.data;

                        var share_info = {
                            title: result.title,
                            desc: result.summary,
                            link: window.location.href,
                            imgUrl: result.img
                        };
                        setTimeout(configShare(share_info),3000);
                        
                    }
                }
            })
        },
    }
}
</script>
<style>
	.brand-part{
        margin-top: 20px;
    }
    .brand-logo{
        display:flex;   
        width: 100px;
        height: auto;
        justify-content:center;
        border-radius: 40px;
        margin: 0 auto;
    }
    .brand-name{
        padding: 5px;
        align-items: center;
        color: #2f2f2f;
        font-size:14px;
        margin-top: 5px;
        text-align: center;
        font-weight: bold;
    }
    .brand-desc{
        align-items: center;
        color: grey;
        font-size: 13px;
        padding: 15px;
    }
</style>