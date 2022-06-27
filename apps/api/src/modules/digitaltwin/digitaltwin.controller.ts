import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DigitaltwinService } from './digitaltwin.service';
import { CreateDigitalTwinDto } from './dtos/digitaltwin.dto';
import { DigitalTwin as DigitalTwinModel } from '@prisma/client';
import { UserService } from '../user/user.service';
import { DigitalTwinDto } from './interfaces/digitaltwin.interfaces';
import { ForbiddenException } from '../../exceptions';

@Controller('digitaltwin')
export class DigitaltwinController {
    constructor(private readonly digitalTwinService: DigitaltwinService, private readonly userService: UserService) {}

    @Post(':username')
    async addTwin(@Param('username') username: string, @Body() data: CreateDigitalTwinDto): Promise<DigitalTwinModel> {
        return await this.digitalTwinService.create(username, data);
    }

    @Get('')
    async getAllTwins(): Promise<DigitalTwinDto[]> {
        throw new ForbiddenException();
        return await this.digitalTwinService.getAll();
    }

    @Get(':username')
    async getDetailsByUsername(@Param('username') username: string): Promise<DigitalTwinDto[]> {
        return await this.digitalTwinService.getTwinsByUsername(username);
    }

    @Get(':username/:appId')
    async getDetails(@Param('username') username: string, @Param('appId') appId: string): Promise<DigitalTwinDto> {
        return await this.digitalTwinService.getDetails(username, appId);
    }
}
