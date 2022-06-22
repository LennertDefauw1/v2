import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class DigitalTwinService {
    constructor(private _prisma: PrismaService) {}

    async create(payload: Prisma.DigitalTwinCreateInput) {
        return this._prisma.digitalTwin.create({ data: payload });
    }

    async getAll() {
        return this._prisma.digitalTwin.findMany();
    }
}
