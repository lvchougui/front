<style>
    .slide-fade-enter-active {
      transition: all .3s ease;
  }
  .slide-fade-leave-active {
      transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  {
      transform: translateX(10px);
      opacity: 0;
  }  
  .top_bg{
    height:100px;
    background: url('../assets/img/syyj/bg1.jpg');
}
.index-product{
    width: 100%;
    height: auto;
    background: url('../assets/img/syyj/bg2.jpg');
    margin-top: -5px;
}
.index-cert{
    width: 100%;
    height: auto;
    background: url('../assets/img/syyj/bg3.jpg');
    margin-bottom: -5px;
}
.index-article{
    width: 100%;
    height: auto;
    background: url('../assets/img/syyj/bg4.jpg');
}
.verticle-line{
    width:2px;
    height:70px;
    background-color:#c7c7c7;
    margin-top: 15px;
    margin-left: 30px; 
    margin-right: 30px;
}
.search-part{
    display: flex;
    flex-direction: row;
    height: 40px;
    flex: 1;
    margin-top: 30px;
    border: 2px solid black;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
}
.cert-search-part{
    display: flex;
    flex-direction: row;
    height: 50px;
    flex: 1;
    border: 4px solid #ae0000;
    border-radius: 5px;
    width: 500px;
    margin: 30px auto;
}
.search-input{
    flex: 1;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 40px;
    outline:none;
    border:none;
}
.search-btn{
    text-align: center;
    justify-content: center;
    align-items: center;
    background-color: black;
    padding-left: 12px;
    padding-right: 10px;
    cursor:pointer;
}
.contact-part{
    display: flex;
    flex-direction: row;
    height: 100px;
    justify-content: center;
    align-items: center;
}
.index-label-text{
    font-size:28px;
    color:black;
    text-align:center;
    font-family: KaiTi,KaiTi_GB2312 ! important;
    font-weight:900;
    margin: 0 auto;
    border-bottom: 2px dashed black;
    line-height: 1;
}
.product-rec-part{
    margin-top: 25px;
    padding-left:80px;
    padding-right:80px;
    height:auto; 
    overflow:hidden; 
}
.product-rec-list{

}
.product-rec-part .list-scroll{ width:100%;overflow:hidden; position:relative;}
.product-rec-part .list-scroll ul{ position:absolute; left:0; top:0; overflow:hidden;}
.product-rec-part ul{ overflow:hidden;}
.product-rec-part ul li{ margin-right:10px; margin-bottom:10px; overflow:hidden; position:relative; float:left;background-color: white;padding: 5px;}
.product-rec-part ul li img{ left:0; top:0; z-index:10; }
.product-rec-part ul li:hover img{opacity: 0.8;filter: alpha(opacity=80);}
.product-rec-part ul li div.link{ display:block; height:30px; line-height:30px; text-align:center;font-family: KaiTi,KaiTi_GB2312 ! important; color:#000; font-size:14px; z-index:20;}

.article-item{
    display: flex;
    flex-direction: column;
    font-family: KaiTi,KaiTi_GB2312 ! important;
    color: black;
    background-color: #efefef;
}
.article-item img{width: 100%;height: auto;}
.article-item img:hover{opacity: 0.8;filter: alpha(opacity=80);}
</style>
<template>
    <!-- <Slider :value.sync="value" range></Slider> -->
    <!-- <div class="top_bg"></div> -->
    <div>
        <swiper :options="swiperOption" ref="mySwiperA">
            <!-- 幻灯内容 -->
            <swiper-slide v-for="item in advlist" >
                <img :src="item.cover" :style="secondAdv" @click="goPage(item)"/>
            </swiper-slide>
            <!-- 以下控件元素均为可选 -->
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <!-- <div class="swiper-scrollbar"   slot="scrollbar"></div> -->
        </swiper>
    </div>
    <!-- <Page :current="1" :total="100"  show-total @on-change="change"></Page> -->

    <div class="index-product" >
        <div style="display:flex;flex-direction:column;width:70%;margin-left:15%;background-color:white;">
            <div style="display:flex;flex-direction:row;height:100px;padding-left:80px;padding-right:80px;">
                <div style="font-size:28px;color:black;height:100%;text-align:center;line-height:100px;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:900;">上玉元吉</div>
                <div class="verticle-line"></div>
                <div class="search-part">
                    <div style="color:black;line-height:36px;padding-right:20px;padding-left:20px;background-color:#c7c7c7;">商品</div>
                    <input v-model="searchProductText" placeholder="题材、样式" class="search-input">
                    <div class="search-btn" @click="goProductList">
                        <img src="../assets/img/syyj/search.png" style="width:20px;height:20px;margin-top:8px;">
                    </div>
                </div>
                <div class="verticle-line"></div>
                <div class="contact-part">
                    <img src="../assets/img/syyj/telephone.png" style="width:50px;height:50px;">
                    <div style="margin-left:15px;display:flex;flex-direction:column;font-family: KaiTi,KaiTi_GB2312 ! important;color:black;">
                        <div>客服热线</div>
                        <div>0512-67526713</div>
                    </div>
                </div>
            </div>
            <div style="width:100%;height:2px;background-color:#e7e7e7;" :id="'anchor-'+1"></div>
            <div class="index-label-text" style="margin-top:50px;cursor:pointer" @click="goProductList">作品赏析</div>
            <div class="product-rec-part">
                <div class="product-rec-list" style="background:#e7e7e7;padding:10px;">
                    <div class="list-scroll" :style="{height:scrollHeight}">
                        <ul :style="{width:scrollWidth,height:scrollHeight}">
                           <li v-for="item in productList" :style="proStyle" @click="goGood(item)">
                               <img :src="item.cover+'?imageView2/1/w/2000/h/1200/interlace/1'" :style="proImgStyle"/>
                               <div class="link" :style="{width:proStyle.width}">{{item.name}}</div>
                           </li>

                       </ul>
                   </div>
               </div> 

           </div>
       </div>
   </div>

   <div :id="'anchor-'+2" class="index-cert">
    <div style="display:flex;flex-direction:column;width:70%;margin-left:15%;background-color:white;">
        <div class="index-label-text" style="margin-top:50px;cursor:pointer" @click="searchCert">证书查询</div>
        <div class="cert-search-part">
            <input id="certInput" v-model="searchCertText" placeholder="证书编号" class="search-input" >
            <div  @click="searchCert" style="background-color:#ae0000;color:white;line-height:45px;padding-left:15px;padding-right:15px;font-size:18px;font-family: KaiTi,KaiTi_GB2312 ! important;font-weight:800;cursor:pointer;">
             查询
         </div>
     </div>
 </div>
 <img src="../assets/img/syyj/index_temp.jpg" style="width:100%;height:auto;5">
</div>
<div :id="'anchor-'+3" class="index-article">
    <div style="display:flex;flex-direction:column;width:70%;margin-left:15%;background-color:white;padding-bottom:50px;">
        <div class="index-label-text" style="margin-top:50px;cursor:pointer;" @click="goArticleList">玉雕文化</div>
        <div class="product-rec-part" style="-moz-column-count:3;-webkit-column-count:3;column-count:3;-moz-column-gap:20px;-webkit-column-gap:20px;column-gap:20px;">
            <div class="article-item" v-for="item in articleList" @click="goArticle(item)">
                <img :src="item.cover+'?imageView2/1/w/1000/h/600/interlace/1'" >
                <div style="font-size:16px;margin: 10px auto;line-height: 1;border-bottom: 1px dashed black;">
                    {{item.title}}</div>
                    <div style="padding-left:10px;padding-right:10px;padding-bottom:15px;height:70px;text-indent: 2em;word-break: break-all;display: -webkit-box;-webkit-line-clamp: 3; -webkit-box-orient: vertical;line-height:20px;">{{item.summary}}</div>
                </div>
            </div> 
        </div>
    </div>
    <bottom></bottom>
</template>

<script>
    import Swiper from 'vux/dist/components/swiper'
    import SwiperItem from 'vux/dist/components/swiper-item'
    import SeeMore from './partial/see-more'
    import {Page} from 'iview';
    import bottom from './partial/bottom'


    export default {
        route: {
            data() {
                document.title = "天工艺品";
                var tabIndex = this.$route.query.tab;
                if (tabIndex ==4) {

                }else if (tabIndex == 5) {
                    this.getRecommendProductList();
                }else{
                    this.goAnchor("#anchor-"+tabIndex);
                }
            }
        },
        components: {
            Swiper,
            SwiperItem,
            SeeMore,
            Page,
            bottom
        },
        ready() {
            document.body.style.overflow = 'visible';
            this.$dispatch.apply(this, ['onTitleChanged', {
                title: '优选',
                back: false
            }]);
            this.screenWidth = window.innerWidth / 2 - 12 + 'px';
            this.getAdvList();
            this.getRecommendProductList();
            this.getArticleList();
            this.scrollNum = 0;

        },
        beforeDestroy() {
           clearInterval(this.prodIntval);
       },
       data() {
        return {
            offset: 0,
            max: 10,
            productList: [],
            articleList:[],
            preference: [],
            master: [],
            list: [],
            goods: [],
            serviceRule: '',
            advlist: [],
            screenWidth: '',
            firstAdv: {
                width: window.screen.availWidth / 2 + 'px',
                height: window.screen.availWidth / 2 * 1.288 + 'px'
            },
            secondAdv: {
                width: window.screen.availWidth + 'px',
                height: window.screen.availWidth * 760 / 1920 + 'px'
            },
            proStyle:{
                width: (window.screen.availWidth*0.7-213)/3 + 'px',
                height: (window.screen.availWidth*0.7-213)/5+40 + 'px'     
            },
            proImgStyle:{
                width: (window.screen.availWidth*0.7-213)/3-10 + 'px',
                height: ((window.screen.availWidth*0.7-213)/3-10)*3/5 + 'px'     
            },
            
           scrollHeight: (window.screen.availWidth*0.7-213)/5*2+90 +'px',
           scrollWidth: (window.screen.availWidth*0.7-213)*3+90 + 'px',
           swiperOption: {
                    // 所有配置均为可选（同Swiper配置）  
                    notNextTick: true,
                    autoplay: 5000,
                    grabCursor : true,
                    setWrapperSize :true,
                    autoHeight: true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    // scrollbar:'.swiper-scrollbar',
                    mousewheelControl : false,
                    observeParents:true,
                    onTransitionStart(swiper){
                    }
                },
                scrollNum:0,
                prodIntval:'',
                searchProductText: '',
                searchCertText: ''
            }
        },
        methods: {
            intval(){
                this.prodIntval =setInterval(this.autoscroll,5000);
            },

            goAnchor(selector) {

                var anchor = $(selector);
                if (anchor[0]) {
                    var total = anchor[0].offsetTop-50;
                    $('html body').animate({scrollTop: total}, 500)

                }else{
                    setTimeout(function(){
                        var anchor = $(selector);
                        if (anchor[0]) {
                            var total = anchor[0].offsetTop-50;
                            $('html body').animate({scrollTop: total}, 500)
                        }
                    },500);
                }

            },
            autoscroll() {

                var $w = $('.list-scroll li').width() + 20;
                this.scrollNum++;
                if (this.scrollNum == 3) {
                    this.scrollNum = 0;
                }
                var distance = -3 * $w * this.scrollNum;
                $('.list-scroll ul').stop().animate({left: distance});
            },

            getAdvList() {
                var url = "http://47.94.206.22:3001/api/banner/getBannerList";
                this.$http.get(
                    url
                    )
                .then((res) => {
                    if (res.status == 200) {
                        this.advlist = res.data;
                    };
                })
                .catch((res) => {
                    log("error:" + JSON.stringify(res));
                });
            },

            getRecommendProductList() {
                var url = "http://47.94.206.22:3001/api/product/frontGetProductList";
                this.$http.post(url, {
                    page:1,
                    size:18,
                    name:''
                }).then((result) => {
                    this.productList = result.data;
                    var that = this;
                    this.intval();

                })
            },
            getArticleList(){
             var url = "http://47.94.206.22:3001/api/article/frontGetArticleList";
             this.$http.post(url, {
                page:1,
                size:3
            }).then((result) => {
                log(result.data.array);
                this.articleList = result.data.array;
            })
        },
        searchCert(){
            if (!this.searchCertText) {
                alert("请输入证书编码");
                $("#certInput").focus();
                return;
            }else{
                var url = "http://localhost:3001/api/cert/getFrontCertDetail/"+this.searchCertText;
                this.$http.get(
                    url
                    )
                .then((res) => {
                    log(res);
                    if (res.status == 200) {
                        if (res.data) {
                            this.$route.router.go({
                                name: 'certDetail_item',
                                params: {
                                    certCode: this.searchCertText
                                }
                            });
                        }else{
                            alert("未查找到该证书的信息");
                        }
                    }else{
                        alert("未查找到该证书的信息");
                    }
                })
                .catch((res) => {
                    log("error:" + JSON.stringify(res));
                });
            }
        },
        goProductList(){
            var searchKey = this.searchProductText ? this.searchProductText : '';
            log(searchKey)
            this.$route.router.go({
                name: 'mallList_item',
                query: {
                    searchKey: searchKey
                }
            });
        },
        goArticle(item){
            this.$route.router.go({
                name: 'articleDetail_item',
                params: {
                    id: item.id
                }
            });
        },
        goArticleList(){
            this.$route.router.go({
                name: 'articleList_item'
                
            });
        },
        goPage(item) {
            log(item);
            window.location.href = item.cover_link;
            
        },
        
        goGood: function(item) {
            if (item.id > 0) {
                this.$route.router.go({
                    name: 'mallDetail_item',
                    params: {
                        id: item.id
                    }
                });
            };

        },
        

    },
    computed: {
        swiper() {
          return this.$refs.mySwiperA.swiper
      }
  },
  mounted() {
    console.log("每次切换都会触发我");
    this.swiper.slideTo(3, 1000, false)
},
}
</script>
