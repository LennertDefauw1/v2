import { Module } from '@nestjs/common';
import { DigitaltwinService } from './digitaltwin.service';
import { DigitaltwinController } from './digitaltwin.controller';
import { UserService } from '../user/user.service';

@Module({
    providers: [DigitaltwinService, UserService],
    exports: [DigitaltwinService],
    controllers: [DigitaltwinController],
})
export class DigitalTwinModule {}
