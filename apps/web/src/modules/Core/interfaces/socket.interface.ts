export interface SocketLeave {
    room: string;
}

export interface SocketJoin {
    room: string;
}

export interface SocketLogin {
    doubleName: string;
    encryptedLoginAttempt: string;
}

export interface SocketSign {
    doubleName: string;
    encryptedSignAttempt: string;
}

export interface SocketCheckName {
    doubleName: string;
}

export interface SocketLoginResult {
    doubleName: string;
    signedAttempt: string;
}

export interface SocketSignedAttempt {
    signedState: string;
    data: SocketSignedData;
    doubleName: string;
    randomRoom: string;
    appId: string;
    selectedImageId: number;
}

export interface SocketSignedData {
    nonce: string;
    ciphertext: string;
}
