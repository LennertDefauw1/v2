import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { FlagsmithService } from '../flagsmith/flagsmith.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService, private readonly flagService: FlagsmithService) {}

    @Get('')
    getHello(): string {
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
