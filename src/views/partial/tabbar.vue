<template>
    <div class="tabbar">
        <div style="width:70%;display:flex;flex-direction:row;margin-left:15%;margin-top:20px;">
            <div style="flex:1;">
                <img class="tabbar-text" :class="{'text_selected':selected==4,'text_normal':selected!=4}" src="../../assets/img/syyj/top_master.png"  @click="tab4"/>
                <img class="tabbar-text" style="margin-left:10px;" :class="{'text_selected':selected==1,'text_normal':selected!=1}" src="../../assets/img/syyj/top_product.png"  @click="tab1"/>
                <img class="tabbar-text" style="margin-left:10px;" :class="{'text_selected':selected==2,'text_normal':selected!=2}" src="../../assets/img/syyj/top_cert.png"  @click="tab2"/>
                <img class="tabbar-text" style="margin-left:10px;" :class="{'text_selected':selected==3,'text_normal':selected!=3}" src="../../assets/img/syyj/top_article.png"  @click="tab3"/>
            </div>
            <img style="height:36px;margin-top:22px;" src="../../assets/img/syyj/top_brand.png"  @click="tab5"/>
        </div>
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
        background-color: rgba(150, 150, 150, 0.50);
        box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.12);
        height: 100px;
        width: 100%;
        -webkit-backdrop-filter: saturate(180%) blur(20px);
        z-index: 9999;
    }

    .tabbar-item {
        text-align: center;
    }

    .tabbar-text {
        height: 80px;
        text-align: center;
        font-size: 1.2em !important;
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
