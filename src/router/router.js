import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { useGlobalStore } from '@/stores/globalstore'

// define routes before creating router
const rts = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/data',
        name: 'dataroot',
        redirect: { name: 'dataManage'},
        //component: () => import('../views/ManageRoot.vue'),
        children: [
            {
                path: '/data/manage',
                name: 'dataManage',
                //alias: '/data',
                component: () => import('../views/ManageData.vue'),
            },
            {
                path: '/data/manage/:mtype',
                name: 'dataManageMtype',
                component: () => import('../views/ManageMtype.vue'),
            },
            {
                path: '/data/edit/:slug',
                name: 'dataEdit',
                component: () => import('../views/DataItemEdit.vue'),
                props: route => ({ mode: 'edit'}),
                beforeEnter: async (to, from, next) => {
                    next();
                }
            },
            {
                path: '/data/create/:mtype',
                name: 'dataCreate',
                props: { mode: 'create' },
                component: () => import('../views/DataItemEdit.vue'),
                //props: route => ({ mode: 'create', arg: route.params.mtype }),
                props: route => ({ mode: 'create'}),
                asyncbeforeEnter: (to, from, next) => {
                    next();
                }
            },

        ]
    },


    {
        path: '/data/view/:slug',
        name: 'dataView',
        component: () => import('../views/DataItemView.vue'),
        props: route => ({ arg: route.params.slug }),
        beforeEnter: (to, from, next) => {
            next();
        }
    },
    {
        path: '/mtypes',
        name: 'mtypes',
        component: () => import('../views/ManageMTypes.vue')
    },
    {
        path: '/mtypes/:slug',
        name: 'mtypeDetail',
        component: () => import('../views/MTypeDetail.vue'),
        props: route => ({ arg: route.params.slug}),
        beforeEnter: (to, from, next) => {
            //console.log('mtype detail');
            next();
        }
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../views/SearchPage.vue')
    },
    {
        path: '/explore',
        name: 'explore',
        component: () => import('../views/ExplorePage.vue')
    },

    {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
    },
]

// add dev route(s) only if in development
if (import.meta.env.VITE_APP_ENV == "development") {
    rts.push(
        {
            path: '/devpage',
            name: 'devpage',
            component: () => import('../views/dev/DevPageUI.vue')
        }
    )
}

const router = createRouter({
    //mode: 'history',
    //history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: rts
})

router.beforeEach(async (to, from) => {
    // quick fix for gat reload on config fetch
    // needs to be improved
    // ===
    // this gives the store time to fetch all info when GAT is configured to reload on config fetch;
    // thus allowing page reloads while editing data
    const s = useGlobalStore();
    if (s.server.status == 1) {
        await new Promise(r => setTimeout(r, 300));
    }
})


export default router
