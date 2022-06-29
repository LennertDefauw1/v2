import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.dto';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('')
    async create(@Body() userDto: CreateUserDto): Promise<UserModel> {
        return await this.userService.create(userDto);
    }

    @Get('')
    async findAll(): Promise<UserModel[]> {
        return await this.userService.findAll();
    }

    @Get(':username')
    async findByUsername(@Param('username') username: string): Promise<UserModel> {
        return await this.userService.findByUsername(username);
    }
}
