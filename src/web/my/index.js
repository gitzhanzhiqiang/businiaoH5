import Template from '@/template';
export default {
    path: '/my',
    component: Template,
    meta: {
        title: '我的'
    },
    children: [{
            path: 'personalCenter',
            name: 'my_personalCenter',
            component: resolve => require(['./personalCenter'], resolve),
            meta: {
                title: '个人中心'
            }
        },
        {
            path: 'register',
            name: 'my_register',
            component: resolve => require(['./register'], resolve),
            meta: {
                title: '注册'
            }
        },
        {
            path: 'login',
            name: 'my_login',
            component: resolve => require(['./login'], resolve),
            meta: {
                title: '登录'
            }
        },
        {
            path: 'resetPassword',
            name: 'my_resetPassword',
            component: resolve => require(['./resetPassword'], resolve),
            meta: {
                title: '找回密码'
            }
        },
        {
            path: 'resetPasswordTwo',
            name: 'my_resetPasswordTwo',
            component: resolve => require(['./resetPasswordTwo'], resolve),
            meta: {
                title: '找回密码'
            }
        },
        {
            path: 'news',
            name: 'my_news',
            component: resolve => require(['./news'], resolve),
            meta: {
                title: '消息'
            }
        },
        {
            path: 'newsDetail',
            name: 'my_',
            component: resolve => require(['./newsDetail'], resolve),
            meta: {
                title: '消息详情'
            }
        },
        {
            path: 'recharge',
            name: 'my_recharge',
            component: resolve => require(['./recharge'], resolve),
            meta: {
                title: '充值'
            }
        },
        {
            path: 'cash',
            name: 'my_cash',
            component: resolve => require(['./cash'], resolve),
            meta: {
                title: '提现'
            }
        },
        {
            path: 'settings',
            name: 'my_settings',
            component: resolve => require(['./settings'], resolve),
            meta: {
                title: '设置'
            }
        },
        {
            path: 'modifyPhone',
            name: 'my_modifyPhone',
            component: resolve => require(['./modifyPhone'], resolve),
            meta: {
                title: '修改手机号'
            }
        },
        {
            path: 'tradepassword',
            name: 'my_tradepassword',
            component: resolve => require(['./tradepassword'], resolve),
            meta: {
                title: '设置交易密码'
            }
        },
        {
            path: 'tradexiupassword',
            name: 'my_tradexiupassword',
            component: resolve => require(['./tradexiupassword'], resolve),
            meta: {
                title: '修改交易密码'
            }
        },
        {
            path: 'modifyLoginPwd',
            name: 'my_modifyLoginPwd',
            component: resolve => require(['./modifyLoginPwd'], resolve),
            meta: {
                title: '修改登录密码'
            }
        },
        {
            path: 'aboutUs',
            name: 'my_aboutUs',
            component: resolve => require(['./aboutUs'], resolve),
            meta: {
                title: '关于我们'
            }
        },
        {
            path: 'addBankCard',
            name: 'my_addBankCard',
            component: resolve => require(['./addBankCard'], resolve),
            meta: {
                title: '添加银行卡'
            }
        },
        {
            path: 'bindBankCard',
            name: 'my_bindBankCard',
            component: resolve => require(['./bindBankCard'], resolve),
            meta: {
                title: '绑定银行卡'
            }
        },
        {
            path: 'bankcard',
            name: 'my_bankcard',
            component: resolve => require(['./bankcard'], resolve),
            meta: {
                title: '银行卡'
            }
        },
        {
            path: 'fundFlow',
            name: 'my_fundFlow',
            component: resolve => require(['./fundFlow'], resolve),
            meta: {
                title: '资金流水'
            }
        },
        {
            path: 'fundDetail',
            name: 'my_fundDetail',
            component: resolve => require(['./fundDetail'], resolve),
            meta: {
                title: '流水详情'
            }
        },
        {
            path: 'mydebts',
            name: 'my_mydebts-1',
            component: resolve => require(['./mydebts'], resolve),
            meta: {
                title: '我的转让_P2P_待付款'
            }
        },
        {
            path: 'mydebtsa',
            name: 'my_mydebtsa-1',
            component: resolve => require(['./mydebtsa'], resolve),
            meta: {
                title: '我的转让_借条_待付款'
            }
        },
        {
            path: 'mydebts1',
            name: 'my_mydebts1',
            component: resolve => require(['./mydebts'], resolve),
            meta: {
                title: '我的转让_P2P_锁定中'
            }
        },
        {
            path: 'mydebtsa1',
            name: 'my_mydebtsa1',
            component: resolve => require(['./mydebtsa'], resolve),
            meta: {
                title: '我的转让_借条_锁定中'
            }
        },
        {
            path: 'mydebts0',
            name: 'my_mydebts0',
            component: resolve => require(['./mydebts'], resolve),
            meta: {
                title: '我的转让_P2P_转让中'
            }
        },
        {
            path: 'mydebtsa0',
            name: 'my_mydebtsa0',
            component: resolve => require(['./mydebtsa'], resolve),
            meta: {
                title: '我的转让_借条_转让中'
            }
        },
        {
            path: 'mydebts2',
            name: 'my_mydebts2',
            component: resolve => require(['./mydebts'], resolve),
            meta: {
                title: '我的转让_P2P_已转让'
            }
        },
        {
            path: 'mydebtsa2',
            name: 'my_mydebtsa2',
            component: resolve => require(['./mydebtsa'], resolve),
            meta: {
                title: '我的转让_借条_已转让'
            }
        },
        {
            path: 'mydebts4',
            name: 'my_mydebts4',
            component: resolve => require(['./mydebts'], resolve),
            meta: {
                title: '我的转让_P2P_已下架'
            }
        },
        {
            path: 'mydebtsa4',
            name: 'my_mydebtsa4',
            component: resolve => require(['./mydebtsa'], resolve),
            meta: {
                title: '我的转让_借条_已下架'
            }
        },
        {
            path: 'mydebts3',
            name: 'my_mydebts3',
            component: resolve => require(['./mydebts'], resolve),
            meta: {
                title: '我的转让_申诉/冻结'
            }
        },
        {
            path: 'mydebtsa3',
            name: 'my_mydebtsa3',
            component: resolve => require(['./mydebtsa'], resolve),
            meta: {
                title: '我的转让_借条_申诉/冻结'
            }
        },
        {
            path: 'detailsPendingPay',
            name: 'my_detailsPendingPay',
            component: resolve => require(['./detailsPendingPay'], resolve),
            meta: {
                title: '待付款详情'
            }
        },
        {
            path: 'detailslockthe',
            name: 'my_detailslockthe',
            component: resolve => require(['./detailslockthe'], resolve),
            meta: {
                title: '锁定中详情'
            }
        },
        {
            path: 'detailstransfer',
            name: 'my_detailstransfer',
            component: resolve => require(['./detailstransfer'], resolve),
            meta: {
                title: '转让中详情'
            }
        },
        {
            path: 'detailsparticulars',
            name: 'my_detailsparticulars',
            component: resolve => require(['./detailsparticulars'], resolve),
            meta: {
                title: '已转让详情'
            }
        }, {
            path: 'detailsshelves',
            name: 'my_detailsshelves',
            component: resolve => require(['./detailsshelves'], resolve),
            meta: {
                title: '已下架详情'
            }
        }, {
            path: 'detailscomplaint',
            name: 'my_detailscomplaint',
            component: resolve => require(['./detailscomplaint'], resolve),
            meta: {
                title: '已申诉详情'
            }
        }, {
            path: 'myUnderTake10',
            name: 'my_myUnderTake10',
            component: resolve => require(['./myUnderTake'], resolve),
            meta: {
                title: '我的承接_锁定中'
            }
        },
        {
            path: 'myUnderTakea10',
            name: 'my_myUnderTakea10',
            component: resolve => require(['./myUnderTakea'], resolve),
            meta: {
                title: '我的承接_锁定中'
            }
        },
        {
            path: 'myUnderTake20',
            name: 'my_myUnderTake20',
            component: resolve => require(['./myUnderTake'], resolve),
            meta: {
                title: '我的承接_已承接'
            }
        },
        {
            path: 'myUnderTakea20',
            name: 'my_myUnderTakea20',
            component: resolve => require(['./myUnderTakea'], resolve),
            meta: {
                title: '我的承接_已承接'
            }
        },
        {
            path: 'myUnderTake30',
            name: 'my_myUnderTake30',
            component: resolve => require(['./myUnderTake'], resolve),
            meta: {
                title: '我的承接_申诉/冻结'
            }
        },
        {
            path: 'myUnderTakea30',
            name: 'my_myUnderTakea30',
            component: resolve => require(['./myUnderTakea'], resolve),
            meta: {
                title: '我的承接_申诉/冻结'
            }
        },
        {
            path: 'detailAppeal',
            name: 'my_detailAppeal',
            component: resolve => require(['./detailAppeal'], resolve),
            meta: {
                title: '已申诉详情'
            }
        },
        {
            path: 'detailUnderTake',
            name: 'my_detailUnderTake',
            component: resolve => require(['./detailUnderTake'], resolve),
            meta: {
                title: '已承接详情'
            }
        },
        {
            path: 'detailUnderTakeLock',
            name: 'my_detailUnderTakeLock',
            component: resolve => require(['./detailUnderTakeLock'], resolve),
            meta: {
                title: '锁定中详情'
            }
        },
        {
            path: 'modifyPwd',
            name: 'my_modifyPwd',
            component: resolve => require(['./modifyPwd'], resolve),
            meta: {
                title: 'demo'
            }
        },
        {
            path: 'attention',
            name: 'my_attention',
            component: resolve => require(['./attention'], resolve),
            meta: {
                title: '我的关注'
            }
        },
        {
            path: 'contactWay',
            name: 'my_contactWay',
            component: resolve => require(['./contactWay'], resolve),
            meta: {
                title: '联系方式'
            }
        },
        {
            path: 'existingEvidence',
            name: 'my_existingEvidence',
            component: resolve => require(['./existingEvidence'], resolve),
            meta: {
                title: '存证'
            }
        },
        {
            path: 'creatFolder',
            name: 'my_creatFolder',
            component: resolve => require(['./creatFolder'], resolve),
            meta: {
                title: '创建文件夹'
            }
        },
        {
            path: 'evidenceDtl',
            name: 'my_evidenceDtl',
            component: resolve => require(['./evidenceDtl'], resolve),
            meta: {
                title: '存证详情'
            }
        },
        {
            path: 'lousDtl',
            name: 'my_lousDtl',
            component: resolve => require(['./lousDtl'], resolve),
            meta: {
                title: '欠条详情'
            }
        },
        {
            path: 'editFolder',
            name: 'my_editFolder',
            component: resolve => require(['./editFolder'], resolve),
            meta: {
                title: '编辑文件夹'
            }
        },
        {
            path: 'editLous',
            name: 'my_editLous',
            component: resolve => require(['./editLous'], resolve),
            meta: {
                title: '编辑欠条'
            }
        },
        {
            path: 'inviteCourtesy',
            name: 'my_inviteCourtesy',
            component: resolve => require(['./inviteCourtesy'], resolve),
            meta: {
                title: '邀请有礼'
            }
        },
        {
            path: 'myInvite',
            name: 'my_myInvite',
            component: resolve => require(['./myInvite'], resolve),
            meta: {
                title: '我的邀请'
            }
        },
        {
            path: 'myWelfare',
            name: 'my_myWelfare',
            component: resolve => require(['./myWelfare'], resolve),
            meta: {
                title: '我的福利'
            }
        },
        {
            path: 'broughtwelfare',
            name: 'my_broughtwelfare',
            component: resolve => require(['./broughtwelfare'], resolve),
            meta: {
                title: '领福利'
            }
        },
        {
            path: 'registeredBenefits',
            name: 'my_registeredBenefits',
            component: resolve => require(['./registeredBenefits'], resolve),
            meta: {
                title: '注册领福利'
            }
        },
        {
            path: 'useCoupons',
            name: 'my_useCoupons',
            component: resolve => require(['./useCoupons'], resolve),
            meta: {
                title: '使用优惠券'
            }
        },
        {
            path: 'useInstruction',
            name: 'my_useInstruction',
            component: resolve => require(['./useInstruction'], resolve),
            meta: {
                title: '使用说明'
            }
        },
        {
            path: 'prepaySale',
            name: 'my_prepaySale',
            component: resolve => require(['./prepaySale'], resolve),
            meta: {
                title: '确认付款'
            }
        },
        {
            path: 'myowetransfer',
            name: 'my_myowetransfer',
            component: resolve => require(['./myowetransfer'], resolve),
            meta: {
                title: '债权详情'
            }
        },
        {
            path: 'myoweundertake',
            name: 'my_myoweundertake',
            component: resolve => require(['./myoweundertake'], resolve),
            meta: {
                title: '债权详情'
            }
        },
    ]

}