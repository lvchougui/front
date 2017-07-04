<template>
    <tab>
        <tab-item @click='tab1' selected>进行中</tab-item>
        <tab-item @click='tab2'>已揭晓</tab-item>
    </tab>
    <div class="db-index-content">
        <ul class="db-index-list">
            <li class="db-card" v-for="data in mainData">
                <div class="card" @click="goDetail(data.id)">
                    <img :src="data.img" class="db-card-cover" />
                    <h3>{{data.name}}</h3>
                    <div class="progress" v-show="data.status==1 || data.status==2">
                        <p>揭晓进度 <span style="color: #64b5f6">{{((1 - data.surplus/data.total)*100).toFixed(0)}}%</span></p>
                        <div class="bar">
                            <div class="bar-inner" :style="{width: (1 - data.surplus/data.total)*100+'%'}"></div>
                        </div>
                    </div>
                    <template v-if="data.status==4">
                        <div class="winner">
                            <i class="material-icons">stars</i>
                            <p class="name">{{data.username}}</p>
                        </div>
                    </template>
                    <div class="action">
                        <button class="btn-red" v-show="data.status==1">立即夺宝</button>
                        <button class="btn-grey" v-show="data.status==2">预热中</button>
                        <button class="btn-grey" v-show="data.status==3">计算中</button>
                        <button class="btn-grey" v-show="data.status==4">已结束</button>
                    </div>
                </div>
            </li>
        </ul>
        <template v-if="tabIndex==1">
            <!-- <infinite-loading :on-infinite="load1"></infinite-loading> -->
            <see-more :on-see="load1"></see-more>
        </template>
        <template v-if="tabIndex==2">
            <!-- <infinite-loading :on-infinite="load2"></infinite-loading> -->
            <see-more :on-see="load2"></see-more>
        </template>
    </div>
</template>
<script>
import Tab from 'vux/dist/components/tab'
import TabItem from 'vux/dist/components/tab-item'
// import InfiniteLoading from 'vue-infinite-loading'
import SeeMore from '../partial/see-more'
import browserUtils from '../../lib/browser-helper'

export default {
    components: {
        Tab,
        TabItem,
        // InfiniteLoading
        SeeMore
    },
    ready() {
        this.getToken();
        this.getOngoingData();
        document.title = "夺宝历史"
        this.$dispatch.apply(this, ['onTitleChanged', {
            title: '夺宝历史',
            back: true
        }])
    },

    methods: {
        getToken(){
            if(!window.userinfo){
                if (typeof(JsBridge) != 'undefined'){
                    var qToken = this.$route.query.token;
                    var nToken = JsBridge.getTokenFromNative();
                    if(qToken){
                        this.noAddress = true;
                        this.token = qToken;
                        window.userinfo = {
                            token:qToken
                        };
                    }else if(nToken){
                        this.token = nToken;
                        window.userinfo = {
                            token:nToken
                        };
                    }else{
                        this.$route.router.go({name: 'login'});
                    }
                }else if(browserUtils.versions().weixin){
                    this.$route.router.go('/duobao/phone');
                } else {
                    this.$route.router.go({name: 'login'});
                }
            }else{
                this.token = window.userinfo.token;
            }
        },

        tab1: function() {
            this.offset = 0;
            this.mainData = [];
            this.temp = [];
            this.getOngoingData();
            this.tabIndex = 1;
        },

        tab2: function() {
            this.offset = 0;
            this.mainData = [];
            this.temp = [];
            this.getOverData();
            this.tabIndex = 2;
        },

        goDetail: function(id) {
            this.$route.router.go({
                name: 'duobao_item',
                params: {
                    id: id
                }
            });
        },

        getOngoingData() {
            this.$http.post('', {
                act: 'record_getList',
                group: 'cloud',
                status: 1,
                offset: this.offset,
                max: this.max
            }).then((result) => {
                this.mainData = result.data.datalist;
            })
        },

        getOverData() {
            this.$http.post('', {
                act: 'record_getList',
                group: 'cloud',
                status: 0,
                offset: this.offset,
                max: this.max
            }).then((result) => {
                this.mainData = result.data.datalist;
            })
        },

        load1: function() {
            setTimeout(function() {
                this.offset = this.offset + this.max;
                this.$http.post('', {
                    act: 'record_getList',
                    group: 'cloud',
                    status: 1,
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
                this.mainData = this.mainData.concat(this.temp);
                this.$broadcast('$InfiniteLoading:loaded');
            }.bind(this), 1000);
        },
        load2: function() {
            setTimeout(function() {
                this.offset = this.offset + this.max;
                this.$http.post('', {
                    act: 'record_getList',
                    group: 'cloud',
                    status: 2,
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
                this.mainData = this.mainData.concat(this.temp);
                this.$broadcast('$InfiniteLoading:loaded');
            }.bind(this), 1000);
        }
    },
    data() {
        return {
            token: '',
            tabIndex: 1,
            offset: 0,
            max: 10,
            temp: [],
            mainData: []
        }
    }
}
</script>
