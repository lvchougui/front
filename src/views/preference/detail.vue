<style>
.cover {
    width: 100%;
    height: auto;
}

.preference-desc {
    padding: 10px;
    margin-top: 10px;
}

.list {
    padding: 10px;
}

.preference-item {
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid #e7e7e7;
    height: 100px;
}

.item-content {
    width: 100%;
    display: flex;
    /*flex: 1;*/
    flex-direction: column;
    align-content: space-between;
    margin-left: 15px;
    /*height: 120px;*/
    /*align-items: center;*/
    justify-content: space-between;
}

.item-img {
    display: inline-block;
    width: 100px;
    height: 100px;
}

.name {
    text-align: left;
    color: rgb(47, 47, 47);
    font-size: 14px;
    padding-right: 5px;
    /*white-space: nowrap;*/
    /*overflow: hidden;*/
    text-overflow: ellipsis;
    display: inline-block;
    word-wrap: break-word;
}

.stock {
    text-align: left;
    color: gray;
    font-size: 13px;
    width: 100%;
}

.price {
    color: rgb(88, 188, 154);
    font-size: 13px;
    display: inline-block;
    vertical-align: -webkit-baseline-middle;
}

.purchase {
    width: 100px;
    background-color: black;
    color: white;
    border-radius: 3px;
    text-align: center;
    font-size: 13px;
    margin-top: 5px;
}

.master-part {
    margin-bottom: 60px;
    margin-top: 20px;
}

.master-logo {
    display: flex;
    width: 60px;
    height: 60px;
    justify-content: center;
    border-radius: 30px;
    margin: 0 auto;
}

.master-name {
    padding: 5px;
    align-items: center;
    color: #2f2f2f;
    font-size: 14px;
    margin-top: 5px;
    text-align: center;
    font-weight: bold;
}

.master-brand {
    align-items: center;
    color: #58bc9a;
    font-size: 13px;
    margin-bottom: 20px;
    text-align: center;
}
.btn-buy {
    display: inline-block;
    background: #252525;
    color: #fff;
    font-size: 0.9em;
    padding: 3px 8px;
    float: right;
}
</style>
<template>
    <img :src="preferenceDict.cover" class="cover">
    <div class="preference-desc">{{{preferenceDict.desc}}}</div>
    <div class="list" v-for="item in goodList">
        <div class="preference-item" @click="goGood(item)">
            <img class="item-img" :src="item.img"></img>
            <div class="item-content">
                <div class="name">{{item.name}}</div>
                <div class="stock">剩余： {{item.availableStock}}</div>
                <div>
                    <span class="price">¥{{item.price}}</span>
                    <span @click="goGood(item)" class="btn-buy">立即购买</span>
                </div>
            </div>
        </div>
    </div>
    <div class="master-part" v-if="preferenceDict.master">
        <div style="width:100%;height:auto;align-items:center">
            <img class="master-logo" :src="preferenceDict.master.logo">
        </div>
        <div class="master-name">{{preferenceDict.master.nickname}}</div>
        <div class="master-brand" v-if="preferenceDict.master.brandName">{{preferenceDict.master.brandName}}</div>
    </div>
    <div style="height:50px;width:100%;"></div>
</template>
<script>
import floatbtn from '../../components/floatbtn'
import {
    configShare
} from '../../lib/wxclient'

export default {
    components: {
        floatbtn
    },
    data: function() {
        return {
            preferenceDict: {},
            goodList: [],
            showDownload: true,
            id: this.$route.params.id
        }
    },

    ready() {
        this.getDefaultData();
        if (typeof(JsBridge) != 'undefined') {
            this.showDownload = false;
        }
        log(this.showDownload);
        this.getShareInfo();
    },
    methods: {

        //得到默认的数据
        getDefaultData() {
            this.$http.post('', {
                act: 'preference_getPreferenceInfo',
                group: 'preference',
                id: this.$route.params.id,
            }).then((result) => {
                this.preferenceDict = result.data.data;
                this.goodList = this.preferenceDict.list;
                // alert(this.preferenceDict.master.nickname);
            });
        },
        goGood(item) {
            if (typeof(JsBridge) != 'undefined') {
                JsBridge.openProductDetail(item.id);
                return;
            };
            this.$route.router.go({
                name: 'mallProductDetail_item',
                params: {
                    // id: item.sku_id
                    id: item.id
                }
            });
        },
        getShareInfo() {
            this.$http.post('', {
                act: 'share_getInfo',
                type: 'preference',
                id: this.id
            }).then((resp) => {
                log(resp);
                if (resp && resp.data) {
                    if (resp.data.code == 200) {
                        var result = resp.data.data;

                        var share_info = {
                            title: result.title,
                            desc: result.summary,
                            link: window.location.href,
                            imgUrl: result.img
                        };
                        setTimeout(configShare(share_info), 3000);

                    }
                }
            })
        },
    },
}
</script>
