import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { DigitalTwinDto } from './interfaces/digitaltwin.interfaces';
import { decodeBase64 } from '../../utils/base';
import { UserService } from '../user/user.service';

@Injectable()
export class DigitaltwinService {
    constructor(private _prisma: PrismaService, private userService: UserService) {}

    async create(username: string, payload: Prisma.DigitalTwinCreateInput) {
        const user = this.userService.getByUsername(username);

        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Username' + username + " doesn't exist",
                },
                HttpStatus.NOT_FOUND
            );
        }

        return this._prisma.digitalTwin.create({ data: payload });
    }

    async getAll(): Promise<DigitalTwinDto[]> {
        console.log('asdf');
        return await this._prisma.digitalTwin.findMany({
            select: {
                username: true,
                yggdrasilIp: true,
                appId: true,
            },
        });
    }

    async getTwinsByUsername(username: string): Promise<DigitalTwinDto[]> {
        const twins = await this._prisma.digitalTwin.findMany({
            select: {
                username: true,
                yggdrasilIp: true,
                appId: true,
                derivedPublicKey: true,
            },
            where: {
                username: username,
            },
        });

        if (!twins || twins.length == 0) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No twins found for username ' + username,
                },
                HttpStatus.NOT_FOUND
            );
        }

        return twins;
    }

    async getDetails(username: string, appId: string): Promise<DigitalTwinDto> {
        const decodedAppId = decodeBase64(appId).trim();

        if (!decodedAppId) {
            throw new HttpException(
                {
                    status: HttpStatus.EXPECTATION_FAILED,
                    error: 'AppId is empty or should be base64 encoded',
                },
                HttpStatus.EXPECTATION_FAILED
            );
        }

        const details = await this._prisma.digitalTwin.findFirst({
            select: {
                username: true,
                yggdrasilIp: true,
                appId: true,
                derivedPublicKey: true,
            },
            where: {
                username: username,
                appId: decodedAppId,
            },
        });

        if (!details) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'Username or appId not found',
                },
                HttpStatus.NOT_FOUND
            );
        }

        return details;
    }
}
