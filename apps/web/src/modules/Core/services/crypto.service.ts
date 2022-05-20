import sodium from 'libsodium-wrappers';
import { decodeBase64, encodeBase64 } from 'tweetnacl-util';

export const encrypt = (message: string, publicKey: Uint8Array): string => {
    const encryptionKey: Uint8Array = sodium.crypto_sign_ed25519_pk_to_curve25519(publicKey);
    return encodeBase64(sodium.crypto_box_seal(message, encryptionKey, 'uint8array'));
};

export const validateSignedAttempt = async (signedAttempt: string, publicKey: Uint8Array) => {
    const attempt: Uint8Array = sodium.crypto_sign_open(decodeBase64(signedAttempt), publicKey);
    if (attempt === null) {
        throw new Error('Invalid signature');
    }

    return attempt;
};