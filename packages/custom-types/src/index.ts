export enum SocketTypes {
    'CONNECT' = 'connect',
    'DISCONNECT' = 'disconnect',
    'JOIN' = 'JOIN',
    'LEAVE' = 'LEAVE',
    'CHECK_NAME' = 'CHECK_NAME',
    'SIGN' = 'SIGN',
    'LOGIN' = 'LOGIN',
    'NAME_KNOWN' = 'NAME_KNOWN',
    'NAME_UNKNOWN' = 'NAME_UNKNOWN',
    'LOGIN_CANCEL' = 'LOGIN_CANCEL',
    'LOGIN_CALLBACK' = 'LOGIN_CALLBACK',
}

export enum SocketEvents {
    'SIGN' = 'SIGN',
    'LOGIN' = 'LOGIN',
}

export interface ISocketLeave {
    room: string;
}

export interface ISocketJoin {
    room: string;
}

export interface ISocketLogin {
    doubleName: string;
    encryptedLoginAttempt: string;
}

export interface ISocketSign {
    doubleName: string;
    encryptedSignAttempt: string;
}

export interface ISocketCheckName {
    username: string;
}

export interface ISocketLoginResult {
    doubleName: string;
    signedAttempt: string;
}

export interface ISocketSignedAttempt {
    signedState: string;
    data: ISocketSignedData;
    doubleName: string;
    randomRoom: string;
    appId: string;
    selectedImageId: number;
}

export interface ISocketSignedData {
    nonce: string;
    ciphertext: string;
}
