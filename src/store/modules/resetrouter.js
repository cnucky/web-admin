const ahFastThree = {
    namespaced: true,

    state: {
        myrouter: []
    },
    mutations: {
        myrouterFn(state) {
            state.myrouter = [{
                path: '/member',
                icon: 'ios-people',
                title: '会员管理',
                name: 'member',
                component: Main,
                children: [
                    { path: 'list', title: '会员信息', icon: 'ios-person', name: 'member:page-query', component: resolve => { require(['@/views/member/Member.vue'], resolve); } },
                    { path: 'authenticate', title: '实名会员审核', icon: 'ios-person', name: 'member:member-application:page-query', component: resolve => { require(['@/views/member/Authenticate.vue'], resolve); } }
                ]
            }];
        },
    }
}