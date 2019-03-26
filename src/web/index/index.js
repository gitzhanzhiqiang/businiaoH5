import Template from '@/template';
export default {
    path: '/',
    component: Template,
    meta: {
        title: '主页'
    },
    children: [{
            path: 'index',
            name: 'index',
            component: resolve => require(['./index.vue'], resolve),
            meta: {
                title: '主页',
                content: '32453'
            }
        },
        {
            path: '/',
            redirect: '/index' //重定向为主页
        },
        {
            path: 'debtSelect',
            name: 'debtSelect',
            component: resolve => require(['./debtSelect.vue'], resolve),
            meta: {
                title: '出售类型'
            }
        },
        {
            path: 'customService',
            name: 'customService',
            component: resolve => require(['./customService.vue'], resolve),
            meta: {
                title: '客服'
            }
        },
        {
            path: 'imgPreview',
            name: 'imgPreview',
            component: resolve => require(['./imgPreview.vue'], resolve),
            meta: {
                title: ''
            }
        },
        {
            path: 'hotPlatform',
            name: 'hotPlatform',
            component: resolve => require(['./hotPlatform'], resolve),
            meta: {
                title: '热门平台'
            }
        },
        {
            path: 'platformFile',
            name: 'platformFile',
            component: resolve => require(['./platformFile'], resolve),
            meta: {
                title: '平台档案'
            }
        },
        {
            path: 'saleDebt',
            name: 'saleDebt',
            component: resolve => require(['./saleDebt.vue'], resolve),
            meta: {
                title: '出售P2P债权'
            }
        },
        {
            path: 'oweDebt',
            name: 'oweDebt',
            component: resolve => require(['./oweDebt.vue'], resolve),
            meta: {
                title: '出售借条债权'
            }
        },
    ]

}