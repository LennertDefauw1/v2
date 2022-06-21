import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/user.dto';
import { User as UserModel } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('')
    async addUser(@Body() userDto: CreateUserDto): Promise<UserModel> {
        return await this.userService.create(userDto);
    }

    @Get('')
    async getAllUsers(): Promise<UserModel[]> {
        return await this.userService.getAll();
    }

    @Get(':uuid')
    async getUserById(@Param('uuid', new ParseUUIDPipe()) uuid: string): Promise<UserModel> {
        return await this.userService.getById(uuid);
    }
}
