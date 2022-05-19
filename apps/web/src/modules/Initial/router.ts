import { Router } from 'vue-router';
import Initial from '@/modules/Initial/views/Initial.vue';

export const initialRoutes = [
    {
        name: 'initial',
        path: '/',
        component: Initial,
    },
];

export default async (router: Router) => {
    for (const route of initialRoutes) {
        router.addRoute(route);
    }
};
