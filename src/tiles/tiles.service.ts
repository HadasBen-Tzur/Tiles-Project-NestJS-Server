import { Injectable } from '@nestjs/common';
import { CreateTileDto } from './dto/create-tile.dto';
import { UpdateTileDto } from './dto/update-tile.dto';
import { Collection, Db, ObjectId, AnyBulkWriteOperation } from 'mongodb';
import { Tile } from './entities/tile.entity';
import { TileDocument } from './entities/tile.entity';
import { InjectDB } from 'src/database/injectDatabase.decorator';

@Injectable()
export class TilesService {
  private tileModel: Collection<TileDocument>;
  constructor(@InjectDB() private readonly db: Db) {
    this.tileModel = this.db.collection('Tiles');
  }
  //Get all Tiles
  async getAllTiles() {
    console.log(this.tileModel.find({}));
    return await this.tileModel.find({}).toArray();
  }
  //Bulk save Tiles
  async updateTilesServic({
    tilesAdded,
    tilesRemoved,
    tilesUpdated,
  }: UpdateTileDto) {
    console.log(tilesAdded,tilesRemoved,tilesUpdated);
    try {
      const added: AnyBulkWriteOperation<TileDocument>[] = tilesAdded.map(
        (tile) => ({
          insertOne: {
            document: {
              _id: new ObjectId(tile._id),
              color: tile.color,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          },
        }),
      );
      const updated: AnyBulkWriteOperation<TileDocument>[] = tilesUpdated.map(
        (tile) => ({
          updateOne: {
            filter: { _id: new ObjectId(tile._id) },
            update: { $set: { color: tile.color, updatedAt: new Date() } },
          },
        }),
      );
      const removed: AnyBulkWriteOperation<TileDocument>[] = tilesRemoved.map(
        (tile) => ({
          deleteOne: { filter: { _id: new ObjectId(tile) } },
        }),
      );
      this.tileModel.bulkWrite([...removed, ...updated, ...added]);
    } catch (error) {}
    return 'this work!!! => bulkWrite work cool:)';
  }

  remove(id: number) {
    return `This action removes a #${id} tiles`;
  }
}
