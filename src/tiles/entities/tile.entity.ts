import {  IsDate, IsMongoId, IsString  } from 'class-validator';
import { ObjectId, Document } from 'mongodb';

export type TileDocument = Tile & Document;
export class Tile {
  @IsMongoId()
  _id: ObjectId;
  @IsString()
  color: string;
  @IsDate()
  createdAt: Date;
  @IsDate()
  updatedAt = new Date();
}
