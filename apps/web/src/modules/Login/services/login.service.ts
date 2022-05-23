import { getPublicKeyOfUsername } from '@/modules/Login/services/external.service';
import { encrypt } from '@/modules/Core/services/crypto.service';
import { emitJoin, emitLeave, emitLogin } from '@/modules/Core/services/socket.service';
import { ISocketJoin, ISocketLeave, ISocketLogin } from '@/modules/Core/interfaces/socket.interface';
import { nanoid } from 'nanoid';
import {
    appId,
    appPublicKey,
    locationId,
    redirectUrl,
    scope,
    selectedImageId,
    state,
    username,
} from '@/modules/Initial/data';

export const loginUserWeb = async () => {
    const doubleName = username.value + '.3bot';

    const roomToJoinUser: ISocketJoin = { room: doubleName };
    emitJoin(roomToJoinUser);

    const pk = await getPublicKeyOfUsername(doubleName);
    if (pk.length === 1) return;

    const randomRoom = nanoid();

    const objectToEncrypt = JSON.stringify({
        doubleName: doubleName,
        state: state.value,
        scope: scope.value,
        appId: appId.value,
        randomRoom: randomRoom,
        appPublicKey: appPublicKey.value,
        randomImageId: selectedImageId.value.toString(),
        locationId: locationId.value,
    });

    const encryptedAttempt = encrypt(objectToEncrypt, pk);

    const roomToLeaveUser: ISocketLeave = { room: doubleName };
    emitLeave(roomToLeaveUser);

    const roomToJoinRandom: ISocketJoin = { room: randomRoom };
    emitJoin(roomToJoinRandom);

    const loginAttempt: ISocketLogin = { doubleName: doubleName, encryptedLoginAttempt: encryptedAttempt };
    emitLogin(loginAttempt);
};

export const loginUserMobile = async () => {
    const randomRoom = nanoid().toLowerCase();
    const roomToJoin: ISocketJoin = { room: randomRoom };
    emitJoin(roomToJoin);

    const uniLinkUrl = `threebot://login/?state=${state.value}&scope=${scope.value}&appId=${appId.value}&randomRoom=${randomRoom}&appPublicKey=${appPublicKey.value}&redirecturl=${redirectUrl.value}`;

    window.open(uniLinkUrl);
};
