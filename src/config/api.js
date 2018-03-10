export default {
    host: 'http://192.168.80.159:8091',
    common: {
        login: '/admin/system/employee/sign/in'
    },
    system: {
        permissionAll: '/admin/system/role/permission/all',
        role: '/admin/system/role/all',
        rolePermission: '/admin/system/role/permission',
        statistics: '/admin/system/statistics/dashboard'
    },
    otc:{
        //法币币种管理
        OtcCoin: '/admin/otc/otc-coin/page-query',
        detail:'admin/otc/otc-coin/detail',
        update: 'admin/otc/otc-coin/update', 
        create: 'admin/otc/otc-coin/create',
        //法币广告管理
        advertise:'admin/otc/advertise/page-query'
    }
}