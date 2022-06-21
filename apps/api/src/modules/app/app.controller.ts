import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('')
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('maintenance')
    isInMaintenance(): any {
        return { maintenance: 0 };
    }

    @Get('minimumversion')
    getMinimumVersion(): any {
        return { android: 70, ios: 70 };
    }
}
