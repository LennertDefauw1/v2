import { Body, Controller, Get, Post } from '@nestjs/common';
import { DigitalTwinService } from './digital-twin.service';
import { CreateDigitalTwinDto } from './dtos/digital-twin.dto';
import { DigitalTwin as DigitalTwinModel } from '@prisma/client';

@Controller('digitaltwin')
export class DigitalTwinController {
    constructor(private readonly digitalTwinService: DigitalTwinService) {}

    @Post('')
    async add(@Body() digitalTwinDto: CreateDigitalTwinDto): Promise<DigitalTwinModel> {
        return await this.digitalTwinService.create(digitalTwinDto);
    }

    @Get('')
    async getAll(): Promise<DigitalTwinModel[]> {
        return await this.digitalTwinService.getAll();
    }
}
