import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
    constructor(private _prisma: PrismaService) {}

    async create(payload: Prisma.UserCreateInput) {
        return this._prisma.user.create({ data: payload });
    }

    async getAll() {
        return this._prisma.user.findMany();
    }

    async getById(userId: string) {
        return this._prisma.user.findUnique({
            where: {
                userId,
            },
        });
    }

    async getByUsername(username: string) {
        return this._prisma.user.findUnique({
            where: {
                username,
            },
        });
    }
}
