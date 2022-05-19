import { inject, reactive } from 'vue';
import {
    SocketCheckName,
    SocketJoin,
    SocketLeave,
    SocketLogin,
    SocketLoginResult,
    SocketSign,
} from '@/modules/Core/interfaces/socket.interface';
import { SocketEmitType, SocketListenType } from '@/modules/Core/types/socket.type';
import { userKnown } from '@/modules/Initial/data';
import { socketCallbackCancel, socketCallbackLogin } from '@/modules/Login/services/callback.service';

const state = reactive<State>({
    socket: '',
});

export const initializeSockets = () => {
    state.socket = inject('socket');

    state.socket.on(SocketListenType.CONNECT, () => {
        console.log('[SOCKET:RECEIVE]: CONNECTED');
    });

    state.socket.on(SocketListenType.DISCONNECT, () => {
        console.log('[SOCKET:RECEIVE]: DISCONNECTED');
    });

    state.socket.on(SocketListenType.NAME_KNOWN, () => {
        console.log('[SOCKET:RECEIVE]: NAME KNOWN');
        userKnown.value = true;
    });

    state.socket.on(SocketListenType.NAME_UNKNOWN, () => {
        console.log('[SOCKET:RECEIVE]: NAME UNKNOWN');
        userKnown.value = false;
    });

    state.socket.on(SocketListenType.LOGIN_CANCEL, () => {
        console.log('[SOCKET:RECEIVE]: LOGIN CANCEL');
        socketCallbackCancel();
    });

    state.socket.on(SocketListenType.LOGIN_CALLBACK, async (data: SocketLoginResult) => {
        console.log('[SOCKET:RECEIVE]: LOGIN_CALLBACK');
        await socketCallbackLogin(data);
    });
};

export const emitCheckName = (name: SocketCheckName) => {
    console.log('[SOCKET:SEND]: CHECK NAME');
    state.socket.emit(SocketEmitType.CHECK_NAME, name);
};

export const emitJoin = (room: SocketJoin) => {
    state.socket.connect();
    console.log('[SOCKET:SEND]: JOIN ROOM');
    state.socket.emit(SocketEmitType.JOIN, room);
};

export const emitLeave = (room: SocketLeave) => {
    console.log('[SOCKET:SEND]: LEAVE ROOM');
    state.socket.emit(SocketEmitType.LEAVE, room);
};

export const emitLogin = (login: SocketLogin) => {
    console.log('[SOCKET:SEND]: LOGIN');
    state.socket.emit(SocketEmitType.LOGIN, login);
};

export const emitSign = (sign: SocketSign) => {
    console.log('[SOCKET:SEND]: SIGN');
    state.socket.emit(SocketEmitType.SIGN, sign);
};

interface State {
    socket: any;
}
