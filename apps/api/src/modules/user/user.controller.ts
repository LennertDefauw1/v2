import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.dto';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('')
    async add(@Body() userDto: CreateUserDto): Promise<UserModel> {
        return await this.userService.create(userDto);
    }

    @Get('')
    async getAll(): Promise<UserModel[]> {
        return await this.userService.getAll();
    }

    @Get(':username')
    async getByUsername(@Param('username') username: string): Promise<UserModel> {
        return await this.userService.getByUsername(username);
    }
}
