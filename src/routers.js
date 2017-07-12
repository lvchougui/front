const LoginComponent = resolve => require(['./views/login'], resolve);
const RegisterComponent = resolve => require(['./views/register'], resolve);
const ForgetpasswordComponent = resolve => require(['./views/modify_password'], resolve);
import MainLayoutComponent from './views/main-layout';
import HomeComponent from './views/home';

//商品详情
const MallDetailComponent = resolve => require(['./views/mall/detail'], resolve);
//证书详情
const CertDetailComponent = resolve => require(['./views/certificate/detail'], resolve);

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
        '/certy/detail/:id': {
            name: 'certDetail_item',
            component: CertDetailComponent
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
