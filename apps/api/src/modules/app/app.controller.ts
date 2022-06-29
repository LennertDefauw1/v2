import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FlagsmithService } from '../flagsmith/flagsmith.service';
import sodium from 'libsodium-wrappers';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly flagService: FlagsmithService) {}

    @Get('')
    async getHello(): Promise<string> {
        const bip39 = require('bip39');
        const sodium = require('libsodium-wrappers');

        const mnemonic = bip39.generateMnemonic(256);
        const entropy = bip39.mnemonicToEntropy(mnemonic);

        await sodium.ready;

        const t = sodium.crypto_sign_keypair(entropy);
        console.log(t);

        return this.appService.getHello();
    }

    @Get('maintenance')
    async isInMaintenance() {
        const maintenance = await this.flagService.isInMaintenance();
        return { maintenance: maintenance };
    }

    @Get('minimumversion')
    async getMinimumVersion() {
        return await this.flagService.getMinimumVersions();
    }
}
