import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ObjectId, Document } from 'mongodb';

export enum Roles {
  Admin = 'Admin',
  Moderator = 'Moderator',
  Editor = 'Editor',
  Viewer = 'Viewer',
}

export type UserDocument = User & Document;
export class User {
  //@IsMongoId()
  _id: ObjectId;
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  userName: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
  // @IsEnum(Roles)
  role: Roles;
}
