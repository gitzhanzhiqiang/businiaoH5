import Template from '@/template';
export default {
    path: '/buy',
    component: Template,
    meta: {
        title: '求购'
    },
    children: [{
            path: '/',
            redirect: '/buy/list' //重定向
        },
        {
            path: 'list',
            name: 'buy_list',
            component: resolve => require(['./list'], resolve),
            meta: {
                title: '求购列表'
            }
        },
        {
            path: 'shopping',
            name: 'buy_shopping',
            component: resolve => require(['./shopping'], resolve),
            meta: {
                title: '求购债权'
            }
        },
        {
            path: 'me',
            name: 'buy_me',
            component: resolve => require(['./me'], resolve),
            meta: {
                title: '我的求购'
            }
        },
        {
            path: 'details',
            name: 'buy_details',
            component: resolve => require(['./details'], resolve),
            meta: {
                title: '求购详情'
            }
        },
        {
            path: 'mydetails',
            name: 'buy_mydetails',
            component: resolve => require(['./mydetails'], resolve),
            meta: {
                title: '求购详情'
            }
        }
    ]

}