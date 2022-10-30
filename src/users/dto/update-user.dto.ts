import { IsArray } from 'class-validator';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @IsArray()
  updateRoleUsers: User[];
}
