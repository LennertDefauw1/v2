import { getPublicKeyOfUsername } from '@/modules/Login/services/external.service';
import { encrypt } from '@/modules/Core/services/crypto.service';
import { emitJoin, emitLeave, emitLogin } from '@/modules/Core/services/socket.service';
import { SocketJoin, SocketLeave, SocketLogin } from '@/modules/Core/interfaces/socket.interface';
import { nanoid } from 'nanoid';
import { appId, appPublicKey, locationId, scope, selectedImageId, state, username } from '@/modules/Initial/data';

export const loginUser = async () => {
    const doubleName = username.value + '.3bot';

    const roomToJoinUser: SocketLeave = { room: doubleName };
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

    const roomToLeaveUser: SocketLeave = { room: doubleName };
    emitLeave(roomToLeaveUser);

    const roomToJoinRandom: SocketJoin = { room: randomRoom };
    emitJoin(roomToJoinRandom);

    const loginAttempt: SocketLogin = { doubleName: doubleName, encryptedLoginAttempt: encryptedAttempt };
    emitLogin(loginAttempt);
};
