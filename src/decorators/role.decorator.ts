import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/users/entities/user.entity';

export const ROLES_KEY = 'role';
export const RolesD = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
