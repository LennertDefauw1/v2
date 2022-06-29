import { Module } from '@nestjs/common';
import { DigitalTwinService } from './digitaltwin.service';
import { DigitalTwinController } from './digitaltwin.controller';
import { UserService } from '../user/user.service';

@Module({
    providers: [DigitalTwinService, UserService],
    exports: [DigitalTwinService],
    controllers: [DigitalTwinController],
})
export class DigitalTwinModule {}
