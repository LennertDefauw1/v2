import { Router } from 'vue-router';
import Mail from '@/modules/Mail/views/Mail.vue';

export const mailRoutes = [
    {
        name: 'mail',
        path: '/verifyemail',
        component: Mail,
    },
];

export default async (router: Router) => {
    for (const route of mailRoutes) {
        router.addRoute(route);
    }
};
