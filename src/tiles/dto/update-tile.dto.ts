import { PartialType } from '@nestjs/mapped-types';
import { IsArray, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Tile } from '../entities/tile.entity';
import { CreateTileDto } from './create-tile.dto';

export class UpdateTileDto {
  @IsArray()
  @IsOptional()
  tilesAdded: Tile[];
  @IsArray()
  @IsOptional()
  tilesRemoved: ObjectId[];
  @IsArray()
  @IsOptional()
  tilesUpdated: Tile[];
}
