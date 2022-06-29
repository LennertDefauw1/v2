import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserService } from '../user/user.service';
import { BadRequestException, NotFoundException } from '../../exceptions';
import { verifySignature } from 'custom-crypto';
import { decodeBase64 } from 'tweetnacl-util';
import { CreateDigitalTwinDto, DigitalTwinDetailsDto, DigitalTwinDto } from './dtos/digitaltwin.dto';
import { CreateTwinResponseEnum } from './enums/response.enum';
import {
    findAllTwinsByUsernameQuery,
    findAllTwinsQuery,
    findTwinByUsernameAndAppIdQuery,
} from './queries/digitaltwin.queries';

@Injectable()
export class DigitalTwinService {
    constructor(private _prisma: PrismaService, private readonly userService: UserService) {}

    async create(username: string, payload: string) {
        const user = await this.userService.findByUsername(username);

        if (!user) {
            throw new NotFoundException(`Username ${username} doesn't exist`);
        }

        const signedData = await verifySignature(payload, decodeBase64(user.mainPublicKey));
        if (!signedData) {
            throw new BadRequestException('Signature mismatch');
        }

        const readableMessage = new TextDecoder().decode(signedData);
        const messageData: CreateDigitalTwinDto = JSON.parse(readableMessage);

        const existingTwins = await this.findByUsernameAndAppId(user.username, messageData.appId);
        if (existingTwins) {
            console.log(`Skip the creation part since the combination of appId and username already exists`);
            return CreateTwinResponseEnum.ALREADY_CREATED;
        }

        const b = {
            ...messageData,
            userId: user.userId,
        };

        return this._prisma.digitalTwin.create({ data: b });
    }

    async updateYggdrasilHandler(username: string, payload: string) {
        const user = await this.userService.findByUsername(username);

        if (!user) {
            throw new NotFoundException(`Username ${username} doesn't exist`);
        }

        const signedData = await verifySignature(payload, decodeBase64(user.mainPublicKey));
        if (!signedData) {
            throw new BadRequestException('Signature mismatch');
        }
    }

    async update(yggdrasilIp: string, twinId: string) {
        return this._prisma.digitalTwin.update({
            data: {
                yggdrasilIp: yggdrasilIp,
            },
            where: {
                id: twinId,
            },
        });
    }

    async findAll(): Promise<DigitalTwinDto[]> {
        const t = await this._prisma.digitalTwin.findMany(findAllTwinsQuery);

        return t.map(twin => {
            return {
                yggdrasilIp: twin.yggdrasilIp,
                appId: twin.appId,
                username: twin.user.username,
            };
        });
    }

    async findByUsername(username: string): Promise<DigitalTwinDetailsDto[]> {
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new NotFoundException(`Username ${username} doesn't exist`);
        }

        const t = await this._prisma.digitalTwin.findMany(findAllTwinsByUsernameQuery(user.userId));

        if (!t || t.length == 0) {
            throw new NotFoundException('No twins found for username ' + username);
        }

        return t.map(twin => {
            return {
                yggdrasilIp: twin.yggdrasilIp,
                appId: twin.appId,
                username: twin.user.username,
                derivedPublicKey: twin.derivedPublicKey,
            };
        });
    }

    async findByUsernameAndAppId(username: string, appId: string): Promise<DigitalTwinDetailsDto> {
        const user = await this.userService.findByUsername(username);
        if (!user) {
            throw new NotFoundException(`Username ${username} doesn't exist`);
        }

        const t = await this._prisma.digitalTwin.findFirst(findTwinByUsernameAndAppIdQuery(user.userId, appId));
        if (!t) {
            return;
        }

        return {
            id: t.id,
            yggdrasilIp: t.yggdrasilIp,
            appId: t.appId,
            username: t.user.username,
            derivedPublicKey: t.derivedPublicKey,
        };
    }
}
