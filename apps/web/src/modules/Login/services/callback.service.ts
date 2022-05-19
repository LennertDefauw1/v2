import { getPublicKeyOfUsername } from '@/modules/Login/services/external.service';
import { validateSignedAttempt } from '@/modules/Core/services/crypto.service';
import { SocketLoginResult, SocketSignedAttempt } from '@/modules/Core/interfaces/socket.interface';
import { selectedImageId } from '@/modules/Initial/data';
import { redirectToOriginalLocation, redirectWithCancel } from '@/modules/Login/services/redirection.service';
import { encodeBase64 } from 'tweetnacl-util';
import { isMobile } from '@/utils/misc';

export const socketCallbackLogin = async (data: SocketLoginResult) => {
    if (!data.doubleName || !data.signedAttempt) return;

    const pk = await getPublicKeyOfUsername(data.doubleName);
    if (pk.length === 1) return;

    console.log('[CALLBACK]: PUBLIC KEY', encodeBase64(pk));

    const valid = await validateSignedAttempt(data.signedAttempt, pk);
    if (!valid) {
        return;
    }

    const signedAttempt = JSON.parse(new TextDecoder().decode(valid)) as SocketSignedAttempt;

    if (signedAttempt.selectedImageId !== selectedImageId.value && !isMobile()) {
        console.error('[CALLBACK]: selectedImageId mismatch');
        return;
    }

    redirectToOriginalLocation(data);
};

export const socketCallbackCancel = () => {
    redirectWithCancel();
};
