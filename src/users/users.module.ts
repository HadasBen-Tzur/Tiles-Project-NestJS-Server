import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
