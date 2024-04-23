import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    mode: 'history',
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
            //component: HomeView
        },
        {
            path: '/data',
            name: 'data',
            component: () => import('../views/ManageData.vue'),
            children: [
                {
                    path: '/data/manage/:mtype',
                    name: 'dataManage',
                    component: () => import('../views/ManageData.vue'),
                    props: route => ({ arg: route.params.mtype })
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
            path: '/data/edit/:slug',
            name: 'dataEdit',
            component: () => import('../views/DataItemEdit.vue'),
            props: route => ({ mode: 'edit', arg: route.params.slug }),
            beforeEnter: (to, from, next) => {
                next();
            }
        },
        {
            path: '/data/create/:mtype',
            name: 'dataCreate',
            props: { mode: 'create' },
            component: () => import('../views/DataItemEdit.vue'),
            props: route => ({ mode: 'create', arg: route.params.mtype }),
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
        {
            path: '/devpage',
            name: 'devpage',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/dev/DevPageUI.vue')
        }
    ]
})

export default router
