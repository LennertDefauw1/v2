import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UserService {
    constructor(private _prisma: PrismaService) {}

    getById(id: number) {
        return this._prisma.user.findUnique({
            where: {
                id: id,
            },
        });
    }

    getByEmail(email: string) {
        return this._prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }
}
