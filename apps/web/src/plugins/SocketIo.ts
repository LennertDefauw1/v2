import { io } from 'socket.io-client';

export default {
    install: (app: any, { connection, options }: any) => {
        const socket = io(connection, options);
        app.config.globalProperties.$socket = socket;

        socket.onAny((eventName, ...args) => {
            console.log('hoi');
            console.log(eventName, args);
        });

        app.provide('socket', socket);
    },
};
