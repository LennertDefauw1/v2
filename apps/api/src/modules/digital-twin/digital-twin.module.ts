import { Module } from '@nestjs/common';
import { DigitalTwinService } from './digital-twin.service';
import { DigitalTwinController } from './digital-twin.controller';

@Module({
    providers: [DigitalTwinService],
    exports: [DigitalTwinService],
    controllers: [DigitalTwinController],
})
export class DigitalTwinModule {}
