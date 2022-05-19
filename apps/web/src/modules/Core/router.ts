import { Router } from 'vue-router';
import PathNotFound from '@/modules/Core/views/404.vue';
import ErrorPage from '@/modules/Core/views/Error.vue';
import { isValidQueryUrl } from '@/modules/Initial/services/query.service';
import { appId } from '@/modules/Initial/data';

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
        component: PathNotFound,
    },
];

export default async (router: Router) => {
    router.beforeEach((to, from, next) => {
        if (to.name === 'initial') {
            isValidQueryUrl(to) ? next() : next('/error');
        }

        if (to.name === 'login') {
            appId.value ? next() : next('error');
        }

        next();
    });

    coreRoutes.forEach(route => {
        router.addRoute(route);
    });
};
