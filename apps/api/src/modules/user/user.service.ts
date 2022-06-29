import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private _prisma: PrismaService) {}

    async create(payload: Prisma.UserCreateInput) {
        return this._prisma.user.create({ data: payload });
    }

    async findAll() {
        return this._prisma.user.findMany();
    }

    async findByUsername(username: string) {
        return this._prisma.user.findUnique({
            where: {
                username: username,
            },
        });
    }
}
