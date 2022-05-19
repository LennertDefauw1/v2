import { Router } from 'vue-router';
import PathNotFound from '@/modules/Core/views/PathNotFound.vue';
import ErrorPage from '@/modules/Core/views/ErrorPage.vue';

const coreRoutes = [
    {
        path: '/404',
        name: '404',
        component: PathNotFound,
        props: true,
    },
    {
        path: '/error',
        name: 'error',
        component: ErrorPage,
        props: true,
    },
    {
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
];

export default async (router: Router) => {
    router.beforeEach((to, from, next) => {
        next();
    });

    coreRoutes.forEach(route => {
        router.addRoute(route);
    });
};
