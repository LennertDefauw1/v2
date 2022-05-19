export const SocketEmitType = {
    JOIN: 'join',
    LEAVE: 'leave',
    LOGIN: 'login',
    SIGN: 'sign',
    CHECK_NAME: 'checkname',
};

export const SocketListenType = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    NAME_KNOWN: 'nameknown',
    NAME_UNKNOWN: 'namenotknown',
    LOGIN_CALLBACK: 'signedAttempt',
    SIGN_CALLBACK: 'sign',
    LOGIN_CANCEL: 'cancelLogin',
};
