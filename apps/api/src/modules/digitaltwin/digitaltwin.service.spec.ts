import { encodeBase64 } from 'tweetnacl-util';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { mnemonicToEntropy } from 'bip39';
import { UserService } from '../user/user.service';
import { DigitalTwinService } from './digitaltwin.service';
import { DigitalTwinController } from './digitaltwin.controller';
import { UserController } from '../user/user.controller';
import { PrismaService } from 'nestjs-prisma';
import { NotFoundException } from '../../exceptions';

const mnemonic =
    'finger enlist owner coyote deposit inmate verify seven kit grow basket artwork cream drama inject fame desert bus nice virtual material puzzle health beyond';

const secondMnemonic =
    'wheel crisp valley proof magnet crash confirm sorry dignity hurt use gesture grit twenty innocent chronic market airport verify differ lesson gadget stone boss';

const mismatchError = 'incorrect signature for the given public key';

const sodium = require('libsodium-wrappers');

const message = 'Hallo Lennert uit JS';
let signedMessage = new Uint8Array(0);

const createSigningKeyPair = (mnemonic: string) => {
    const entropy = mnemonicToEntropy(mnemonic);
    const encodedEntropy = Uint8Array.from(Buffer.from(entropy, 'hex'));

    return sodium.crypto_sign_seed_keypair(encodedEntropy);
};

describe('Signing test', () => {
    let userController: UserController;
    let digitalTwinController: DigitalTwinController;

    let prismaService: PrismaService;
    let userService: UserService;
    let digitalTwinService: DigitalTwinService;

    beforeEach(async () => {
        await sodium.ready;

        prismaService = new PrismaService();

        userService = new UserService(prismaService);
        userController = new UserController(userService);

        digitalTwinService = new DigitalTwinService(prismaService, userService);
        digitalTwinController = new DigitalTwinController(digitalTwinService);
    });

    it('Should sign a message with the private signing key', () => {
        const kp = createSigningKeyPair(mnemonic);

        signedMessage = sodium.crypto_sign(message, kp.privateKey);

        const readableSignedMessage = new TextDecoder().decode(signedMessage);
        expect(readableSignedMessage).not.toBeNull();
    });

    it('Should verify the message with the public signing key', () => {
        const kp = createSigningKeyPair(mnemonic);

        const verifiedMessage = sodium.crypto_sign_open(signedMessage, kp.publicKey);
        const readableVerifiedMessage = new TextDecoder().decode(verifiedMessage);

        expect(readableVerifiedMessage).toBe(message);
    });

    it('Should throw a signature mismatch', () => {
        const kp = createSigningKeyPair(secondMnemonic);

        expect(() => sodium.crypto_sign_open(signedMessage, kp.publicKey)).toThrow(mismatchError);
    });

    it(' Should create a digital twin for a user', async () => {
        const username = 'local.3bot';

        const messageToSign = {
            derivedPublicKey: randomStringGenerator(),
            appId: encodeBase64(randomStringGenerator()),
        };

        const kp = createSigningKeyPair(mnemonic);

        const signedMessage = encodeBase64(sodium.crypto_sign(JSON.stringify(messageToSign), kp.privateKey));
        await digitalTwinService.create(username, signedMessage);
    });

    it('Should return array of all twins', async () => {
        const result = [];

        jest.spyOn(digitalTwinService, 'findAll').mockImplementation(async () => result);
        expect(await digitalTwinController.findAll()).toBe(result);
    });

    it('Should update the Yggdrasil IP address', async () => {
        const username = 'local.3bot';
        const appId = 'circles.threefold.me';

        const existingTwin = await digitalTwinService.findByUsernameAndAppId(username, appId);
        if (!existingTwin) {
            throw new NotFoundException('Twin not found');
        }

        const updatedField = await digitalTwinService.update('2222:2222:2222:2222', existingTwin.id);

        const newTwin = await digitalTwinService.findByUsernameAndAppId(username, appId);

        expect(updatedField.yggdrasilIp).toBe(newTwin.yggdrasilIp);
    });
});
