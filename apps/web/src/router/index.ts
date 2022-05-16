import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

const router = createRouter({
    routes,
    history: createWebHistory(),
});

// router.beforeEach((to, from, next) => {
//     if (to.name !== 'login') {
//         next({
//             name: 'login',
//         });
//     }
//     next();
// });

export default router;
