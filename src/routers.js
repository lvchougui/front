const LoginComponent = resolve => require(['./views/login'], resolve);
const RegisterComponent = resolve => require(['./views/register'], resolve);
const ForgetpasswordComponent = resolve => require(['./views/modify_password'], resolve);
import MainLayoutComponent from './views/main-layout';
import HomeComponent from './views/home';

//商品详情
const MallDetailComponent = resolve => require(['./views/mall/detail'], resolve);
//证书详情
const CertDetailComponent = resolve => require(['./views/certificate/detail'], resolve);
//玉雕文化详情
const ArticleDetailComponent = resolve => require(['./views/article/detail'], resolve);

export default function routeConfig(router) {
    router.map({
        '/': {
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
    });

router.redirect({
    '*': '/'
});

router.afterEach(({ to }) => {
        // log(to.path);
        _hmt.push(['_trackPageview', to.path]);
    })

}
