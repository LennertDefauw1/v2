import { createApp } from 'vue';
import App from './App.vue';
import './index.css';

import '@/components/global';
import { registerGlobalComponent } from './components/global';
import { createVueRouter } from '@/router';
import { registerModules } from '@/router/registerRouters';

import InitModule from '@/modules/Initial';
import LoginModule from '@/modules/Login';
import CoreModule from '@/modules/Core';
import sodium from 'libsodium-wrappers';
import socketIo from '@/plugins/SocketIo';
import { Config } from '@/modules/Core/configs';

const initApplication = async () => {
    await sodium.ready;

    const app = createApp(App);
    app.use(socketIo, {
        connection: Config.API_BACKEND_URL,
        options: { allowEIO3: true },
        transports: ['websocket'],
    });

    const router = createVueRouter();
    await registerModules(router, [CoreModule, InitModule, LoginModule]);
    app.use(router);

    registerGlobalComponent(app);

    app.mount('#app');
};

initApplication().then(_ => {
    console.log('Application loaded');
});
