const LoginComponent = resolve => require(['./views/login'], resolve);
const RegisterComponent = resolve => require(['./views/register'], resolve);
const ForgetpasswordComponent = resolve => require(['./views/modify_password'], resolve);
import MainLayoutComponent from './views/main-layout';
import HomeComponent from './views/home';
import MyComponent from './views/my';
//夺宝
import DuobaoIndexComponent from './views/duobao/index';
import DuobaoItemComponent from './views/duobao/item';
const DuobaoHistoryComponent = resolve => require(['./views/duobao/history'], resolve);
const DuobaoMyPrizeComponent = resolve => require(['./views/duobao/myprize'], resolve);
const DuobaoMyRecordComponent = resolve => require(['./views/duobao/myrecord'], resolve);
const DuobaoShowComponent = resolve => require(['./views/duobao/show'], resolve);
const DuobaoPhoneComponent = resolve => require(['./views/duobao/phone'], resolve);
//我的
const AuctionOrderComponent = resolve => require(['./views/my/auction-order'], resolve);
const AuctionOrderItemComponent = resolve => require(['./views/my/auction-order-item'], resolve);
const AuctionOrderPayComponent = resolve => require(['./views/order/auction-order-pay'], resolve);
const MallOrderComponent = resolve => require(['./views/my/mall-order'], resolve);
const MallOrderItemComponent = resolve => require(['./views/my/mall-order-item'], resolve);
const DevilerComponent = resolve => require(['./views/my/deviler'], resolve);
const AddressListComponent = resolve => require(['./views/my/address-list'], resolve);
const AddressEditComponent = resolve => require(['./views/my/address-edit'], resolve);
const AddressAddComponent = resolve => require(['./views/my/address-add'], resolve);
const MyAuctions = resolve => require(['./views/my/my-auctions'], resolve);
const MyCollectionComponent = resolve => require(['./views/my/collection'], resolve);
const SetPersonListComponent = resolve => require(['./views/set/personList'], resolve);
const AboutUsComponent = resolve => require(['./views/set/about_us'], resolve);

//优选详情
const PreferenceDetailItemComponent = resolve => require(['./views/preference/detail'], resolve);
//拍品详情
const AuctionDetailItemComponent = resolve => require(['./views/auction/detail'], resolve);
const AuctionDepositItemComponent = resolve => require(['./views/auction/needDepositDetail'], resolve);
//期次详情
const PeriodDetailItemComponent = resolve => require(['./views/PeriodDetail/item'], resolve);
//艺趣
import YiquListComponent from './views/artInteresting/list';
//拍卖
import AuctionComponent from './views/auction/index';
//好物
import ShopComponent from './views/mall/index';
//品牌
import BrandComponent from './views/brand/index';
const YiquCommentsComponent = resolve => require(['./views/artInteresting/comments'], resolve);
const YiquDetailComponent = resolve => require(['./views/artInteresting/detail'], resolve);
//优惠券
const CouponsItemComponent = resolve => require(['./views/coupons/list'], resolve);
//0元列表
const ZeroPatListItemComponent = resolve => require(['./views/zeropat/list'], resolve);
//优选商品详情
const MallDetailComponent = resolve => require(['./views/mall/detail'], resolve);
//商城商品详情
const MallProductDetailComponent = resolve => require(['./views/mall/productDetail'], resolve);
const StageList = resolve => require(['./views/stage/list'], resolve);
//设置页面
const SetListComponent = resolve => require(['./views/set/setList'], resolve);
//修改密码
const modifPasswordComponent = resolve => require(['./views/set/modifPassword'], resolve);
//用户反馈
const UserFeedComponent = resolve => require(['./views/set/userFeed'], resolve);
// 匠心堂
const MasterListComponent = resolve => require(['./views/master/list'], resolve);
const MasterDetailComponent = resolve => require(['./views/master/detail'], resolve);
const MasterIntroComponent = resolve => require(['./views/master/intro'], resolve);
//订单详情
const OrderPay = resolve => require(['./views/order/order-pay'], resolve);
//积分
const RedeemHomeComponent = resolve => require(['./views/redeem/home'], resolve);
const RedeemRecordComponent = resolve => require(['./views/redeem/record'], resolve);
//专场拍卖
const StageDetailComponent = resolve => require(['./views/stage/detail'], resolve);
//专题购
const ActivityListComponent = resolve => require(['./views/activity/activity-list'], resolve);
const ActivityDetailComponent = resolve => require(['./views/activity/activity-detail'], resolve);
const ActivityGoodComponent = resolve => require(['./views/activity/activity-good'], resolve);
const ActivityOrderComponent = resolve => require(['./views/activity/activity-order'], resolve);
//我的账户
const MyAccountComponent = resolve => require(['./views/account/myAccount'], resolve);
//充值
const EechargeComponent = resolve => require(['./views/account/recharge'], resolve);
//提现
const DepositComponent = resolve => require(['./views/account/deposit'], resolve);
//我的收入
const MyIncomeComponent = resolve => require(['./views/account/myIncome'], resolve);
//积分规则
const IntegralRulesComponent = resolve => require(['./views/my/integralRules'], resolve);
//支付保证金
const PayDepositComponent = resolve => require(['./views/auction/pay-deposit'], resolve);
//文案
const WithdrawDoc = resolve => require(['./views/doc/withdraw'], resolve);
const DepositRulesDoc = resolve => require(['./views/doc/deposit-rules'], resolve);
const CreditsRulesDoc = resolve => require(['./views/doc/credits-rules'], resolve);

//用户
const UserInfo = resolve => require(['./views/user/userinfo'], resolve);

//空页面
const EmptyPage = resolve => require(['./views/empty-page'], resolve);

//今日特价
import SaleList from './views/sale/sale-list';
const SaleGood = resolve => require(['./views/sale/sale-good'], resolve);
const SaleOrder = resolve => require(['./views/sale/sale-order'], resolve);

//品牌详情
const BrandDetailComponent = resolve => require(['./views/mall/brandDetail'], resolve);
//频道详情
const ChannelDetailComponent = resolve => require(['./views/mall/channelDetail'], resolve);

//活动页
import AutumnGift from './views/single/autumn-gift';
import November from './views/single/November';
import Meilin from './views/single/meilin';
import HaoWu1 from './views/single/haowu1';
import HaoWu2 from './views/single/haowu2';
import TeaCoupon from './views/popular/tea-coupon'
import ActivityRegister from './views/popular/activity-register'
import GiftBag from './views/popular/giftbag'

//私人定制
import PrivateMake from './views/popular/privatemake';

//App介绍
import CompanyMake from './views/popular/companymake'


//人气好物列表
import PopularityList from './views/popularity/activity-detail'

//活动商品列表
import ActivityGoodList from './views/popularity/activity-good'

//商品分类列表
const MallProductCategoryComponent = resolve => require(['./views/mall/newMallcategory'], resolve);

//确认订单
const ConfirmOrder = resolve => require(['./views/order/confirm-order'], resolve);

//支付中心
const PayCentre = resolve => require(['./views/order/pay-centre'], resolve);

//待支付订单列表
const WaitPayOrders = resolve => require(['./views/order/wait-pay-list'], resolve);
//待发货订单列表
const WaitDeliverOrders = resolve => require(['./views/order/wait-deliver-list'], resolve);
//待收货订单列表
const WaitReceiveOrders = resolve => require(['./views/order/wait-receive-list'], resolve);
//已完成订单列表
const FinishOrders = resolve => require(['./views/order/order-finish-list'], resolve);


//推荐好友送茶
const CommendTea = resolve => require(['./views/popular/tea_commend'], resolve);

//红茶团购
const BlackTea = resolve => require(['./views/popular/blacktea'], resolve);

//优选分类
const PreferenceCategory = resolve => require(['./views/my/preference_category'], resolve);

//收藏夹
const AuctionCollection = resolve => require(['./views/my/collection-aution'], resolve);

//我的保证金
const MineDepositHistory = resolve => require(['./views/my/deposit-history'], resolve);

//领券中心
const CouponCentre = resolve => require(['./views/coupons/centre'], resolve);

//新版我的优惠券
const MineCouponList = resolve => require(['./views/coupons/my-coupon'], resolve);

//新版选择优惠券 
const ChooseCoupon = resolve => require(['./views/coupons/choose-coupon'], resolve);

//客服与帮助
const HelpCentre =  resolve => require(['./views/help/index'], resolve);

//问题详情
const HelpAnswer =  resolve => require(['./views/help/answer'], resolve);	

//问题列表
const QuestionList = resolve => require(['./views/help/question-list'], resolve);

export default function routeConfig(router) {
    router.map({
        '/login': {
            name: 'login',
            component: LoginComponent
        },
        '/register': {
            name: 'register',
            component: RegisterComponent
        },
        '/forgetpassword': {
            name: 'forgetpassword',
            component: ForgetpasswordComponent
        },
        '/': {
            name: 'main',
            component: MainLayoutComponent,
            subRoutes: {
                '/': {
                    name: 'home',
                    component: HomeComponent
                },
                '/auction': {
                    name: 'auction',
                    component: AuctionComponent
                },
                '/my': {
                    name: 'my',
                    component: MyComponent
                },
                '/shop': {
                    name: 'shop_index',
                    component: ShopComponent
                },
                '/brand': {
                    name: 'brand_index',
                    component: BrandComponent
                }, 
            }
        },
        //我的订单
        '/my/auction-order': {
            name: 'auction_order',
            component: AuctionOrderComponent
        },
        '/my/auction-order/item/:id': {
            name: 'auction_order_item',
            component: AuctionOrderItemComponent
        },
        '/my/auction-order/pay/:id': {
            name: 'auction_order_pay',
            component: AuctionOrderPayComponent
        },
        '/my/mall-order': {
            name: 'my_mall_order',
            component: MallOrderComponent
        },
        '/my/mall-order/item/:id': {
            name: 'mall_order_item',
            component: MallOrderItemComponent
        },
        '/my/deviler/:id': {
            name: 'deviler',
            component: DevilerComponent
        },
        //我的地址
        '/my/address-list': {
            name: 'address-list',
            component: AddressListComponent
        },
        '/my/address-edit/:id': {
            name: 'address-edit',
            component: AddressEditComponent
        },
        '/my/address-add': {
            name: 'address-add',
            component: AddressAddComponent
        },
        '/my/my-auctions': {
            name: 'my-auctions',
            component: MyAuctions
        },
        //夺宝
        '/duobao': {
            name: 'duobao_index',
            component: DuobaoIndexComponent
        },
        '/duobao/item/:id': {
            name: 'duobao_item',
            component: DuobaoItemComponent
        },
        '/duobao/history/:id': {
            name: 'duobao_history',
            component: DuobaoHistoryComponent
        },
        '/duobao/myprize': {
            name: 'duobao_myprize',
            component: DuobaoMyPrizeComponent
        },
        '/duobao/myrecord': {
            name: 'duobao_myrecord',
            component: DuobaoMyRecordComponent
        },
        '/duobao/show/:id': {
            name: 'duobao_show',
            component: DuobaoShowComponent
        },
        '/phone/bind': {
            name: 'bind_phone',
            component: DuobaoPhoneComponent
        },
        //匠心堂
        '/masters': {
            name: 'master_list',
            component: MasterListComponent
        },
        '/master/:id': {
            name: 'master_detail',
            component: MasterDetailComponent
        },
        '/master/:id/intro': {
            name: 'master_intro',
            component: MasterIntroComponent
        },
        '/order/pay': {
            name: 'order_pay',
            component: OrderPay
        },
        //优选活动详情
        '/preference/detail/:id': {
            name: 'preferenceDetail_item',
            component: PreferenceDetailItemComponent
        },
        //拍品详情
        '/auction/detail/:id': {
            name: 'auctionDetail_item',
            component: AuctionDetailItemComponent
        },
        //拍品详情
        '/order/pay/auction': {
            name: 'auctionDeposit_item',
            component: AuctionDepositItemComponent
        },
        //优选商品详情
        '/mall/detail/:id': {
            name: 'mallDetail_item',
            component: MallDetailComponent
        },
        //商城商品详情
        '/mall/productDetail/:id': {
            name: 'mallProductDetail_item',
            component: MallProductDetailComponent
        },
        //期次详情
        '/PeriodDetail/item/:id': {
            name: 'PeriodDetail_item',
            component: PeriodDetailItemComponent
        },
        //艺趣详情
        '/artInteresting/comments/:id': {
            name: 'yiqu_comments',
            component: YiquCommentsComponent
        },
        '/artInteresting/detail/:id': {
            name: 'yiqu_detail',
            component: YiquDetailComponent
        },
        //优惠券
        '/coupons/list': {
            name: 'coupons_list',
            component: CouponsItemComponent
        },
        //期次列表
        '/stages': {
            name: 'stage_list',
            component: StageList
        },
        //0元拍场
        '/zeropat/list': {
            name: 'zeroPat_list',
            component: ZeroPatListItemComponent
        },
        //专题购
        '/activity/list': {
            name: 'activity_list',
            component: ActivityListComponent
        },
        '/activity/detail/:id': {
            name: 'activity_detail',
            component: ActivityDetailComponent
        },
        '/activity/good/:id': {
            name: 'activity_good',
            component: ActivityGoodComponent
        },
        '/activity/order': {
            name: 'activity_order',
            component: ActivityOrderComponent
        },
        //我的收藏
        '/my/collection': {
            name: 'my_collection',
            component: MyCollectionComponent
        },
        //设置页面
        '/set/setList': {
            name: 'set_setList',
            component: SetListComponent
        },
        //修改密码
        '/set/modifPassword': {
            name: 'modifPassword',
            component: modifPasswordComponent
        },
        //用户反馈
        '/set/userFeed': {
            name: 'userFeed',
            component: UserFeedComponent
        },
        //修改个人资料页面
        '/set/personList': {
            name: 'userinfo',
            component: SetPersonListComponent
        },
        //关于我们界面
        '/about_us': {
            name: 'about_us',
            component: AboutUsComponent
        },
        //积分
        '/redeem/home': {
            name: 'redeem_home',
            component: RedeemHomeComponent
        },
        '/redeem/record': {
            name: 'redeem_record',
            component: RedeemRecordComponent
        },
        //专场拍卖
        '/stage/detail/:id': {
            name: 'stage_detail',
            component: StageDetailComponent
        },
        //我的账户
        '/account/myAccount': {
            name: 'myAccount',
            component: MyAccountComponent
        },
        //充值
        '/account/recharge': {
            name: 'recharge',
            component: EechargeComponent
        },
        //提现
        '/account/deposit': {
            name: 'deposit',
            component: DepositComponent
        },
        //我的收入
        '/account/myIncome': {
            name: 'myIncome',
            component: MyIncomeComponent
        },
        //积分规则
        '/my/integralRules': {
            name: 'integralRules',
            component: IntegralRulesComponent
        },
        //支付保证金
        '/auction/pay-deposit/:id': {
            name: 'pay_deposit',
            component: PayDepositComponent
        },
        //文案
        '/doc/withdraw': {
            name: 'withdraw-doc',
            component: WithdrawDoc
        },
        '/doc/deposit-rules': {
            name: 'deposit-rules-doc',
            component: DepositRulesDoc
        },
        '/doc/credits-rules': {
            name: 'credits-rules-doc',
            component: CreditsRulesDoc
        },
        //用户
        '/user/userinfo/:id': {
            name: 'userinfo',
            component: UserInfo
        },
        '/empty-page': {
            name: 'empty-page',
            component: EmptyPage
        },
        //今日特价
        '/mall/promotion': {
            name: 'sale-list',
            component: SaleList
        },
        '/mall/promotion/:id': {
            name: 'sale-good',
            component: SaleGood
        },
        '/mall/promotion/order': {
            name: 'sale-order',
            component: SaleOrder
        },

        //活动页
        '/single/autumn-gift': {
            name: 'autumn-gift',
            component: AutumnGift
        },
        '/single/november': {
            name: 'November',
            component: November
        },
        '/a/meilin': {
            name: 'Meilin',
            component: Meilin
        },
        '/a/chaqi': {
            name: 'Chaqi',
            component: HaoWu1
        },
        '/a/shipin': {
            name: 'Shipin',
            component: HaoWu2
        },
        '/popular/register': {
            name: 'activity_register',
            component: ActivityRegister
        },
        '/popular/giftbag': {
            name: 'giftbag',
            component: GiftBag
        },

        //私人定制
        '/popular/privatemake': {
            name: "privatemake",
            component: PrivateMake
        },

        //红茶礼包
        '/popular/teacoupon': {
            name: "tea_coupon",
            component: TeaCoupon
        },
		//人气好物
		'/popularity/list': {
			name: 'popularity',
			component: PopularityList
		},
		//活动商品列表
		'/popularity/goodlist': {
			name: 'activity-good-list',
			component: ActivityGoodList
		},
		//品牌详情
		'/mall/brandDetail/:id': {
			name: 'brandDetail_item',
			component: BrandDetailComponent
		},
		//频道详情
		'/mall/channelDetail/:id': {
			name: 'channelDetail_item',
			component: ChannelDetailComponent
		},
		//分类商品列表
		'/mall/mallcategory/:id': {
			name: 'mallcategory',
			component: MallProductCategoryComponent
		},
		//订单确认
		'/order/confirm/:id': {
			name: 'confirm_order',
			component: ConfirmOrder
		},
		//支付中心
		'/order/pay/:id': {
			name: 'pay-centre',
			component: PayCentre
		},
		//待支付订单列表
		'/order/waitPayList': {
			name: 'wait_pay_orders',
			component: WaitPayOrders
		},
		//待发货订单列表
		'/order/waitDeliverList': {
			name: 'wait_deliver_orders',
			component: WaitDeliverOrders
		},
		//待收货订单列表
		'/order/waitReceiveList': {
			name: 'wait_receive_orders',
			component: WaitReceiveOrders
		},
		//已完成订单列表
		'/order/finishList': {
			name: 'finish_orders',
			component: FinishOrders
		},
		//推荐送茶
		'/popular/tea_commend': {
			name: 'tea_commend',
			component: CommendTea
		},
		//红茶团购
		'/popular/blacktea': {
			name: 'black_tea',
			component: BlackTea
		},
		//优选分类
		'/preferencecategory/:id' : {
			name: 'PreferenceCategory',
			component: PreferenceCategory
		},
		//收藏夹
		'/mycollection' : {
			name: 'mycollection',
			component: AuctionCollection
		},
		//我的保证金
		'/mydeposit' : {
			name: 'mydeposit',
			component: MineDepositHistory
		},
		//领券中心
		'/couponcentre' : {
			name: 'couponcentre',
			component: CouponCentre
		},
		//我的优惠券
		'/minecoupon' : {
			name: 'minecoupon',
			component: MineCouponList
		},
		//选择优惠券
		'/choosecoupon' : {
			name: 'choosecoupon',
			component: ChooseCoupon
		},
		//客服与帮助
		'/help' : {
			name: 'help',
			component: HelpCentre
		},
		//问题详情
		'/answer' : {
			name: "answer",
			component: HelpAnswer
		},
		//问题列表
		'/questions' : {
			name: "questions",
			component: QuestionList
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
