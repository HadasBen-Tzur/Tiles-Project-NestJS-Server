import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ObjectId } from 'mongodb';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthJwtGuard } from 'src/guards/jwt.guard';

//@UseGuards(AuthJwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: ObjectId) {
    return this.usersService.getUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/login')
  async CreatJWT(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.CreatJWT(loginUserDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: ObjectId,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Put()
  async updateUsersService(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUsersService(updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: ObjectId) {
    return this.usersService.deleteUser(id);
  }
}
