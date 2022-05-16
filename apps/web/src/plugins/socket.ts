import { io } from 'socket.io-client';
import axios from 'axios';

export default {
    install: (app: any, { connection, options }: any) => {
        const socket = io(connection, options);
        app.config.globalProperties.$socket = socket;

        console.log(socket);
        app.provide('socket', socket);
    },
};
