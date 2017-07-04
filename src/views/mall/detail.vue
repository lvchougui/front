<template>
    <tabbar></tabbar>
    <!-- <floatbtn></floatbtn> -->
    <img :src="detail.cover" class="product-cover">
    <div class="label-text" style="font-weight:bold;">{{detail.name}}</div>
    
    
    <bottom></bottom>
    
</template>
<style>
.product-cover {
    width: 100%;
    height: auto;
}


</style>
<script>
import floatbtn from '../../components/floatbtn'
import Loading from 'vux/dist/components/loading'
import Toast from 'vux/dist/components/toast'
import PayModule from '../partial/pay-module'
import Tabbar from '../partial/tabbar';
import bottom from '../partial/bottom'

import {
    isLogined
}
from '../../lib/auth'
import {
    configShare
}
from '../../lib/wxclient'
export default {
    components: {
        floatbtn,
        Loading,
        Toast,
        PayModule,
        bottom,
        tabbar: Tabbar
    },
    ready: function() {
        this.id = this.$route.params.id;
        this.getDefaultData();
    },
    data: function() {
        return {
            id: '',
            detail: {},
        }
    },
    methods: {


        //得到默认的数据
        getDefaultData: function() {
            this.$http.post('', {
                act: 'preferenceGood_getInfo',
                group: 'preference',
                id: this.$route.params.id,
            }).then((result) => {
                this.detail = result.data.data;
            });

        },

    }
}
</script>
