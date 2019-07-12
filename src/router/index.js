import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/quizLogin'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '评论数据' }
                },
                {
                    path: '/DataMerge',
                    component: resolve => require(['../components/page/DataMerge.vue'], resolve),
                    meta: { title: '数据融合' }
                },
                {
                    path: '/mediaTouchPoint',
                    component: resolve => require(['../components/page/touchPoint/mediaTouchPoint.vue'], resolve),
                    meta: { title: '媒介触点' }
                },
                {
                    path: '/newAndOldCustomer',
                    component: resolve => require(['../components/page/touchPoint/newAndOldCustomer.vue'], resolve),
                    meta: { title: '新老客' }
                },
                {
                    path: '/historyPurchasePeopleConstitute',
                    component: resolve => require(['../components/page/accumulateData/historyPurchasePeopleConstitute.vue'], resolve),
                    meta: { title: '历史P人群构成' }
                },
                {
                    path: '/quizLogin',
                    component: resolve => require(['../components/page/report/quizLogin.vue'], resolve),
                    meta: { title: '小测验' }
                },
                {
                    path: '/brandReport',
                    component: resolve => require(['../components/page/report/BrandReport.vue'], resolve),
                    meta: { title: '品牌报告' }
                },
                {
                    path: '/contentManagement',
                    component: resolve => require(['../components/page/touchPoint/contentManagement.vue'], resolve),
                    meta: { title: '内容运营' }
                },
                {
                    path: '/offlineTouchPoint',
                    component: resolve => require(['../components/page/touchPoint/offlineTouchPoint.vue'], resolve),
                    meta: { title: '线下触点' }
                },
                {
                    path: '/tianMaoPlatform',
                    component: resolve => require(['../components/page/touchPoint/tianMaoPlatform.vue'], resolve),
                    meta: { title: '天猫平台' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: resolve => require(['../components/page/I18n.vue'], resolve),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
