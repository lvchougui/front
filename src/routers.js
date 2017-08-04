import MainLayoutComponent from './views/main-layout';
import HomeComponent from './views/home';
import OpenComponent from './views/open'

//商品详情
const MallDetailComponent = resolve => require(['./views/mall/detail'], resolve);
//手机版商品详情
const PhoneMallDetailComponent = resolve => require(['./views/mall/mdetail'], resolve);
//商品列表
const MallListComponent = resolve => require(['./views/mall/list'], resolve);
//证书详情
const CertDetailComponent = resolve => require(['./views/certificate/detail'], resolve);
//玉雕文化详情
const ArticleDetailComponent = resolve => require(['./views/article/detail'], resolve);
//玉雕文化列表
const ArticleListComponent = resolve => require(['./views/article/list'], resolve);
//大师介绍
const MasterInfoComponent = resolve => require(['./views/brand/index'], resolve);
//获奖作品列表
const PrizeComponent = resolve => require(['./views/brand/list'], resolve);

export default function routeConfig(router) {
    router.map({
        '/': {
            name: 'open',
            component: OpenComponent,
        },

        '/home':{
            name: 'main',
            component: MainLayoutComponent,
            subRoutes: {
                '/': {
                    name: 'home',
                    component: HomeComponent
                },
                
            }
        },
        
        //商品详情
        '/mall/detail/:id': {
            name: 'mallDetail_item',
            component: MallDetailComponent
        },
        //手机版商品详情
        '/mall/mdetail/:id': {
            name: 'phoneMallDetail_item',
            component: PhoneMallDetailComponent
        },
        //商品列表
        '/mall/list': {
            name: 'mallList_item',
            component: MallListComponent
        },
        //证书详情
        '/cert/detail/:certCode': {
            name: 'certDetail_item',
            component: CertDetailComponent
        },
        //玉雕文化详情
        '/article/detail/:id': {
            name: 'articleDetail_item',
            component: ArticleDetailComponent
        },
        //玉雕文化列表
        '/article/list': {
            name: 'articleList_item',
            component: ArticleListComponent
        },
        //大师介绍
        '/master/info':{
            name:'masterInfo_item',
            component:MasterInfoComponent
        },
        //获奖列表
        '/master/info/:year':{
            name:'prize_item',
            component:PrizeComponent
        },
    });

    router.redirect({
        '*': '/'
    });

    router.afterEach(({ to }) => {
        // log(to.path);
        _hmt.push(['_trackPageview', to.path]);
    })

}
