import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: { i18n: 'home' }, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        //此处name需要调整
        { path: 'finance/auditdetail', title: '审核详情', name: 'audit_detail', component: resolve => { require(['@/views/finance/AuditDetail.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/member',
        icon: 'ios-people',
        title: '会员管理',
        name: 'member',
        component: Main,
        children: [
            { path: 'list', title: '会员信息', icon: 'ios-person', name: 'member:page-query', component: resolve => { require(['@/views/member/Member.vue'], resolve); } },
            { path: 'authenticate', title: '实名会员审核', icon: 'ios-person', name: 'member:member-application:page-query', component: resolve => { require(['@/views/member/Authenticate.vue'], resolve); } }
        ]
    },
    {
        path: '/otc',
        icon: 'social-bitcoin',
        title: '法币管理',
        name: 'cointocoinmanas',
        component: Main,
        children: [
            { path: 'setting', title: '交易设置', icon: 'social-bitcoin', name: 'cointo_mana', component: resolve => { require(['@/views/otc/Setting.vue'], resolve); } },
            { path: 'advertise', title: '广告管理', icon: 'clipboard', name: 'tr_depute', component: resolve => { require(['@/views/otc/Advertise.vue'], resolve); } },
            { path: 'order', title: '订单管理', icon: 'clipboard', name: 'tr_record', component: resolve => { require(['@/views/otc/Order.vue'], resolve); } }
        ]
    },
    {
        path: '/exchange',
        icon: 'social-yen',
        title: '币币管理',
        name: 'coinmana',
        component: Main,
        children: [
            { path: 'setting', title: '交易设置', icon: 'social-euro', name: 'bb_dage', component: resolve => { require(['@/views/exchange/Setting.vue'], resolve); } },
            { path: 'order', title: '委托订单', icon: 'social-yen-outline', name: 'tr_adverm', component: resolve => { require(['@/views/exchange/Order.vue'], resolve); } }
        ]
    },
    {
        path: '/system',
        icon: 'person-stalker',
        title: '系统管理',
        name: 'system',
        component: Main,
        children: [
            { path: 'role', title: '角色管理', icon: 'person-stalker', name: 'system:role:all', component: resolve => { require(['@/views/system/Role.vue'], resolve); } },
            { path: 'department', title: '部门管理', icon: 'ios-keypad', name: 'system:department:all', component: resolve => { require(['@/views/system/Department.vue'], resolve); } },
            { path: 'employee', title: '员工管理', icon: 'ios-keypad', name: 'system:employee:findAllAdminUser', component: resolve => { require(['@/views/system/Department.vue'], resolve); } },
            { path: 'coin', title: '币种管理', icon: 'social-yen', name: 'system:coin:all', component: resolve => { require(['@/views/system/Coin.vue'], resolve); } }
        ]
    },
    {
        path: '/statistics',
        icon: 'arrow-graph-up-right',
        title: '统计管理',
        name: 'statistics',
        component: Main,
        children: [

        ]
    },
    {
        path: '/finance',
        icon: 'calculator',
        title: '财务管理',
        name: 'finance',
        component: Main,
        children: [
            //finance:member-transaction:page-query
            { path: 'userwithdrawals', title: '提币管理', icon: 'cash', name: 'finance:member-transaction:page-query', component: resolve => { require(['@/views/finance/WithdrawalsExamine.vue'], resolve); } },
            { path: 'fundrecord', title: '资金记录', icon: 'ios-pricetags', name: 'finance:withdraw-record:all', component: resolve => { require(['@/views/finance/Transaction.vue'], resolve); } }
        ]
    },
    {
        //       cms:system-advertise:page-query  广告管理
        // cms:system-help:page-query  帮助管理

        path: '/content',
        icon: 'folder',
        title: '内容管理',
        name: 'content',
        component: Main,
        children: [
            { path: 'advertise', title: '广告管理', icon: 'ios-keypad', name: 'conter_ma', component: resolve => { require(['@/views/content/AddAdvertisement.vue'], resolve); } }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];