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
    doubleName: string;
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
