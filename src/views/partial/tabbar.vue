<template>
    <div class="tabbar">
        <div class="tabbar-item" @click="tab1">
            <p class="tabbar-text" :class="{'text_selected':selected==1,'text_normal':selected!=1}">优选</p>
        </div>
        <div class="tabbar-item" @click="tab2">
            <!-- <div class="tabbar-icon" :class="{'icon_home_selected':selected==1,'icon_home':selected!=1}"></div> -->
            <p class="tabbar-text" :class="{'text_selected':selected==2,'text_normal':selected!=2}">拍卖</p>
        </div>
        <div class="tabbar-item" @click="tab3">
            <p class="tabbar-text" :class="{'text_selected':selected==3,'text_normal':selected!=3}">好物</p>
        </div>
        <div class="tabbar-item" @click="tab4">
            <p class="tabbar-text" :class="{'text_selected':selected==4,'text_normal':selected!=4}">品牌</p>
        </div>
        <div class="tabbar-item" @click="tab5">
            <p class="tabbar-text" :class="{'text_selected':selected==5,'text_normal':selected!=5}">我的</p>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            selected: {
                type: Number,
                default: 1
            }
        },
        methods: {
            tab1() {
                this.$route.router.go({
                    name: 'home',
                    query: {
                        tab:1
                    },

                });

            },
            tab2() {
                this.$route.router.go({
                    name: 'home',
                    query: {
                        tab:2
                    },
                    
                });
            },
            tab3() {
                this.$route.router.go({
                    name: 'home',
                    query: {
                        tab:3
                    },
                    
                });
            },
            tab4() {
                this.$route.router.go({
                    name: 'home',
                    query: {
                        tab:4
                    },
                    
                });
            },
            tab5() {
                this.$route.router.go({
                    name: 'home',
                    query: {
                        tab:5
                    },
                    
                });
            }
        }
    }
</script>
<style>
    .tabbar {
        position: fixed;
        top: 0;
        background-color: rgba(255, 255, 255, 0.75);
        box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.12);
        height: 40px;
        width: 100%;
        -webkit-backdrop-filter: saturate(180%) blur(20px);
    }

    .tabbar-item {
        width: 20%;
        text-align: center;
        float: left;
        height: inherit;
    }

    .tabbar-text {
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 1.2em !important;
    }

    .tabbar-icon {
        width: 22px;
        height: 22px;
        background-repeat: no-repeat;
        background-size: 22px 22px;
        margin: 6px auto 6px auto;
    }

    .text_normal {
        color: #646464;
    }

    .text_selected {
        color: #58bc9a;
    }

    .icon_home {
        background-image: url(../../assets/img/tab-icon/tab_auction_btn.png);
    }

    .icon_home_selected {
        background-image: url(../../assets/img/tab-icon/tab_auction_selected.png);
    }

    .icon_stage {
        background-image: url(../../assets/img/tab-icon/tab_art.png);
    }

    .icon_stage_selected {
        background-image: url(../../assets/img/tab-icon/tab_art_selected.png);
    }

    .icon_yiqu {
        background-image: url(../../assets/img/tab-icon/tab_Indiana.png);
    }

    .icon_yiqu_selected {
        background-image: url(../../assets/img/tab-icon/tab_Indiana_selected.png);
    }

    .icon_my {
        background-image: url(../../assets/img/tab-icon/tab_user.png);
    }

    .icon_my_selected {
        background-image: url(../../assets/img/tab-icon/tab_user_selected.png);
    }
</style>
