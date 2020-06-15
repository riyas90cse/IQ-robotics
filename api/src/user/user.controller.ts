import { UserService } from './user.service';
import {Controller, Get, Post, Body, Put, Delete, Param, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {Observable} from 'rxjs';
import {UserDto} from './user.dto';
import {CreateUserDto} from './create-user.dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    getAllUsers(): Observable<UserDto[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    getUserById(@Param('id') id : string): Observable<UserDto> {
        return this.userService.findById(id);
    }

    @Post()
    createUser(@Body() userDto: CreateUserDto): Observable<UserDto> {
        return this.userService.create(userDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({
        groups: ['update']
    }))
    editUser(@Param('id') id: string, @Body() userObj: CreateUserDto): Observable<void> {
        return this.userService.update(id, userObj);
    }

    @Delete(':id')
    deleteUser(@Param('id') id : string): Observable<void> {
        return this.userService.delete(id);
    }
}
