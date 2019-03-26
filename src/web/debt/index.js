import Template from '@/template';
export default {
    path: '/debt',
    component: Template,
    meta: {
        title: '债转'
    },
    children: [{
            path: 'debtList',
            name: 'debt_debtList',
            component: resolve => require(['./debtList'], resolve),
            meta: {
                title: '债权转让'
            }
        },
        {
            path: 'debtLista',
            name: 'debt_debtLista',
            component: resolve => require(['./debtLista'], resolve),
            meta: {
                title: '借条'
            }
        },
        {
            path: 'projectDetail',
            name: 'debt_projectDetail',
            component: resolve => require(['./projectDetail'], resolve),
            meta: {
                title: '项目详情'
            }
        },
        // {
        //     path: 'saleDebt',
        //     name: 'debt_saleDebt',
        //     component: resolve => require(['./saleDebt'], resolve),
        //     meta: {
        //         title: '出售债转'
        //     }
        // },
        {
            path: 'detailsdeb',
            name: 'debt_detailsdeb',
            component: resolve => require(['./detailsdeb'], resolve),
            meta: {
                title: '产品详情'
            }
        },
        {
            path: 'detailsowe',
            name: 'debt_detailsowe',
            component: resolve => require(['./detailsowe'], resolve),
            meta: {
                title: '债权详情'
            }
        },
    ]

}